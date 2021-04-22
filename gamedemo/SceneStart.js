import { MMGameScene, MMGameSceneEvent, PGlobal } from "@tbminiapp/mmgamelite-miniapp";

// 引入Adobe Animate导出的布局\动画文件
const layoutLib = require("/resources/mmgame-layout/scene1");
/**
 * 开始场景定义
 */
export class SceneStart extends MMGameScene {

  constructor(options) {
    super(options);
    /**
     * 是否自动关注
     */
    this.isAutoFollow = true;
    // 设定 mcTopButtons 组件的y坐标永远距离顶边120rpx，mcBottomButtons 组件距离底边50rpx 用于不同屏幕高度的适配
    this.setLayoutStyle({
      'mcTopButtons': {
        top: 120
      },
      'mcBottomButtons': {
        bottom: 50
      }
    });
    // 初始化 Adobe Animate导出文件的布局
    this.initAnimateBackground(layoutLib);
    // 监听场景初始化完成
    this.on(MMGameSceneEvent.SCENE_INITED, this.onInited, this);
    this.on("added", () => {
      console.log('被addChild监听');
    }).on("removed", () => {
      console.log('被remove监听');
    });
  }
  /**
   * hook淘积木互动编辑器的切换场景.切换步骤方法
   * @param {string} stepName 
   */
  hookChangeStepFunction(stepName) {
    console.log('改变阶段', stepName);
  }
  /**
   * 场景初始化完成
   * @param {*} e 
   */
  onInited(e) {
    // 从 scene.interactiveObjInAnimate 对象中取出 animate中定义的可交互对象（animate中有名称命名的对象）
    const { btnRule, btnMyPrize, btnStart, mcChanges, btnFollow, txtChanges } = this.interactiveObjInAnimate;
    // 为活动规则按钮增加交互事件
    btnRule.interactive = true;
    btnRule.on('tap', (e) => {
      console.log('>>>>>>>>', '弹出活动说明');
    });
    // 为我的奖品按钮增加交互事件
    btnMyPrize.interactive = true;
    btnMyPrize.on('tap', (e) => {
      console.log('>>>>>>>>', '弹出我的奖品');
    });
    // 关注组件对象跳转到第一帧（勾选状态）
    btnFollow.gotoAndStop(0);
    // 自动关注按钮事件绑定
    btnFollow.interactive = true;
    btnFollow.on('tap', this.onClickFollow, this);

    // 开始按钮事件绑定
    btnStart.interactive = true;
    btnStart.on('tap', this.onStart, this);

    // 设置机会数
    mcChanges.visible = false;
    this.setRest(10);
  }
  /**
   * 设置机会数
   * @param {*} rest
   */
  setRest(rest) {
    const { mcChanges, txtChanges } = this.interactiveObjInAnimate;
    if (rest > 0) {
      txtChanges.text = rest;
    } else {
      txtChanges.text = '0';
    }
    mcChanges.visible = true;
  }
  /**
   * 点击关注店铺监听
   * @param {*} e 
   */
  onClickFollow(e) {
    const { btnFollow } = this.interactiveObjInAnimate;
    if (!btnFollow) return;
    const me = this;
    if (btnFollow.currentFrame === 0) {
      btnFollow.gotoAndStop(1);
      me.isAutoFollow = false;
    } else {
      btnFollow.gotoAndStop(0);
      me.isAutoFollow = true;
    }
  }
  /**
   * 点击开始游戏监听
   * @param {*} e 
   */
  onStart(e) {
    console.log('>>>>>>>>', '开始游戏');
    const { isAutoFollow } = this;
    if (isAutoFollow) {
      const { sellerId = "0" } = PGlobal.Options.shopInfo;
      // 加关注前查询，是否已关注，如果是，则发送一个计数
      this.favShop(sellerId).then(
        console.log('关注店铺完成')
      );
    }
    // 通知切换到游戏场景
    PGlobal.Application.stage.emit(MMGameSceneEvent.SCENE_CHANGE, { sceneName: 'sceneGame' })
  }
  /**
   * 关注店铺
   * @param {string} 卖家id 
   */
  favShop(sellerId) {
    return new Promise((resolve, reject) => {
      console.log('关注店铺', sellerId);
      resolve();
    })

  }

}