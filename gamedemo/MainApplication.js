import { MMGameApplication,MMGameEvent, MMGameSceneEvent, MMGameEventData } from "@tbminiapp/mmgamelite-miniapp";
import { MainScene } from "./MainScene";
import { ScenePreload } from "./ScenePreload";
import { SceneGame } from "./SceneGame";
import { SceneStart } from "./SceneStart";
import { Tracker } from './Tracker';

export class MainApplication extends MMGameApplication {
  constructor(options) {
    super(options.width, options.height, options);
    // 预加载场景
    this.preloader = null;
    // 主场景
    this.mainScene = null;
    // 初始化预加载场景
    this.initPreloader();
    this.stage.on(MMGameEvent.GAME_FULL_PATH_LOG,this.onFullPathLog,this);
  }
  /**
   * 全链路埋点监听
   */
  onFullPathLog(e) {
    console.log('full-path-log',e);
    // e 结构
    //  {
    //     eventName: "tap"  响应事件类型
    //     path: "stage.sceneContainer.rootScene.rootSceneContainer.sceneStart.N.N.mcBottomButtons.btnStart"  响应事件的显示对象层级（N代表层级无名成）
    //     target: "btnStart"  响应事件的对象名称
    //  }
    Tracker.send(e.target,e.eventName,e.path);
  }
  /**
   * 初始化预加载场景
   */
  initPreloader() {
    this.preloader = new ScenePreload();
    // 向 preloaderContainer 添加 ScenePreload;
    this.preloaderContainer.addChild(this.preloader);
    // 监听 PRELOAD_COMPLETE 事件
    this.preloader.once(MMGameEvent.PRELOAD_COMPLETE, this.onPreloadComplete, this);
  }
  /**
   * 预加载完成监听
   */
  onPreloadComplete() {
    if (this.preloader) {
      // 销毁预加载场景
      this.preloaderContainer.removeChild(this.preloader);
      this.preloader.destroy();
      // 初始化主场景
      this.initMainScene();
    }
  }
  /**
   * 初始化主场景
   */
  initMainScene() {
    const sceneStart = new SceneStart();
    sceneStart.name = 'sceneStart';
    const sceneGame = new SceneGame();
    sceneGame.name = 'sceneGame';
    
    this.mainScene = new MainScene({
      defaultSceneName: 'sceneStart',
      scenes: [sceneStart,sceneGame]
    });
    this.sceneContainer.addChild(this.mainScene);
    this.stage.on(MMGameSceneEvent.SCENE_CHANGE, e => {
      const eventData = new MMGameEventData(MMGameSceneEvent.SCENE_CHANGE, null, e);
      this.mainScene.emit(MMGameSceneEvent.SCENE_CHANGE, eventData);
    }, this);
  }
}