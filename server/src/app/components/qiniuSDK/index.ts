import qiniu = require('qiniu')
import config = require('config');
qiniu.conf.ACCESS_KEY = process.env.AK || 'IYzx-ZkJEl0VzoqJE7lxQPgOvEaQLThjIXnNfF7-'
qiniu.conf.SECRET_KEY = process.env.SK || 'PZkYRKgFwX6foTZZsiXU8PDI8qp3sMt62IsCykxT'
_configCheck()

export function getUpToken(bucket = {scope:'youming133'}) {
  const putPolicy = new qiniu.rs.PutPolicy(bucket);
  return putPolicy.uploadToken()
}



function _configCheck() {
  if (!qiniu.conf.ACCESS_KEY || !qiniu.conf.SECRET_KEY) {
    warn(`[QiniuSDK]:Invalid ACCESS_KEY or SECRET_KEY \n
              current access_key ${qiniu.conf.ACCESS_KEY}\n
              current access_key ${qiniu.conf.SECRET_KEY}\n`)
  }
}

function warn(msg?: string) {
  if (process.env.NODE_ENV === 'production') {
    throw new TypeError(msg)
  } else {
    console.warn('Waring:' + msg)
  }
}