export default function ApplicationOptions() {
  const { globalData: { pageConf } } = getApp();
  const component = pageConf.componentTree[0];
  return {
    // 是否撑满屏幕
    "isFixToWindow": true,
    // canvas背景是否透明
    "transparent": false,
    "containerElementId": "container",
    // canvas背景颜色
    "backgroundColor": 0xFFBCBF,
    // 是否强制使用2d上下文渲染,如果为flase 则使用webgl渲染
    "forceCanvas": false,
    // 资源存储的根路径
    "basePath": "https://g.alicdn.com/mm/fi-handar-web/0.0.6/resources",
    // 店铺信息
    "shopInfo": pageConf.pageAttribute.shopInfo,
    // 分享信息
    "share": {
      "title": '测试分享标题',
      "text": '测试分享文案',
      "image": '',
      "url": 'https://test.tmall.com/'
    },
    // 活动信息
    "activityInfo": {
      // 活动周期时间戳，走配置
      "timeRang": component.compExt.timeRange.dates,
      // 活动名称，不太需要
      "activityName": "test",
      // 活动id 会自动注入
      "activityId": `${pageConf.id}-test`,
    },
    "coupons": [ component.compExt.couponsPrefetchData ],
    // 商家选择的宝贝信息
    "items": component.compExt.items,
    // 替换的资源
    "resource": [
      {
        name: 'r_bg',
        type: 'image',
        url: component.compExt.r_bg.src
      },
      {
        name: 'startText',
        type: 'text',
        content: component.compExt.startText
      },
      {
        name: 'txtChanges',
        type: 'text',
        content: component.compExt.txtChanges
      },
      {
        name: 'mcGameTitle',
        type: 'color',
        value: component.compExt.mcGameTitle[0]
      }
    ],
    // 布局的基础宽度
    "baseWidth": 750,
    // 布局的基础高度
    "baseHeight": 1334
  }
};