import { MMGameScene, MMGameSceneEvent } from "@tbminiapp/mmgamelite-miniapp"
import { Container } from "@tbminiapp/pixi-miniprogram-engine";
/**
 * 主场景
 */
export class MainScene extends MMGameScene {
  constructor(options) {
    super(options);
    /**
     * 场景列表
     */
    this.scenes = null;
    /**
     * 场景Map
     */
    this.scenesMap = null;
    /**
     * 默认场景名称
     */
    this.defaultSceneName = '';
    /**
     * 当前场景名称
     */
    this.currentSceneName = '';
    /**
     * 当前场景对象
     */
    this.currentScene = null;
    /**
     * 场景容器
     */
    this.container = null;
    /**
     * 主场景名称
     */
    this.name = 'rootScene';
    /**
     * 当前场景配置
     */
    this.options = options;
    this.defaultSceneName = options.defaultSceneName || '';
    this.init();
  }
  /**
   * 主场景初始化
   */
  init() {
    this.container = new Container({
      basePath: this.basePath
    });
    this.container.name = 'rootSceneContainer';
    this.addChild(this.container);

    if (this.options.scenes && this.options.scenes.length > 0) {
      this.scenes = this.options.scenes;
    } else {
      this.scenes = [];
    }

    this.scenesMap = {};

    for (let i = 0; i < this.scenes.length; i++) {
      const scene = this.scenes[i];
      if (scene.name && !this.scenesMap[scene.name]) {
        this.scenesMap[scene.name] = scene;
        // 为每一个场景增加 场景、环节变更完成事件监听 
        scene.on(MMGameSceneEvent.SCENE_STEP_CHANGE_COMPLETE, this.onChildSceneStepChangeComplete, this);
      }
    }
    if (this.defaultSceneName) {
      this.showDefaultScene();
    }
  }
  /**
   * 主场景侦听子场景的变化
   * @param {*} e 
   */
  onChildSceneStepChangeComplete(e) {
    console.log('onChildSceneStepChangeComplete:', e.eventTarget.name, e.eventName, e.eventTarget);
  }
  /**
   * 重写MMGameScene的hookChangeSceneAndStepFunction，用于对接淘积木所见即所得编辑器的场景|阶段切换。
   * @param {string} sceneName 切换的场景名称
   * @param {string} stepName 切换的场景->阶段名称
   */
  hookChangeSceneAndStepFunction(sceneName, stepName = '') {
    this.changeScene(sceneName, stepName).then((ret) => {
      console.log(ret);
    }).catch(error => {
      console.error(error.message);
    });
  }
  /**
   * 为主场景增加子场景
   * @param {string} sceneName 场景名称
   * @param {MMGameScene} scene 场景对象
   */
  addScene(sceneName, scene) {
    if (sceneName && !this.scenesMap[sceneName]) {
      this.scenesMap[sceneName] = scene;
      this.scenes.push(scene);
    } else {
      console.warn('sceneName:', sceneName, '已存在');
    }
  }
  /**
   * 显示默认场景
   */
  showDefaultScene() {
    this.changeScene(this.defaultSceneName);
  }
  /**
   * 改变场景
   * @param {string} sceneName 场景名称
   * @param {string} stepName 
   * @returns 
   */
  changeScene(sceneName, stepName = '') {
    return new Promise((resolve, reject) => {
      const { container, scenesMap } = this;
      const scene = scenesMap[sceneName];
      if (scene) {
        let currentScene = this.currentScene;
        /**
         * prevScene 切换的上一个场景
         * currentScene 切换到的场景
         */
        let ret = {
          prevScene: null,
          currentScene: currentScene
        };
        console.log(sceneName, stepName);

        if (currentScene !== scene) {
          if (currentScene) {
            currentScene.hide({
              // 是否重置被隐藏场景的背景动画
              isResetAnimateBg: false
            });
            container.removeChild(currentScene);
            ret.prevScene = currentScene;
          }

          currentScene = this.currentScene = scene;
          currentScene.show({
            // 是否重置被显示场景的背景动画
            isResetAnimateBg: false
          });
          container.addChild(scene);
          currentScene.changeStep(stepName);
        } else {
          if (stepName !== currentScene.currentStepName) {
            currentScene.changeStep(stepName);
          }
        }
        ret = {
          ...ret,
          currentScene
        };
        resolve(ret);
      } else {
        reject({
          message: `未找到场景 "${sceneName}"`
        });
      }
    });
  }
  /**
   * 销毁主场景
   * @param {*} destroyOptions 
   */
  destroy(destroyOptions = { children: true, texture: true, baseTexture: false }) {
    this.scenesMap = null;
    this.currentScene = null;
    this.defaultSceneName = '';

    if (this.scenes && this.scenes.length) {
      for (let i = 0; i < this.scenes.length; i++) {
        const scene = this.scenes[i];
        try {
          scene.destroy(destroyOptions);
        } catch (e) {
          console.error(e);
        }
      }
    }
    this.scenes = null;
    this.options = null;
    this.container = null;
    this.name = '';
    super.destroy(destroyOptions);
  }

}