import TrackConfig from './TrackConfig';
export class Tracker {
  static send(targetName, eventName, displayPath) {
    const { commonData, target } = TrackConfig;
    const trackeData = target[targetName];
    if (!trackeData) return;
    console.log('Tracker.send', { targetName, eventName, displayPath }, trackeData, commonData);
    // 下方为发送监测逻辑
    // ......


  }
}