const taojimu = requirePlugin('taojimu');
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
    taojimu.setEnv({
      cid: 'test', // 当前游戏的唯一标志，全局唯一，应该避免和其他游戏isv商冲突。所有的cid 公用一个值即可。主要避免和其他isv重复。
      pageId: 123456, // 页面id, 由淘积木负责生成。测试时可随便制定，用于和cid 一起区分不同isv 厂商在不同页面下游戏和任务的消耗情况。
      tasks: [
        {
          taskName: 'favorShop',
          addChance: 1,
          maxCount: 1,
          isDaily: false,
        },
        {
          taskName: 'favorItem',
          addChance: 1,
          maxCount: 1,
          isDaily: true,
        },
        {
          taskName: 'addBag',
          addChance: 1,
          maxCount: 1,
          isDaily: true,
        },
        {
          taskName: 'goShop',
          addChance: 1,
          maxCount: 1,
          isDaily: true,
        },
        {
          taskName: 'appointLive',
          addChance: 1,
          maxCount: 1,
          isDaily: true,
        },
        {
          taskName: 'joinMember',
          addChance: 1,
          maxCount: 1,
          isDaily: false,
        },
        {
          taskName: 'share',
          addChance: 1,
          maxCount: 1,
          isDaily: true,
        },
      ],
    });
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
