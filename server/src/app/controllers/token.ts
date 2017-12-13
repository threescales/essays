import * as Koa from 'koa'
import { getUpToken } from '../components/qiniuSDK/index'
import { parseGetData } from '../utils/parseData'
import rq = require("request-promise")
const config = require("./token.json")
import { User } from '../models/User';
import { UserAssociation } from '../models/UserAssociation'
import * as OAuthUtils from '../utils/oauth'
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
    let access_token = await OAuthUtils.getGithubAccessToken(code, client_id, client_secret)

    console.log(`github access_tokent is:${access_token}`);
    let data = await OAuthUtils.getGithubData(access_token);
    ctx.body = {
      data
    }
  }

  public static async bindGithub(ctx: Koa.Context) {
    const code: string = parseGetData(ctx).code
    const userId: string = parseGetData(ctx).state
    const client_id = config.github_client_id
    const client_secret = config.github_secret
    let access_token = await OAuthUtils.getGithubAccessToken(code, client_id, client_secret)
    console.log(`github access_tokent is:${access_token}`);
    let data = await OAuthUtils.getGithubData(access_token);

    let user = await User.findById(userId)

    let userAssociationData = {
      userId:userId,
      openid:data.openid,
      type:'github',
      info:data.current_user_url,
      createTime:new Date()
    }
    let userAssociation = new UserAssociation(userAssociationData)
    let result = userAssociation.save()
    ctx.redirect("/account")
  }
}

