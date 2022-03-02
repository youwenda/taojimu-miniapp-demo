var trackerConfig = {
  'startInteractive': {
    atype: 'startInteractive',
    atitle: '开始游戏'
  },
  'rule': {
    atype: 'rule',
    atitle: '点击规则'
  },
  'prize': {
    atype: 'prize',
    atitle: '点击奖励'
  },
  'goShop': {
    atype: 'goShop',
    atitle: '点击去使用'
  }
};
Object.keys(trackerConfig).forEach(function (k) {
  Object.assign(trackerConfig[k], {
    itype: 'taojimu_mx_home_0.0.13'
  });
});
export default trackerConfig;