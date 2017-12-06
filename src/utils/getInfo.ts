const config = require("../../qiniu.json")
export function getImageUrl(url, width?, height?) {
    if (url && url.indexOf(config.cdn) > -1) {
        if (width && height) {
            return `${url}?imageMogr2/auto-orient/thumbnail/${width}x${height}/blur/1x0/quality/75|imageslim`
        }
        return `${url}?imageslim`
    }
    return url
}