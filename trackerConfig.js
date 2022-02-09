/**
 * 埋点配置规范
 * 1. 埋点配置项格式见下：
 * 2. 埋点配置里定义的每一项，都需要在业务代码里有对应埋点上报方法的调用。
 *    如：开始互动 - taojimu.log.sendLog(trackerConfig.startInteractive); 
 *    如果定义的埋点信息未在业务代码里上报，代码上传时会无法通过校验。
 */
const trackerConfig = {

  // 公用埋点声明
  // 请勿删除
  startInteractive: {
    // 日志类型
    atype: 'startInteractive',
    // 日志标识
    atitle: '开始互动'
  },

};

export default trackerConfig;