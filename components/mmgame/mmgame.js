import { MainApplication } from '/gamedemo/MainApplication';
import { PGlobal } from '@tbminiapp/mmgamelite-miniapp';
import getApplicationOptions from '/gamedemo/ApplicationOptions';

// 互动玩法的具体实现逻辑

Component({
  mixins: [],
  data: {
    mmgameCanvasOptions: {
      // 手动指定application的尺寸
      // width:750,
      // height:750,
      // 全屏-以窗口宽高作为application的尺寸，当设置此选项后，手动设置的width\height会失效
      isFullScreen: true,
    },
  },
  props: {
    // 组件的编辑数据
    compExt: null
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    onMMGameCanvasError(e) {
      console.log(e);
    },
    onMMGameCanvasDidUnmount(e) {
      this.canvas = null;
      this.mmgameApplication && this.mmgameApplication.destroy();
    },
    onCanvasInit(e) {
      const { canvas, options } = e;
      const ApplicationOptions = getApplicationOptions();
      console.log('ApplicationOptions', ApplicationOptions);
      const mmgameApplicationOptions = {
        view: canvas,
        ...ApplicationOptions,
        ...options
      };
      PGlobal.Options = mmgameApplicationOptions;
      PGlobal.CustomResourceMap = {};
      PGlobal.UserData = {};
      PGlobal.globalPropertys = {};
      const customResource = mmgameApplicationOptions.resource;
      if (customResource && customResource.length > 0) {
        for (let k = 0; k < customResource.length; k++) {
          PGlobal.CustomResourceMap[customResource[k].name] = customResource[k];
        }
      }
      this.canvas = canvas;
      this.mmgameApplication = new MainApplication(
        mmgameApplicationOptions
      );
    },
  },
});
