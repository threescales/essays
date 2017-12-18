const md5 = require('md5');
const config = require('../../config/token.json');
const rootKey = config.root_key

export function getRememberMeToken(userId) {
    return md5(userId + rootKey)
}

export function getAuthcode(userId) {
    return md5(rootKey + userId)
}