import { types } from "../constants/entityType";
import { QINIU_CDN } from "app/constants/commonTypes";
var matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;

export function isUrl(string) {
  return matcher.test(string);
}

export function getEntityTypeByUrl(url: string) {
  if (isUrl(url)) {
    if (/ximalaya/.test(url)) {
      return;
    } else if (/^http(s)?:\/\/v\.qq\.com/.test(url)) {
      return "video";
    } else if (/tudou/.test(url)) {
      return "video";
    } else if (/youku/.test(url)) {
      return "video";
    } else if (/iqiyi/.test(url)) {
      return "video";
    } else if (/\.mp3/.test(url)) {
      return "audio";
    } else {
      return types.PAGE;
    }
  } else {
    return null;
  }
}

export function getImgUrl(key) {
  if (key.indexOf("//") > -1) {
    return key;
  } else {
    return `${QINIU_CDN}${key}`;
  }
}

export function getDomain(url) {
  let domain = url.split("/");

  if (url.indexOf("//") > -1) {
    return domain[2];
  } else {
    return domain[0];
  }
}

export function getUrl(url) {
  return decodeURIComponent(url);
}
