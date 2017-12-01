const md5 = require('md5');

const rootKey = "zhanzhangzhenshuai"

export function getRememberMeToken(userId, password) {
    return (userId + rootKey + password)
}