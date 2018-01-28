const config = require("../../config/qiniu.json");
const DEFAULT_IMG = "http://api.dujin.org/bing/1920.php";

export function getImageUrl(url, width?, height?) {
  if (!url) {
    return DEFAULT_IMG;
  }

  if (url.indexOf(config.cdn) > -1) {
    if (width && height) {
      return `${url}?imageView2/5/w/${width}/h/${height}/q/75|imageslim`;
    }
    return `${url}?imageslim`;
  }

  return url;
}

export function setWindowTitle(title = "") {
  window.document.title = `${title}「随笔」`;
}

export function getCompressImg(url) {
  if (url.indexOf(config.cdn) > -1) {
    return `${url}?imageView2/2/w/700/q/75|imageslim`;
  }
  return url;
}

export function getGaussianImg(url) {
  if (url.indexOf(config.cdn) > -1) {
    return `${url}?imageView2/0/w/10/h/10/q/75|imageslim`;
  }
  return url;
}

export function supportWebp() {
  return !!document["SUPPORT_WEBP"];
}

export function getWebpParam() {
  return supportWebp() ? "/format/webp" : "";
}
