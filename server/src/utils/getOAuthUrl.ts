const config = require('../app/controllers/token.json')
export function getGithubUrl() {
    return `https://github.com/login/OAuth/authorize?client_id=${config.github_client_id}`
}