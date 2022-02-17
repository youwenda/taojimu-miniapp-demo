import trackerConfig from '/trackerConfig';

const taojimu = requirePlugin('taojimu');

Page({
  data: {
    isFullScreen: true,
  },
  onLoad() {
    const compExt = getApp().globalData.pageConf.componentTree[0].compExt;
    this.setData({
      isShowAllTask: true,
      gameIntro: compExt.scenes.home.video,
      tasks: compExt.scenes.scene.task.tasks,
    });
  },
  onShowRule() {},
  onShowPrize() {},
  onGameStart() {
    taojimu.log.sendLog(trackerConfig.startInteractive);
    this.setData({
      visible: true
    });
  },
  onCancel() {
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
    this.setData({
      visible: false,
    });
  },
  onTaskFail(msg) {
    // 错误信息示例：msg = "请在真机上进行预览"
  },
});