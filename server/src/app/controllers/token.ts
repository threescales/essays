import * as Koa from 'koa'
import { getUpToken } from '../components/qiniuSDK/index'
import { parseGetData } from '../utils/parseData'
import rq = require("request-promise")
const config = require("../../config/token.json")
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

    const type = params[0]

    let userId = ""
    let userToken = ""
    if (type == "bind") {
      userId = params[1]
      userToken = params[2]
    }
    //校验用户
    if ((!userId || userToken != getRememberMeToken(userId)) && type == 'bind') {
      ctx.redirect("/")
    }

    //获取github信息
    const client_id = config.github_client_id
    const client_secret = config.github_secret
    let access_token = await OAuthUtils.getGithubAccessToken(code, client_id, client_secret)
    let data = await OAuthUtils.getGithubData(access_token);
    console.log(`github get data is :${data.toString()}`)

    //通过github授权获取的id获取userId
    if (type == "login" && !userId) {
      let userAssociation: any = await UserAssociation.findOne({ openid: data.id.toString() })
      userId = userAssociation.userId
    } else if (type == "bind") {
      //若已经绑定此github账号，则返回不处理。
      let userAssociation: any = await UserAssociation.findOne({ openid: data.id.toString() })
      if (userAssociation) {
        ctx.redirect("/")
      }
    }

    //获取user
    let user = await User.findById(userId)
    //若查询不到，则新建user
    if (!user) {
      let userData = {
        name: data.login,
        password: " ",
        email: data.email || ' ',
        avatar: data.avatar_url,
        isAdmin: false,
        createTime: new Date()
      }
      user = new User(userData)
      user = await user.save()
      userId = user._id
    }

    //获取用户关联的github
    let oldUserAssociation = await UserAssociation.findOne({ userId: userId, type: 'github' })
    if (!oldUserAssociation) {
      let userAssociationData = {
        userId: userId,
        openid: data.id.toString(),
        type: 'github',
        info: data.html_url,
        createTime: new Date()
      }
      let userAssociation = new UserAssociation(userAssociationData)
      let result = await userAssociation.save()
    }

    //将userId，token存入cookie，完成登录
    ctx.cookies.set('userId', user._id, cookieSetting)
    ctx.cookies.set('essays_rememberMe_token', getRememberMeToken(user._id), cookieSetting)
    if (type == 'bind') {
      ctx.redirect("/account")
    } else {
      ctx.redirect('/')
    }
  }
}

