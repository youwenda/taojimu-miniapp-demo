//四种图片类型:方图，定宽，定高，裁剪
const IMG_TYPE_SQUARE = 'square';
const IMG_TYPE_WF = 'widthFixed';
const IMG_TYPE_HF = 'heightFixed';
const IMG_TYPE_XZ = 'xz';
//cdn尺寸对象
const CDN = {};
//定宽不定高尺寸列表   110x100000.jpg
CDN.widths = [110, 150, 170, 220, 240, 290, 450, 570, 580, 620, 790];
//定高不定宽尺寸列表  10000x 170
CDN.heights = [170, 220, 340, 500];
//裁剪成正方形 尺寸列表
CDN.xzs = [
  72, 80, 88, 90, 100, 110, 120, 145, 160, 170, 180, 200, 230, 270, 290, 310, 360, 430, 460, 580,
  640,
];
//正方形尺寸列表
CDN.square = [
  16, 20, 24, 30, 32, 36, 40, 48, 50, 60, 64, 70, 72, 80, 88, 90, 100, 110, 120, 125, 128, 145, 180,
  190, 200, 200, 210, 220, 230, 240, 250, 270, 300, 310, 315, 320, 336, 360, 468, 490, 540, 560,
  580, 600, 640, 720, 728, 760, 970,
];
let NULL;

function fixRewriteParams(params) {
  if (params) {
    if (params.width >= 0 && params.height >= 0) {
      if (params.size == NULL) {
        params.size = params.width + 'x' + params.height;
      }
    } else {
      let size = `${params.size}`.match(getRegExp('\\d+', 'g'));
      if (size) {
        if (params.width == NULL && size[0] > 0) {
          params.width = size[0];
        }
        if (params.height == NULL && size[1] > 0) {
          params.height = size[1];
        }
      }
    }
  } else {
    params = {};
  }
  return params;
}

/*
 * 获取cdn最佳图片尺寸
 * @param {string|number} curSize :期望尺寸,参数格式为——>'200x220' | 200
 * @param {string} type : 尺寸类型，'square':方图尺寸，'widthFixed':定宽尺寸，'heightFixed':定高尺寸,'xz':裁剪
 * @return {number} cdn size
 * */
function getBestCdnSize(curSize, type) {
  // curSize '200x200'
  // curSize '200x200xz'
  // curSize 200
  type = type || IMG_TYPE_SQUARE;
  let sizeList = CDN.square;
  let match;
  if (!curSize || (typeof curSize != 'string' && typeof curSize != 'number')) {
    return 0;
  }

  if (typeof curSize == 'string' && (match = curSize.match(getRegExp('^\\d+x\\d+(xz)?$')))) {
    curSize = curSize.split('x')[0];
    if (match[1]) {
      type = IMG_TYPE_XZ;
    }
  }
  switch (type) {
    case IMG_TYPE_WF:
      sizeList = CDN.widths;
      break;
    case IMG_TYPE_HF:
      sizeList = CDN.heights;
      break;
    case IMG_TYPE_XZ:
      sizeList = CDN.xzs;
      break;
  }

  let max = sizeList[sizeList.length - 1];
  let min = sizeList[0];
  let bestSize = 0;
  if (max <= curSize) {
    return max;
  }
  if (min >= curSize) {
    return min;
  }
  for (let i = sizeList.length; i >= 0; i--) {
    if (sizeList[i] <= curSize) {
      if (sizeList[i] == curSize) {
        bestSize = curSize;
      } else {
        i < sizeList.length - 1 && (bestSize = sizeList[i + 1]);
      }
      break;
    }
  }
  return bestSize;
}

const defaultRewriteRules = [
  // [
  //   getRegExp('^(?:https?:|)\\/\\/(?:ossgw)\\.alicdn\\.com\\/'),
  //   function (url, paramsDefault, paramsForce) {
  //     return url.replace(
  //       getRegExp('^(?:https?:|)(.*?)(?:@([^?#.]*?|)(\\.[a-z]+?)|)([?#].*|)$', 'i'),
  //       function (origin, path, config, format, tail) {
  //         const res = [];
  //         let sizeForce = paramsForce.size
  //           ? (paramsForce.size + '').match(getRegExp('\\d+', 'g'))
  //           : [];
  //         let sizeDefault = paramsDefault.size
  //           ? (paramsDefault.size + '').match(getRegExp('\\d+', 'g'))
  //           : [];

  //         let _width;
  //         let _height;
  //         let _quality;
  //         let _cut;
  //         if (config) {
  //           let tmp;
  //           config.split('_').forEach(function (r) {
  //             // eslint-disable-line
  //             if ((tmp = r.match(getRegExp('^(\\d+)w$')))) {
  //               _width = tmp[1];
  //             } else if ((tmp = r.match(getRegExp('^(\\d+)h$')))) {
  //               _height = tmp[1];
  //             } else if ((tmp = r.match(getRegExp('^(\\d+)q$', 'i')))) {
  //               _quality = tmp[1];
  //             } else if ((tmp = r.match(getRegExp('^(\\d+[xy]-\\d+)ic$', 'i')))) {
  //               _cut = tmp[1];
  //             } else {
  //               res.push(r);
  //             }
  //           });
  //         }

  //         if ('width' in paramsForce) {
  //           _width = paramsForce.width;
  //         } else if (sizeForce[0] > 0) {
  //           _width = sizeForce[0];
  //         } else if (!_width) {
  //           if ('width' in paramsDefault) {
  //             _width = paramsDefault.width;
  //           } else if (sizeDefault[0] > 0) {
  //             _width = sizeDefault[0];
  //           }
  //         }
  //         _width > 0 &&
  //           _width < 4096 &&
  //           (_width = getBestCdnSize(_width)) &&
  //           res.unshift(_width + 'w');

  //         if ('height' in paramsForce) {
  //           _height = paramsForce.height;
  //         } else if (sizeForce[1] > 0) {
  //           _height = sizeForce[1];
  //         } else if (!_height) {
  //           if ('height' in paramsDefault) {
  //             _height = paramsDefault.height;
  //           } else if (sizeDefault[1] > 0) {
  //             _height = sizeDefault[1];
  //           }
  //         }
  //         _height > 0 &&
  //           _height < 4096 &&
  //           (_height = getBestCdnSize(_height)) &&
  //           res.unshift(_height + 'h');

  //         if ('quality' in paramsForce) {
  //           _quality = paramsForce.quality;
  //         } else if (!_quality && 'quality' in paramsDefault) {
  //           _quality = paramsDefault.quality;
  //         }
  //         _quality > 0 && _quality < 100 && res.unshift(_quality + 'q');

  //         if ('OSSCut' in paramsForce) {
  //           _cut = paramsForce.OSSCut;
  //         } else if (!_cut && 'OSSCut' in paramsDefault) {
  //           _cut = paramsDefault.OSSCut;
  //         }
  //         getRegExp('^\\d+[xy]-\\d+(ic|)$').test(_cut) &&
  //           res.unshift(_cut.replace('ic', '') + 'ic');

  //         let _webp = true;
  //         let _format = format;
  //         if (_webp === false) {
  //           if ('OSSFormat' in paramsForce) {
  //             _format = paramsForce.OSSFormat;
  //           } else if (!_format && 'OSSFormat' in paramsDefault) {
  //             _format = paramsDefault.OSSFormat;
  //           }
  //           _format = (_format = getRegExp('^\\.?(jpg|png|bmp|gif|src)$').exec(
  //             _format || path.replace(getRegExp('^.*?(\\.[a-z]+|)$'), '$1')
  //           ))
  //             ? '.' + _format[1]
  //             : '';
  //         } else {
  //           _format = '.webp';
  //         }

  //         return (
  //           'https:' + path + (res.length || _format ? '@' + res.join('_') + _format : '') + tail
  //         );
  //       }
  //     );
  //   },
  // ],
  [
    getRegExp(
      '^(?:https?:|)\\/\\/((?:alp|ossgw|gjusp|ykimg|z|a1)\\.alicdn\\.com\\/|(?:r\\d|g\\d|vthumb)\\.ykimg\\.com)'
    ),
    function (url, paramsDefault, paramsForce) {
      return url.replace(
        getRegExp('^(?:https?:|)(.*?)(@[^\\?#]*?|)(\\?[^#]*|)(#.*|)$'),
        function (origin, path, oldFormat, newFormat, hash) {
          let mapData = {
            width: NULL,
            height: NULL,
            quality: NULL,
            indexCut: NULL,
            format: NULL,
            webp: NULL,
          };

          if ((oldFormat = oldFormat.replace(getRegExp('^\\@', 'g'), ''))) {
            let tmp = oldFormat.split('.');
            if (tmp.length >= 2) {
              mapData.format = tmp[1];
            }
            tmp[0].split('_').forEach(function (r) {
              if ((tmp = r.match(getRegExp('^(\\d+)w$')))) {
                mapData.width = tmp[1];
              } else if ((tmp = r.match(getRegExp('^(\\d+)h$')))) {
                mapData.height = tmp[1];
              } else if ((tmp = r.match(getRegExp('^(\\d+)q$', 'i')))) {
                mapData.quality = tmp[1];
              } else if ((tmp = r.match(getRegExp('^(\\d+)([xy])\\-(\\d+)ic$', 'i')))) {
                mapData.indexCut = [tmp[1], tmp[3], tmp[2]].join(',');
              }
            });
          }

          let resOther = [];
          if ((newFormat = newFormat.replace(getRegExp('^\\?+'), ''))) {
            newFormat.split('/').forEach(function (info) {
              if (info && info != 'x-oss-process=image') {
                let _info = info.split(',');
                let tmp;
                switch (_info[0]) {
                  case 'resize':
                    _info.forEach(function (r) {
                      if ((tmp = r.match(getRegExp('^w_(\\d)+')))) {
                        mapData.width = tmp[1];
                      } else if ((tmp = r.match(getRegExp('^h_(\\d)+')))) {
                        mapData.height = tmp[1];
                      }
                    }, 1);
                    break;
                  case 'quality':
                    _info.forEach(function (r) {
                      if ((tmp = r.match(getRegExp('^q_(\\d)+', 'i')))) {
                        mapData.quality = tmp[1];
                      }
                    }, 1);
                    break;
                  case 'indexcrop': {
                    let _val = [];
                    _info.forEach(function (r) {
                      if ((tmp = r.match(getRegExp('^i_(\\d)+')))) {
                        _val[1] = tmp[1];
                      } else if ((tmp = r.match(getRegExp('^x_(\\d)+')))) {
                        _val[0] = tmp[1];
                        _val[2] = 'x';
                      } else if ((tmp = r.match(getRegExp('^y_(\\d)+')))) {
                        _val[0] = tmp[1];
                        _val[2] = 'y';
                      }
                    }, 1);
                    if (_val.length) {
                      mapData.indexCut = _val.join(',');
                    }
                    break;
                  }
                  case 'format':
                    mapData.format = _info[1];
                    break;
                  default:
                    resOther.push(info);
                    break;
                }
              }
            });
          }

          Object.keys(mapData).forEach((name) => {
            if (paramsForce[name] != NULL) {
              mapData[name] = paramsForce[name];
            } else if (mapData[name] == NULL && paramsDefault[name] != NULL) {
              mapData[name] = paramsDefault[name];
            }
          });

          let res = [];
          let _resize = [];
          let _width = mapData.width;
          let _height = mapData.height;
          let _quality = mapData.quality;
          let _indexCut = mapData.indexCut;
          let _format = mapData.format;
          let _webp = true;

          if (_webp) {
            _format = 'webp';
          } else if (_format == 'webp') {
            _format = '';
          }

          if (getRegExp('^\\d+,\\d+').test(_indexCut)) {
            _indexCut = _indexCut.split(',');
            res.push(
              'indexcrop,' +
                (getRegExp('^x', 'i').test(_indexCut[2]) ? 'x' : 'y') +
                '_' +
                _indexCut[0] +
                ',i_' +
                (_indexCut[1] || 0)
            );
          }
          _quality > 0 && _quality < 100 && res.push('quality,q_' + _quality);
          _width > 0 &&
            _width < 4096 &&
            (_width = getBestCdnSize(_width)) &&
            _resize.push('w_' + _width);
          _height > 0 &&
            _height < 4096 &&
            (_height = getBestCdnSize(_height)) &&
            _resize.push('h_' + _height);
          _resize.length && res.push('resize,' + _resize.join(','));
          getRegExp('^(jpg|png|bmp|gif|src|webp)$').test(_format) && res.push('format,' + _format);
          res = resOther.concat(res);

          return (
            'https:' + path + (res.length ? '?x-oss-process=image/' + res.join('/') : '') + hash
          );
        }
      );
    },
  ],
  [
    getRegExp('^(?:https?:|)\\/\\/[^\\/]+\\.(?:tbcdn|taobaocdn|alicdn)\\.(?:com|cn)\\/'),
    function (url, paramsDefault, paramsForce) {
      return url.replace(
        getRegExp(
          '^(?:https?:|)(.*?)(?:_(\\d+x\\d+[a-z]*?|sum|b|m|)(c[xy]\\d+i\\d+|)(?:[qQ](\\d+)|)(?:\\.jpg|)(_.webp|)|)([\\?#].*|)$'
        ),
        function (origin, path, size, cut, quality, webp, tail) {
          let tmp = getRegExp('c([xy])(\\d+)i(\\d+)').exec(cut);
          cut = tmp ? [tmp[2], tmp[3], tmp[1]].join(',') : '';

          let mapData = {
            size: size,
            quality: quality,
            indexCut: cut,
            webp: NULL,
          };

          Object.keys(mapData).forEach((name) => {
            if (paramsForce[name] != NULL) {
              mapData[name] = paramsForce[name];
            } else if (mapData[name] == NULL && paramsDefault[name] != NULL) {
              mapData[name] = paramsDefault[name];
            }
          });

          let res = [];
          let _size = mapData.size;
          let _quality = mapData.quality;
          let _indexCut = mapData.indexCut;
          let _webp = true;
          let _xz;

          if (_size) {
            _xz = getRegExp('xz$').test(_size);
            _size = getBestCdnSize(_size);
            if (_size) {
              _size = `${_size}x${_size}${_xz ? 'xz' : ''}`;
              res.push(_size);
            }
          }
          if (getRegExp('^\\d+,\\d+').test(_indexCut)) {
            _indexCut = _indexCut.split(',');
            res.push(
              'c' +
                (getRegExp('^x', 'i').test(_indexCut[2]) ? 'x' : 'y') +
                _indexCut[0] +
                'i' +
                _indexCut[1]
            );
          }
          _quality > 0 && _quality < 100 && res.push('q' + _quality);

          return (
            'https:' +
            path.replace(
              getRegExp(
                '^\\/\\/([\\w\\d\\.]+\\.taobaocdn|gma\\.alicdn|asearch\\.alicdn|img\\.alicdn)\\.com\\/'
              ),
              '//gw.alicdn.com/'
            ) +
            (res.length ? '_' + res.join('') + '.jpg' : '') +
            (_webp !== false ? '_.webp' : '') +
            tail
          );
        }
      );
    },
  ],
];

const rgif = getRegExp('\\.(gif|apng)([?#].*|\\s*)$', 'i');

export default function getRewriteURL(url, paramsForce) {
  paramsForce = fixRewriteParams(paramsForce || {});
  const paramsDefault = fixRewriteParams({
    quality: 75,
    webp: true,
    //size:'100x100'
    //width:100
    //height:100
    //OSSFormat:'.jpg'
    //OSSCut:'100y-0'
    //TFSCut:100i0
  });
  const rewriteRules = defaultRewriteRules;
  // gif加上尺寸参数后在android下不动，且加q参数后图片大小也不会变化
  if (
    !url ||
    url.match(rgif) ||
    (!Object.keys(paramsDefault).length && !Object.keys(paramsForce).length)
  ) {
    return url;
  }
  for (let i = 0, rule; (rule = rewriteRules[i]) != NULL; i++) {
    if (rule[0].test(url)) {
      if (typeof rule[1] === 'function') {
        url = rule[1](url, paramsDefault, paramsForce);
      }
      break;
    }
  }
  return url;
}
