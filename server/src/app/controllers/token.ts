import * as Koa from 'koa'
import { getUpToken } from '../components/qiniuSDK/index'
import { parseGetData } from '../utils/parseData'
import rq = require("request-promise")
const config = require("./token.json")
export default class TokenController {
  public static qiniuUpTokenGen(ctx: Koa.Context) {
    const uptoken = getUpToken()
    ctx.body = {
      uptoken
    }
  }
  public static async githubInfo(ctx: Koa.Context) {
    const code: string = parseGetData(ctx).code
    const client_id = config.github_client_id
    const client_secret = config.github_secret
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
    console.log(`github access_tokent is:${access_token}`);
    let userData = await rq.get(`https://api.github.com/user?access_token=${access_token}&scope=user`, {
      headers: {
        'User-Agent': '3142717@qq.com',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers':
          'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval'
      },
    })
    ctx.body= {
      userData
    }
  }
}
