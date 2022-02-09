import trackerConfig from '/trackerConfig';

const taojimu = requirePlugin('taojimu');

Page({
  data: {
    isFullScreen: true,
    gameIntro: {
      'src': 'https://lego.alicdn.com/res/tjm/v/2247603103_9tJGcNkO18ExnKRf_sd.mp4',
      'width': 600,
      'height': 480,
      duration: '3.804000',
      poster: 'https://lego.alicdn.com/res/tjm/p/2247603103_9tJGcNkO18ExnKRf_snapshot.jpg',
    },
  },
  onLoad() {
    const compExt = getApp().globalData.pageConf.componentTree[0].compExt;
    this.setData({
      isShowAllTask: true,
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
    // result = { chance: 2, { task: count: 3, isCompleted: true ,taskName: "favorItem" };
    this.setData({
      visible: false,
    });
  },
  onTaskFail(msg) {
    // msg = { chance: 2, { msg: "请在真机上进行预览" }
  },
});