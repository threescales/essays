const md5 = require('md5');

const rootKey = "zhanzhangzhenshuai"

export function getRememberMeToken(userId) {
    return md5(userId + rootKey)
}

export function getAuthcode(userId) {
    return md5(rootKey + userId)
}