import { fmtEvent, isFunction, sendPV, getShopName, getShopLogo, getShopId } from "@taojimu/mx-util";
import trackerConfig from './trackerConfig';

var noop = function noop() {};

var taojimu = requirePlugin('taojimu');
Component({
  mixins: [],
  data: {
    target: '',
    prizeList: [],
    hasOpened: true,
    prizeListCount: 0,
    getAllPrize: false,
    spinning: true
  },
  props: {
    // 自定义class
    className: '',
    isFullScreen: false,
    isCutGameBgImg: true,
    dialogBgColor: '#F67F7F',
    gameBgImg: {
      'src': 'https://gw.alicdn.com/imgextra/i4/O1CN011KxNRA1pouf7ZWr35_!!6000000005408-0-tps-750-1624.jpg',
      'width': 750,
      'height': 1624
    },
    gameMainImg: {
      'src': 'https://gw.alicdn.com/imgextra/i4/O1CN01zMQayG1CucaGQk8Ue_!!6000000000141-2-tps-680-950.png',
      'width': 680,
      'height': 950
    },
    gameIntro: {
      'src': '',
      'width': 600,
      'height': 480,
      'duration': 0,
      'poster': ''
    },
    startBtnImg: {
      'src': 'https://gw.alicdn.com/imgextra/i1/O1CN01NzpykH1xPjocPEtLo_!!6000000006436-2-tps-530-100.png',
      'width': 530,
      'height': 100
    },
    ruleBtnImg: {
      'src': 'https://gw.alicdn.com/imgextra/i3/O1CN01ccrcuq1C4PQYxazBX_!!6000000000027-2-tps-88-88.png',
      'width': 88,
      'height': 88
    },
    prizeBtnImg: {
      'src': 'https://gw.alicdn.com/imgextra/i2/O1CN01pGmoDu1YoaunYqEpy_!!6000000003106-2-tps-88-88.png',
      'width': 88,
      'height': 88
    },
    prizeDialogHeaderImg: {
      'src': 'https://gw.alicdn.com/imgextra/i4/O1CN01RRlJ9Y1Hl4Ofm2Ovk_!!6000000000797-2-tps-750-213.png',
      'width': 750,
      'height': 213
    },
    ruleDialogHeaderImg: {
      'src': 'https://gw.alicdn.com/imgextra/i4/O1CN01zekiO728rBJuXrfPL_!!6000000007985-2-tps-750-213.png',
      'width': 750,
      'height': 213
    },
    lazyload: true,
    limit: 10,
    onGameStart: noop,
    onShowRule: noop,
    onShowPrize: noop
  },
  onInit: function onInit() {},
  didMount: function didMount() {
    this.renderPromise = Promise.resolve();
    sendPV({
      mid: 'taojimu_mx_home',
      version: '0.0.13'
    });
  },
  didUnmount: function didUnmount() {},
  methods: {
    setDataPromise: function setDataPromise() {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new Promise(function (resolve) {
        _this.setData.apply(_this, args.concat([function () {
          return resolve();
        }]));
      });
    },
    onGameStart: function onGameStart(e) {
      var onGameStart = this.props.onGameStart;
      taojimu.log.sendLog(trackerConfig.startInteractive);

      if (isFunction(onGameStart)) {
        var event = fmtEvent(this.props, e);
        onGameStart(event);
      }
    },
    onShowRule: function onShowRule(e) {
      var onShowRule = this.props.onShowRule;
      this.setData({
        hasOpened: true,
        target: 'rule'
      });
      taojimu.log.sendLog(trackerConfig.rule);

      if (isFunction(onShowRule)) {
        var event = fmtEvent(this.props, e);
        onShowRule(event);
      }
    },
    getPrizes: function getPrizes() {
      var _this2 = this;

      var limit = this.props.limit;
      var _this$data = this.data,
          prizeListCount = _this$data.prizeListCount,
          getAllPrize = _this$data.getAllPrize;

      if (getAllPrize) {
        return Promise.resolve();
      }

      return taojimu.prize.queryMyPrizes({
        start: prizeListCount * limit,
        limit: limit
      }).then(function (prizeData) {
        if (prizeData === void 0) {
          prizeData = {};
        }

        // prizeData.total 是一个人在当前页面上中奖条数的总数，不是取出的总数
        var chunkData = {
          spinning: false,
          prizeListCount: prizeListCount + 1
        };
        var length = _this2.data.prizeList.length;

        if (!prizeData.prizes || !prizeData.prizes.length) {
          return _this2.setDataPromise({
            spinning: false,
            getAllPrize: true,
            prizeStatus: 'empty'
          });
        }

        prizeData.prizes.forEach(function (item, index) {
          var _Object$assign;

          var rightTypeId = item.rightTypeId,
              prizeType = item.prizeType;
          var data;

          if (rightTypeId == 165) {
            var name = item.name,
                rightId = item.rightId,
                winDate = item.winDate;
            data = {
              rightTypeId: rightTypeId,
              name: name,
              rightId: rightId,
              date: winDate ? winDate.split(' ')[0] : '-'
            };
          } else if (rightTypeId == 3) {
            data = {
              rightTypeId: rightTypeId,
              shopName: getShopName(),
              shopLogo: getShopLogo(),
              name: prizeType == -2 ? '商品' : '店铺',
              amount: isNaN(parseFloat(item.amount / 100)) ? '-' : parseFloat(item.amount / 100),
              condition: isNaN(parseFloat(item.condition / 100)) ? '' : parseFloat(item.condition / 100)
            };
          } else if (rightTypeId == 1030) {
            data = {
              rightTypeId: rightTypeId,
              amount: isNaN(parseFloat(item.amount / 100)) ? '-' : parseFloat(item.amount / 100)
            };
          }

          Object.assign(chunkData, (_Object$assign = {}, _Object$assign["prizeList[" + (index + length) + "]"] = data, _Object$assign));
        });
        return _this2.setDataPromise(chunkData);
      }).catch(function () {
        return _this2.setDataPromise({
          hasOpened: true,
          target: 'prize',
          prizeStatus: 'empty'
        });
      });
    },
    onShowPrize: function onShowPrize(e) {
      var _this3 = this;

      var onShowPrize = this.props.onShowPrize;
      taojimu.log.sendLog(trackerConfig.prize);
      this.setData({
        hasOpened: true,
        target: 'prize'
      });
      this.renderPromise = this.renderPromise.then(function () {
        return _this3.getPrizes();
      });

      if (isFunction(onShowPrize)) {
        var event = fmtEvent(this.props, e);
        onShowPrize(event);
      }
    },
    onScrollToLower: function onScrollToLower() {
      var _this4 = this;

      var getAllPrize = this.data.getAllPrize;

      if (getAllPrize) {
        return;
      }

      this.setData({
        spinning: true
      });
      this.renderPromise = this.renderPromise.then(function () {
        return _this4.getPrizes();
      });
    },
    onCancel: function onCancel() {
      this.setData({
        target: null
      });
    },
    onGoShop: function onGoShop() {
      taojimu.log.sendLog(trackerConfig.goShop);
      taojimu.shop.goShop({
        shopId: "" + getShopId()
      });
    }
  }
});