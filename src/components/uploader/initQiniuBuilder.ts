import { UploaderBuilder, Uploader } from "qiniu4js";
declare var __DEV__;
declare var __TEST__;

/**
 * @doc https://github.com/lsxiao/qiniu4js
 */
export default function initQiniuBuilder({
  button,
  tokenUrl = "/api/uptoken",
  listener,
 }: IUpdateOptions): IQiniuUploader {
  return new UploaderBuilder()
    .debug(__DEV__ || __TEST__)
    .domain("//up-z0.qiniu.com")
    .button(button)
    .tokenUrl(tokenUrl)
    .interceptor(defaultInterceptor)
    .listener(listener)
    .build();
}

const defaultInterceptor:any = {
  // 拦截任务,返回true，任务将会从任务队列中剔除，不会被上传
  onIntercept: function (task: UploaderTask) {
    return task.file.size > 1024 * 10240;
  },
  // 中断任务，返回true，任务队列将会在这里中断，不会执行上传操作。
  onInterrupt: function (task: any) {
    if (this.onIntercept(task)) {
      alert("请上传小于10m的文件");
      return true;
    } else {
      return false;
    }
  }
};
