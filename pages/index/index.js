const taojimu = requirePlugin('taojimu');
Page({
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    this.setData({
      component: getApp().globalData.pageConf.componentTree[0]
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
    my.navigateTo({
      url: '/pages/task/task'
    });
  }
});
