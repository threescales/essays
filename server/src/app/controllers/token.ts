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
    console.log(ctx)
    const code: string = parseGetData(ctx).code
    console.log(code)
    const client_id = config.github_client_id
    const client_secret = config.github_secret
    const url: string = "https://github.com/login/oauth/access_token";
    console.log(`github code id${code}`)
    console.log(`github client_id id${client_id}`)
    console.log(`github client_secret id${client_secret}`)
    let options = {
      method: 'POST',
      uri: url,
      headers:{
        Accept: "application/json"        
      },
      form: {
        code, client_id, client_secret,accept:'json'
      }
    }
    let data = await rq(url, options)
    console.log(`github access_token data is: ${data}`)
    let access_token = JSON.parse(data).access_token
    console.log(`github access_tokent is:${access_token}`);
    let userData = await rq.get(`https://api.github.com/user?access_token=${access_token}&scope=user`)
    console.log(userData)
  }
}
