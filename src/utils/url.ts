import {types} from '../constants/entityType'
var matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;

export function isUrl(string) {
    return matcher.test(string);
  }
  
  export function getEntityTypeByUrl(url: string) {
    if (isUrl(url)) {
      if (/ximalaya/.test(url)) {
        return
      } else if (/^http(s)?:\/\/v\.qq\.com/.test(url)) {
        return 'video'
      } else if (/tudou/.test(url)) {
        return 'video'
      } else if (/youku/.test(url)) {
        return 'video'
      } else if (/iqiyi/.test(url)) {
        return 'video'
      } else if (/\.mp3/.test(url)) {
        return 'audio'
      } else {
        return types.PAGE
      }
    } else {
      return null
    }
  }

  export function getUrl(key) {
    if(key.indexOf('//')>-1) {
      return key
    } else {
      return `//image.zymlj.net/${key}`
    }
  }