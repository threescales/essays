import rq = require("request-promise")

export async function getGithubAccessToken(code,client_id,client_secret) {
    const url: string = "https://github.com/login/oauth/access_token";
    let options = {
      method: 'POST',
      uri: url,
      headers: {
        Accept: "application/json"
      },
      form: {
        code, client_id, client_secret, accept: 'json'
      }
    }
    let data = await rq(url, options)
    let access_token = JSON.parse(data).access_token
    return access_token
}

export async function getGithubData(access_token) {
  let data = await rq.get(`https://api.github.com/user?access_token=${access_token}&scope=user`, {
    headers: {
      'User-Agent': '3142717@qq.com',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers':
        'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval'
    },
  })
  return data
}