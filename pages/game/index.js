const taojimu = requirePlugin('taojimu');
Page({
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);

    const compExt = getApp().globalData.pageConf.componentTree[0].compExt;
    this.setData({
      compExt,
      isShowAllTask: true,
      tasks: compExt.tasks.tasks,
      taskConfig: {
        'appointLive': {
          label: '观看店铺直播',
          btnText: ['去观看', '已观看'],
          desc: '完成任务获得1次互动机会',
          duration: 5,
        },
        'watchVideo': {
          label: '观看视频',
          btnText: ['去观看', '已观看'],
          desc: '完成任务获得1次互动机会',
          duration: 5,
        },
      },
    });

    setTimeout(() => {
      taojimu.log.sendHdLog({ 
        status: 'finished'
      }).then(() => {
        my.showToast({ 
          content: '3s后领取喵币成功'
        })
      });
    }, 3e3);

  },
  onReady() {},
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: "Demo-MMGame",
      desc: "Demo-MMGame",
      path: "pages/mmgame/index",
    };
  },
  onNavigateToTask() {
    this.setData({
      visible: true
    });
  },
  onDialogClose() {
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
