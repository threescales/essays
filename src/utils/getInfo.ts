const config = require("../../qiniu.json")
export function getImageUrl(url, width?, height?) {
    if (url && url.indexOf(config.cdn) > -1) {
        if (width && height) {
            return `${url}?imageView2/5/w/${width}/h/${height}/q/75|imageslim`
        }
        return `${url}?imageslim`
    }
    return url
}
