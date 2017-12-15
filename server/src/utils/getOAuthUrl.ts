const config = require('../config/token.json')
export function getGithubUrl(state = new Date().getTime().toString()) {
    return `https://github.com/login/oauth/authorize?client_id=${config.github_client_id}&scope=user.email&state=${state}`
}