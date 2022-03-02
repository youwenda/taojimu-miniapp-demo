# 首页

## 截图

### 首页

<img width="200" src="https://img.alicdn.com/imgextra/i3/O1CN0116zJCE1Qwp6wphT1X_!!6000000002041-0-tps-750-1624.jpg" />

### 互动规则浮层、我的奖励浮层

<img width="200" src="https://gw.alicdn.com/imgextra/i1/O1CN0184pOkP1JcUD8iwkZo_!!6000000001049-2-tps-750-1622.png" />
<img width="200" style="margin-left: 20px" src="https://img.alicdn.com/imgextra/i3/O1CN011lkjFT1cAWjOXlFfD_!!6000000003560-2-tps-750-1624.png" />

## 属性

### 属性介绍

| 属性名 | 类型 | 默认值 | 描述 |
| :-- | :-- | :-- | :-- |
| className | `String` | - | 自定义组件的样式 |
| dialogBgColor | `String` | `#F67F7F` | 互动规则、我的奖励浮层的背景色 |
| isFullScreen | `Boolean` | `false` | 互动是否全屏展示。为 false 时，互动高度以 gameBgImg（宽度换算为 750）的高度为准。为 true 时，互动高度为屏幕高度 |
| gameBgImg | `Object` | [见下文](#gamebgimg) | 小程序首页互动区域的背景图。尺寸要求：750x1624 的 png |
| gameMainImg | `Object` | [见下文](#gamemainimg) | 中心卡片区域。尺寸要求：680x950 的 png |
| gameIntro | `Object` | [见下文](#gameintro) | 动态互动介绍区域的介绍，支持格式： mp4、mov、gif、apng（apng 格式的图片后缀建议为 apng，否则没有动画效果），尺寸要求：600x480 |
| startBtnImg | `Object` | [见下文](#startbtnimg) | 开始按钮的图片。尺寸要求：530x100 的 png |
| ruleBtnImg | `Object` | [见下文](#rulebtnimg--prizebtnimg) | 点击查看互动规则按钮的图片。尺寸要求：80x80 的正方形 png |
| prizeBtnImg | `Object` | [见下文](#rulebtnimg--prizebtnimg) | 点击查看我的奖励按钮的图片。尺寸要求：80x80 的正方形 png |
| prizeDialogHeaderImg | `Object` | [见下文](#prizedialogheaderimg--ruledialogheaderimg) | 点击查看互动规则浮层头部的图片。尺寸要求：750x200 的 png |
| ruleDialogHeaderImg | `Object` | [见下文](#prizedialogheaderimg--ruledialogheaderimg) | 点击查看我的奖励浮层头部的图片。尺寸要求：750x200 的 png |
| onGameStart | `Function` | - | 点击开始按钮的回调 |
| onShowRule | `Function` | - | 点击查看互动规则按钮的回调 |
| onShowPrize | `Function` | - | 点击查看我的奖励按钮的回调 |

### gameBgImg

| 属性名 | 类型 | 默认值 | 描述 |
| :-- | :-- | :-- | :-- |
| src | `String` | [默认图片地址](https://gw.alicdn.com/imgextra/i4/O1CN011KxNRA1pouf7ZWr35_!!6000000005408-0-tps-750-1624.jpg) | 图片的 url |
| width | `Number` | 750 | 图片宽度 |
| height | `Number` | 1624 | 图片高度 |

### gameMainImg

| 属性名 | 类型 | 默认值 | 描述 |
| :-- | :-- | :-- | :-- |
| src | `String` | [默认图片地址](https://gw.alicdn.com/imgextra/i4/O1CN01zMQayG1CucaGQk8Ue_!!6000000000141-2-tps-680-950.png) | 图片的 url |
| width | `Number` | 680 | 图片宽度 |
| height | `Number` | 950 | 图片高度 |

### gameIntro

| 属性名 | 类型 | 默认值 | 描述 |
| :-- | :-- | :-- | :-- |
| src | `String` | - | 资源的 url |
| poster | `String` | - | 视频格式的互动介绍资源的封面图。若互动介绍资源为视频格式，则为必传项。 |
| duration | `String` | - | 视频格式的互动介绍资源的时长，单位秒。若互动介绍资源为视频格式，则为必传项。 |
| width | `Number` | 600 | 资源宽度 |
| height | `Number` | 480 | 资源高度 |

### startBtnImg

| 属性名 | 类型 | 默认值 | 描述 |
| :-- | :-- | :-- | :-- |
| src | `String` | [默认图片地址](https://gw.alicdn.com/imgextra/i1/O1CN01NzpykH1xPjocPEtLo_!!6000000006436-2-tps-530-100.png)</div> | 图片的 url |
| width | `Number` | 530 | 图片宽度 |
| height | `Number` | 100 | 图片高度 |

### ruleBtnImg | prizeBtnImg

| 属性名 | 类型 | 默认值 | 描述 |
| :-- | :-- | :-- | :-- |
| src | `String` | [规则按钮默认图片](https://gw.alicdn.com/imgextra/i3/O1CN01ccrcuq1C4PQYxazBX_!!6000000000027-2-tps-88-88.png)，[奖励按钮默认图片](https://gw.alicdn.com/imgextra/i2/O1CN01pGmoDu1YoaunYqEpy_!!6000000003106-2-tps-88-88.png) | 图片的 url |
| width | `Number` | 750 | 图片宽度 |
| height | `Number` | 200 | 图片高度 |

|

### prizeDialogHeaderImg | ruleDialogHeaderImg

| 属性名 | 类型 | 默认值 | 描述 |
| :-- | :-- | :-- | :-- |
| src | `String` | [奖励头图](https://gw.alicdn.com/imgextra/i4/O1CN01RRlJ9Y1Hl4Ofm2Ovk_!!6000000000797-2-tps-750-213.png)，[规则头图](https://gw.alicdn.com/imgextra/i4/O1CN01zekiO728rBJuXrfPL_!!6000000007985-2-tps-750-213.png) | 图片的 url |
| width | `Number` | 750 | 图片宽度 |
| height | `Number` | 200 | 图片高度 |

### 插槽介绍

| 插槽名 | 描述                                                 |
| :----- | :--------------------------------------------------- |
| rule   | 互动规则的内容                                       |
| prize  | 我的奖品的列表，或是奖品为空或拉取奖品出错的兜底状态 |

##

## 安装

```bash
# npm 国内用户可设置淘宝镜像
npm config set registry https://registry.npmmirror.com
npm install @taojimu/mx-home -S

# yarn
yarn add @taojimu/mx-home -S
```

##

## 使用

### 介绍

- 点击开始游戏后（即在`onGameStart`的回调中），开发者需要先通过 [taojimu.task.queryInfo](../../api/task#查询任务数据-taojimutaskqueryinfo) 查询任务数据，获得游戏剩余机会`chance`，若有游戏机会（chance > 0）则去游戏，否则则通过控制`mx-task`组件的`visible`属性打开任务面板，通过做任务来获取游戏机会。
- props 中的所有图片、视频数据对象，请从淘积木的 compExt 中读取。
- 首页的互动任务浮标需要自己实现，方案请点击查看 [互动任务浮标的文档](../../api/hdtask)
- 我的奖品列表上线后方可测试。我的奖品列表会查询淘积木页面 id 中所有历史奖池的中奖奖品并汇总，因此页面 id 要真实存在，且页面 id 要跟奖池进行绑定（即在淘积木编辑器选择页面用到的奖池，然后发布页面）。

### .json 示例代码

```json
{
  "usingComponents": {
    "mx-home": "@taojimu/mx-home/es/mx-home"
  }
}
```

### .axml 示例代码

```html
<mx-home
  onGameStart="onGameStart"
  onShowRule="onShowRule"
  onShowPrize="onShowPrize"
  gameIntro="{{gameIntro}}"
>
  <view class="home-rule" slot="rule">
    <view class="title">1.玩法说明</view>
    <view class="info"
      >活动期间，用户通过每日到访活动页面签到，完成规定的连续签到任务，即可获得“1分钱兑换商品”资格+0.01元零钱（以下简称“1分兑”资格）；用户需要进入页面开启签到进度。</view
    >
    <view class="title">2.游戏次数获取</view>
    <view class="info"
      >活动期间，符合条件的用户通过手机淘宝客户端，进入活动页面，即可根据页面提示参与活动。淘宝或天猫在支付宝等渠道发布的小程序无法参与本活动。</view
    >
    <view class="title">3.奖励说明</view>
    <view class="info"
      >活动期间，符合条件的用户通过手机淘宝客户端，进入活动页面，即可根据页面提示参与活动。淘宝或天猫在支付宝等渠道发布的小程序无法参与本活动。</view
    >
    <view class="title">4.活动时间</view>
    <view class="info">2021年3月8日00:00:00——2022年4月30日23:59:59</view>
  </view>
</mx-home>
```

### .js 示例代码

```js
const taojimu = requirePlugin('taojimu');

Page({
  data: {},
  onLoad() {
    const compExt = my.getExtConfigSync().componentTree[0].compExt;

    this.setData({
      gameIntro: compExt.video_gameIntro,
    });
  },
  onGameStart() {},
  onShowRule() {},
  onShowPrize() {},
});
```

### ext.json 示例代码

如何生成具体的数据请参见 [meta 文档](../../meta)

```json
{
  "extEnable": true,
  "ext": {
    "componentTree": [
      {
        "meta": [
          {
            "title": "视频选择",
            "extension": { "recsize": 0.5 },
            "key": "video_gameIntro",
            "type": "video_unify"
          }
        ],
        "compExt": {
          "video_gameIntro": {
            "duration": 3,
            "url": "https://a1.alibabausercontent.com/prod/feupload/user/qr/c3e1a9a0-2b10-11ec-baf0-fff1de6c9a40.mp4_.mp4",
            "width": 800,
            "height": 800,
            "snapshot": "https://a1.alibabausercontent.com/prod/feupload/user/qr/c3e1a9a0-2b10-11ec-baf0-fff1de6c9a40.mp4_.mp4?x-oss-process=video/snapshot,t_0,w_800,h_800",
            "poster": "https://a1.alibabausercontent.com/prod/feupload/user/qr/c3e1a9a0-2b10-11ec-baf0-fff1de6c9a40.mp4_.mp4?x-oss-process=video/snapshot,t_0,w_800,h_800",
            "name": "8WUelvWCo9MVQW2AAh5.mp4"
          }
        },
        "version": "0.0.1"
      }
    ]
  }
}
```
