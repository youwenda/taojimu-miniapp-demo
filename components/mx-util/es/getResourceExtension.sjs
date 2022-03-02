//（mx-dialog-body 的上下padding + mx-task-message的高度 + 单个任务的高度 * 任务的数量，再除以100换算成rem单位）。10.72是这个区域的最大高度
export default function getResourceExtension(url) {
  const PathTrimParamsReg = getRegExp('[#?].*$');
  url = `${url}`.replace(PathTrimParamsReg, '');
  return url.split('.').reverse()[0].toLowerCase() || 'jpg';
}
