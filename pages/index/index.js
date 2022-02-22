import trackerConfig from '/trackerConfig';

const taojimu = requirePlugin('taojimu');

Page({
  data: {
    isFullScreen: true,
    isShowAllTask: true,
  },
  onLoad() {
    const { compExt } = getApp().globalData.pageConf.componentTree[0];
    this.setData({
      gameIntro: compExt.scenes.home.video,
      tasks: compExt.scenes.scene.task.tasks,
      level: {
        prize: compExt.scenes.prize.prize
      }
    });
  },
  onShowRule() {
    console.log('点击查看互动规则按钮的回调');
  },
  onShowPrize() {
    console.log('点击查看我的奖励按钮的回调');
  },
  onGameStart() {
    console.log('点击开始按钮的回调');
    taojimu.log.sendLog(trackerConfig.startInteractive);
    this.setData({
      visible: true
    });
  },
  onCancel() {
    console.log('关闭任务面板的回调');
    this.setData({
      visible: false,
    });
  },
  onTaskSuccess(result) {
    // 示例返回结果：
    // result = {
    //   chance: 2, // 游戏机会,
    //   task: {
    //     taskName: 'browsePage',
    //     count: 2, // 任务已经做了2次，
    //     isCompleted: true | false, // 当天的任务是否已经完成
    //   },
    // };
    console.log('任务成功的回调，返回', result);
    this.setData({
      visible: false,
      'level.visible': true
    });
  },
  onTaskFail(msg) {
    // 错误信息示例：msg = "请在真机上进行预览"
    console.log('任务失败的回调，返回错误信息', msg);
  },
  onLevelContinue() {
    console.log('结果浮层中“继续挑战”按钮的回调');
    this.setData({
      'level.visible': false
    });
  },
  onLevelCancel() {
    console.log('关闭结果浮层的回调');
    this.setData({
      'level.visible': false
    });
  }
});