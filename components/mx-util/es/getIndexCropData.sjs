/**
 * @ref https://help.aliyun.com/document_detail/44696.html
 * @note 获取与图片索引分隔的相关信息
 */
import getRewriteURL from './getRewriteURL.sjs';
import getResourceExtension from './getResourceExtension.sjs';

const EMPTY = '';
/* 对于图片裁剪，只有在手淘extactExcludeDomain白名单的图片链接可以*/
const ossReg = getRegExp('^(?:https?:)?\\/\\/(?:ossgw|gjusp)\\.alicdn\\.com\\/');
const tfsReg = getRegExp('^(?:https?:)?\\/\\/[^/]+\\.(?:tbcdn|taobaocdn|alicdn)\\.(?:com|cn)\\/');
const urlReg = getRegExp('^(https?:)?\\/\\/');
const hyphenateRE = getRegExp('([^-])([A-Z])', 'g');
const hyphenate = css => {
  if (css != null && typeof css === 'object') {
    return Object.keys(css).map(k => `${k}`.replace(hyphenateRE, '$1-$2').toLowerCase() + `:${css[k]};`).join('');
  }
};

export default function getIndexCropData(imageObj, options = {}) {
  const baseWidth = 750;
  const minCutHeight = 500;

  let imgWidth = parseFloat(imageObj.width);
  let imgHeight = parseFloat(imageObj.height);
  let style = {};
  let data = {
    src: imageObj.src || EMPTY,
    lazyload: true,
  };
  let extension = getResourceExtension(data.src).toUpperCase();
  let originalSrc = data.src;
  let isGif = extension === 'GIF';
  let lazyBG;

  // 设定需要裁剪，640 Magic Height
  let isCut =
    options.isCut &&
    imgWidth * imgHeight &&
    imgHeight > minCutHeight &&
    (ossReg.test(data.src) || tfsReg.test(data.src));

  // flow模式，data.style为空。目前是宽度自动撑满，所以计算高度的时候是根据宽度等比计算的，如果不预设高度，会导致高度为0，没法检测
  // 必须计算高度，不然懒加载时，高度为0，没法检测
  {
    let h = (imgHeight * baseWidth) / imgWidth;
    style.width = `${baseWidth}rpx`;
    if (h) {
      style.height = `${h}rpx`;
    }
  }

  // 图片高度不能设置为 auto，如果需要图片高度为 auto，直接设置 mode 为 widthFix。
  if (!style.height) {
    data.mode = 'widthFix';
  }

  if (!isGif && isCut) {
    data.srcs = [];
    let index = Math.floor(imgHeight / minCutHeight);
    let rate = baseWidth / imgWidth;

    for (let i = 0; i < index; i++) {
      data.srcs.push({
        pStyle: hyphenate({
          position: 'relative',
          width: '100%',
          height: `${rate * minCutHeight}rpx`,
          ucPerfStatIgnore: 'image',
        }),
        src: getRewriteURL(data.src, {
          TFSCut: `${minCutHeight}i${i}`,
          OSSCut: `${minCutHeight}y-${i}`,
          indexCut: [minCutHeight, i, 'y'].join(','),
        }),
      });
    }
    if (imgHeight > index * minCutHeight) {
      data.srcs.push({
        pStyle: hyphenate({
          position: 'relative',
          width: '100%',
          height: `${rate * (imgHeight - index * minCutHeight)}rpx`,
          ucPerfStatIgnore: 'image',
        }),
        src: getRewriteURL(data.src, {
          TFSCut: `${minCutHeight}i${index}`,
          OSSCut: `${minCutHeight}y-${index}`,
          indexCut: [minCutHeight, index, 'y'].join(','),
        }),
      });
    }
  } else {
    data.src = getRewriteURL(data.src);
  }

  // if (isoss) {
  //   // oss
  //   lazyBG = originalSrc + '@20q_10p.' + (extension === 'PNG' ? 'png' : 'jpg');
  // } else if (istfs) {
  //   // tfs
  //   lazyBG = originalSrc + '_100x100q20.jpg';
  // }

  lazyBG = getRewriteURL(originalSrc, { size: '30x30', quality: 20 });

  if (imageObj.base64 && !urlReg.test(imageObj.base64)) {
    lazyBG = imageObj.base64;
  }

  if (lazyBG) {
    data.style = hyphenate({
      ...style,
      position: 'relative',
      width: '100%',
      backgroundImage: `url("${lazyBG}")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      fontSize: 0,
      lineHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      ucPerfStatIgnore: 'image',
    });
  }

  return data;
}
