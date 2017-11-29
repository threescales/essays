const config = require("../../qiniu.json")
export function getImageUrl(url) {
    if (url && url.indexOf(config.cdn) > -1) {
        return `${url}?imageslim`
    }
    return url
}