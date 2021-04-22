import { Sprite, Texture } from "@tbminiapp/pixi-miniprogram-engine";
import { MMGameScene, MMGameSceneEvent, PGlobal } from "@tbminiapp/mmgamelite-miniapp";
// 引入Adobe Animate导出的布局\动画文件
const layoutLib = require("/resources/mmgame-layout/scene2");
/**
 * 开始场景定义
 */
export class SceneGame extends MMGameScene {
  constructor(options) {
    super(options);
    /**
     * 得分
     */
    this.score = 0;
    /**
     * 阶段2
     */
    this.step2Sprite = null;

    this.stepFunctions = {
      step1: this.gameStep1.bind(this),
      step2: this.gameStep2.bind(this)
    }
    // 设定 mcGameTitle 组件的y坐标永远距离顶边120rpx 用于不同屏幕高度的适配
    this.setLayoutStyle({
      mcGameTitle: {
        top: 120,
      },
      mcScore: {
        top: 162,
      },
    });

    // 监听场景初始化完成
    this.on(MMGameSceneEvent.SCENE_INITED, this.onInited, this);
    this.on("added", () => {
      console.log("被addChild监听");
      if (!this.isAnimateLibLoaded) {
        // 初始化 Adobe Animate导出文件的布局
        this.initAnimateBackground(layoutLib);
      }
    }).on("removed", () => {
      console.log("被remove监听");
    });
  }
  /**
   * hook淘积木互动编辑器的切换场景.切换步骤方法
   * @param {string} stepName
   */
  hookChangeStepFunction(stepName) {
    console.log("改变阶段", stepName);
    this.stepFunctions[stepName]();
  }
  /**
   * 场景初始化完成
   * @param {*} e
   */
  onInited(e) {
    console.log("xxxxxxxx");
    // 初始化后将飞物动画销毁

    this.gameStep1();
  }
  gameStep1() {
    const _mcFlyAnimate = this.interactiveObjInAnimate.mcFlyAnimate;
    if (_mcFlyAnimate) {
      _mcFlyAnimate.destroy();
    }
    const { txtGameTitle, txtScore } = this.interactiveObjInAnimate;
    txtGameTitle.text = "游戏阶段1:点击飞出的花朵得分，获得5分即可闯关";
    this.score = 0;
    txtScore.text = this.score;
    // 重新从布局动画库中 new 一套飞物动画
    const mcFlyAnimate = new layoutLib.library.McFlyAnimate();
    mcFlyAnimate.name = "mcFlyAnimate";
    this.interactiveObjInAnimate.mcFlyAnimate = mcFlyAnimate;

    this.addChild(mcFlyAnimate);
    mcFlyAnimate.position.set(
      PGlobal.StageSize.width / 2,
      PGlobal.StageSize.height - 300
    );
    const { emitter1, emitter2, emitter3, emitter4 } = mcFlyAnimate;
    const list = [emitter1, emitter2, emitter3, emitter4];
    list.forEach((item) => {
      // 设置每个动画的播放速度
      item.framerate = 40 + Math.random(Math.random() * 20);
      const mc = item.mc;
      mc.interactive = true;
      mc.on("tap", (e) => {
        this.score++;
        txtScore.text = this.score;
        if (this.score === 5) {
          mcFlyAnimate.destroy();
          this.changeStep('step2');
        }
      });
    });
  }
  gameStep2() {
    const step2Sprite = (this.step2Sprite = new Sprite(
      Texture.from(
        "https://img.alicdn.com/imgextra/i4/O1CN01SopO0M1uGd1sFKqjx_!!6000000006010-2-tps-245-263.png"
      )
    ));
    step2Sprite.anchor.set(0.5);
    step2Sprite.position.set(
      PGlobal.StageSize.width / 2,
      PGlobal.StageSize.height / 2
    );
    step2Sprite.name = 'step2Sprite';
    this.addChild(step2Sprite);
    step2Sprite.interactive = true;
    step2Sprite.once("tap", (e) => {
      this.step2Sprite.destroy();
      this.changeStep('step1');
    });

    const { txtGameTitle } = this.interactiveObjInAnimate;
    txtGameTitle.text = "游戏阶段2:恭喜闯关成功，点击图片重玩";
  }
}
