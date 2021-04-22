import { MMGameScene, PGlobal, MMGameEvent, MMGameSceneEvent } from "@tbminiapp/mmgamelite-miniapp";
import { loaders } from "@tbminiapp/pixi-miniprogram-engine";
// 引入预加载配置文件
const configData = require("./PreloadConfig.json");
// 引入Adobe Animate导出的布局\动画文件
const layoutLib = require("/resources/mmgame-layout/loadingmc");

export class ScenePreload extends MMGameScene {
  constructor(options) {
    super(options);
    // 初始化 Adobe Animate导出文件的布局
    this.initAnimateBackground(layoutLib);
    // 设定 loadingMc 组件的y坐标永远距离顶边300rpx，用于不同屏幕高度的适配
    this.setLayoutStyle({
      loadingMc: {
        top: 500,
      },
    });
    // 监听场景初始化完成
    this.on(MMGameSceneEvent.SCENE_INITED, this.onInited, this);
  }
  /**
   * 场景初始化完成监听
   */
  onInited() {
    // animate文件中所有设定了name的对象都会存储在  interactiveObjInAnimate 中
    // 取出 名字为 barProgress 的 MovieClip组件 
    const { barProgress } = this.interactiveObjInAnimate;
    // barProgress 停止在第1帧
    barProgress.gotoAndStop(0);
    this.initLoader();
  }
  /**
   * 初始化加载器
   */
  initLoader() {
    //载入预加载素材配置文件
    const resourcesData = configData.resources;
    const textureLoader = new loaders.Loader();
    textureLoader.on("progress", this.onTextureLoaderProgress, this).on("complete", this.onTextureLoaderComplete, this);
    for (let i = 0; i < resourcesData.length; i++) {
      const sourceURL = resourcesData[i].url;
      let url = sourceURL;
      const key = resourcesData[i].name;
      //如果定义了customresource则替换成配置的url
      if (PGlobal.CustomResourceMap[key] && PGlobal.CustomResourceMap[key].type === "image") {
        url = PGlobal.CustomResourceMap[key].url;
      }
      console.log('initLoader', key, url);
      textureLoader.add(key, url);
    }
    textureLoader.load();
  }
  /**
   * preloader加载完成侦听
   * @param loader
   * @param resource
   */
  onTextureLoaderComplete(loader, resource) {
    this.emit(MMGameEvent.PRELOAD_COMPLETE);
  }
  /**
   * preloader加载进度侦听
   * @param loader
   */
  onTextureLoaderProgress(loader) {
    const n = Math.ceil(loader.progress);
    const { txtProgress, barProgress } = this.interactiveObjInAnimate;
    barProgress.gotoAndStop(n);
    txtProgress.text = `${n}%`;
  }
}
