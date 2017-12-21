import * as Koa from 'koa'
import { getUpToken } from '../components/qiniuSDK/index'
import { parseGetData } from '../utils/parseData'
import rq = require("request-promise")
const config = require("../../config/token.json")
import Sequelize = require('sequelize')
import Model from '../models/index'
const User: Sequelize.Model<Sequelize.Instance<any>, any> = Model['user']
const Accounts: Sequelize.Model<Sequelize.Instance<any>, any> = Model['accounts']
import * as OAuthUtils from '../utils/oauth'
import { getRememberMeToken } from '../utils/encryption'
import { getExpires, maxAge } from '../utils/date'
import { AccountTypes } from '../constants/accountTypes'
import { CookieKeys } from '../constants/cookieKeys'
enum OperaTypes {
  LOGIN = 'login',
  BIND = 'bind',
  SIGNUP = 'signup'
}
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
    if (type == OperaTypes.BIND) {
      userId = params[1]
      userToken = params[2]
    }
    //校验用户
    if (type == OperaTypes.BIND && (!userId || userToken != getRememberMeToken(userId))) {
      ctx.redirect("/")
      return
    }

    //获取github信息
    const client_id = config.github_client_id
    const client_secret = config.github_secret
    let access_token = await OAuthUtils.getGithubAccessToken(code, client_id, client_secret)
    let data = await OAuthUtils.getGithubData(access_token);
    console.log(`github get data is :${JSON.stringify(data)}`)

    //通过github授权获取的id获取userId
    if (type == OperaTypes.LOGIN && !userId) {
      console.log(data.id)
      let account: any = await Accounts.findOne({
        where: {
          openid: data.id.toString()
        }
      })
      userId = account ? account.userId : null
    } else if (type == OperaTypes.BIND) {
      //若已经绑定此github账号，则返回不处理。
      let account: any = await Accounts.findOne({
        where: {
          openid: data.id.toString(),
          type: AccountTypes.GITHUB
        }
      })
      console.log(`bind user data is:${JSON.stringify(account)}`)
      if (account) {
        ctx.redirect("/")
        return
      }
    }

    //获取user

    let user: any = userId ? await User.findById(userId) : null
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
      user = await User.create({
        name: data.login,
        password: "",
        email: '',
        avatar: data.avatar_url,
        isAdmin: false
      })
      userId = user.id
    }

    //获取用户关联的github
    let oldAccount = await Accounts.findOne({ where: { userId: userId, type: AccountTypes.GITHUB } })
    if (!oldAccount) {
      let accountData = {
        userId: userId,
        openid: data.id.toString(),
        type: AccountTypes.GITHUB,
        info: data.html_url,
      }
      let account = await Accounts.create(accountData)
    }

    //将userId，token存入cookie，完成登录
    ctx.cookies.set(CookieKeys.USER_ID, user.id, cookieSetting)
    ctx.cookies.set(CookieKeys.REMEMBER_ME, getRememberMeToken(user.id), cookieSetting)
    if (type == OperaTypes.BIND) {
      ctx.redirect("/account")
    } else {
      ctx.redirect('/')
    }
  }
}

