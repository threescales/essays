function Result(success, data, message) {
  this.success = success;
  this.message = message;
  this.data = data;
}

export function assemblyResult(data, success = true, message = null) {
  if (success) {
    message = "操作成功";
  } else {
    if (!message) {
      message = "操作失败";
    }
  }
  return new Result(success, data, message);
}
