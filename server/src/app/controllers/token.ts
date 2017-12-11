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
    const url: any = "https://github.com/login/oauth/access_token";
    console.log(`github code id${code}`)
    console.log(`github client_id id${client_id}`)
    console.log(`github client_secret id${client_secret}`)
    let options = {
      method:'POST',
      uri:url,
      body:{
        code, client_id, client_secret
      }
    }
    let data = await rq(options)
    console.log(`github access_token is:${data.toString()}`)
  }
}
