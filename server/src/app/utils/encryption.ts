const md5 = require('md5');

const rootKey = "zhanzhangzhenshuai"

export function getRememberMeToken(userId) {
    return (userId + rootKey)
}

