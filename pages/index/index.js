Page({
  data: {},
  onLoad() {
    this.setData({
      isFullScreen: true,
      gameIntro: {
        'src': 'https://lego.alicdn.com/res/tjm/v/2247603103_9tJGcNkO18ExnKRf_sd.mp4',
        'width': 600,
        'height': 480,
        duration: '3.804000',
        poster: 'https://lego.alicdn.com/res/tjm/p/2247603103_9tJGcNkO18ExnKRf_snapshot.jpg',
      },
    });
  },
  onGameStart() {
    my.navigateTo({
      url: '/pages/game/index'
    });
  },
  onShowRule() {},
  onShowPrize() {},
});