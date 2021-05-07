const plugin = requirePlugin('taojimu'); // eslint-disable-line

Page({
  data: {
    // 框架的query参数，全部透传到插件，包括shopId，sellerId等
    query: {},
    // scrollViewId 内嵌页唯一标识，要设置到scroll-view的id属性上。其他参数需要与店铺同学约定，约定后透传
    extraParams: {
      scrollViewId: 'dev',
    },
    shopFavorStatus: false,
  },
  onLoad(query) {
    // my.showToast({
    //   content: JSON.stringify(query),
    //   duration: 10000
    // });
    // if (!query.pageId || !query.sellerId) {
    //   return console.error('请通过页面参数传入pageId和sellerId');
    // }
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
    plugin.event.fire('page.onShow');
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
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
      success: (e) => {
        if (e.shareResult) {
          plugin.event.fire('page.onShare', e);
        }
      },
    };
  },
  onTaskFavorShop() {
    plugin.task.favorShop({
      sellerId: 2247603103,
    })
      .then((data) => {
        my.alert({
          content: `task.favorShop: success ${JSON.stringify(data)}`,
        });
        console.log(`task.favorShop: success`, data);
      })
      .catch((e) => {
        console.log(`task.favorShop: fail`, e);
        my.alert({
          content: `task.favorShop: fail ${JSON.stringify(e)}`,
        });
      });
  },
  onTaskFavorItem() {
    plugin.task
      .favorItem({
        id: '636186398674',
        showItem: true,
      })
      .then((data) => {
        my.alert({
          content: `task.favorItem: success ${JSON.stringify(data)}`,
        });
        console.log(`task.favorItem: success`, data);
      })
      .catch((e) => {
        my.alert({
          content: `task.favorItem: fail ${JSON.stringify(e)}`,
        });
        console.log(`task.favorItem: fail`, e);
      });
  },
  onTaskAddBag() {
    plugin.task.addBag({
      id: '636186398674',
      isShowSku: true,
    })
      .then((data) => {
        my.alert({
          content: `task.addBag: success ${JSON.stringify(data)}`,
        });
        console.log(`task.addBag: success`, data);
      })
      .catch((e) => {
        console.log(`task.addBag: fail`, e);
        my.alert({
          content: `task.addBag: fail ${JSON.stringify(e)}`,
        });
      });
  },
  onTaskShare() {
    plugin.task.share()
      .then((data) => {
        console.log(`task.share: success`, data);
      })
      .catch((e) => {
        console.log(`task.share: fail`, e);
      });
  },
  onTaskVideoLive() {
    plugin.task.appointLive({ feedId: '8dc80114-55d8-42ea-b6f1-bddc2656c321', duration: 3 });
  },
  onTaskGoShop() {
    plugin.task.goShop({ shopId: '389878997', duration: 3 });
  },
  onTaskJoinMember() {
    plugin.task
      .joinMember({
        sellerId: 2247603103,
      })
      .then(() => {
        my.alert({
          content: `入会成功`,
        });
      })
      .catch((e) => {
        my.alert({
          content: `入会失败 fail ${JSON.stringify(e)}`,
        });
      });
  },
  onTaskQueryInfo() {
    plugin.task
      .queryInfo()
      .then((res) => {
        my.alert({
          content: 'success' + JSON.stringify(res),
        });
      })
      .catch((reason) => {
        my.alert({
          content: 'fail' + reason,
        });
      });
  },
  queryShopCrowd() {
    plugin.crowd
      .queryShopCrowd({ sellerId: '2247603103' })
      .then((res) => {
        my.alert({
          content: `queryShopCrowd: success ${res}`,
        });
        console.log('queryShopCrowd', res);
      })
      .catch((err) => {
        console.log('queryShopCrowd error', err);
      });
  },
});
