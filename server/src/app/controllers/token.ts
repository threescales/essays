import * as Koa from 'koa'
import { getUpToken } from '../components/qiniuSDK/index'
import { parseGetData } from '../utils/parseData'
import rq = require("request-promise")
const config = require("./token.json")
import { User } from '../models/User';
import { UserAssociation } from '../models/UserAssociation'
import * as OAuthUtils from '../utils/oauth'
import { getRememberMeToken } from '../utils/encryption'
import { getExpires, maxAge } from '../utils/date'

const cookieSetting = { maxAge: maxAge, overwrite: false, expires: getExpires(), httpOnly: false }
export default class TokenController {
  public static qiniuUpTokenGen(ctx: Koa.Context) {
    const uptoken = getUpToken()
    ctx.body = {
      uptoken
    }
  }
  public static async githubInfo(ctx: Koa.Context) {
    const code: string = parseGetData(ctx).code
    const params: string = parseGetData(ctx).state.split(",")
    const userId = params[0]
    const userToken = params[1]
    const type = params[2]
    //校验用户
    if (userToken != getRememberMeToken(userId)) {
      ctx.redirect("/")
    }

    //获取github信息
    const client_id = config.github_client_id
    const client_secret = config.github_secret
    let access_token = await OAuthUtils.getGithubAccessToken(code, client_id, client_secret)
    console.log(`github access_tokent is:${access_token}`);
    let data = await OAuthUtils.getGithubData(access_token);
    console.log(data.toString())

    //获取user
    let user = await User.findById(userId)
    if(!user) {
      let userData = {
        name: data.login,
        password: "111111",
        email: data.email||' ',
        avatar: data.avatar_url,
        isAdmin: false,
        createTime: new Date()
      }
      user = new User(userData)
      user = await user.save()
    }

    //获取用户关联的github
    let oldUserAssociation = await UserAssociation.findOne({ userId: userId,type: 'github' })
    if (!oldUserAssociation) {
      console.log("github html_url is :"+data.html_url)
      console.log("github openid is:"+data.id)
      let userAssociationData = {
        userId: userId,
        openid: data.id.toString(),
        type: 'github',
        info: data.html_url,
        createTime: new Date()
      }
      let userAssociation = new UserAssociation(userAssociationData)
      let result = userAssociation.save()
    }
    ctx.cookies.set('userId', user._id, cookieSetting)
    ctx.cookies.set('essays_rememberMe_token', getRememberMeToken(user._id), cookieSetting)
    ctx.redirect("/account")
  }
}

