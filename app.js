App({
  // app 全局数据
  globalData: {
  },
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
    //模板数据， 从ext.json的ext中读取
    let pageConf = my.getExtConfigSync ? my.getExtConfigSync() : options.schemaData;
    if (typeof pageConf === 'string') {
      try {
        pageConf = JSON.parse(pageConf);
      } catch (ex) {
        pageConf = {}; 
      }
    }
    this.globalData.pageConf = pageConf;
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
