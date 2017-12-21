import koa = require('koa')

import Sequelize = require('sequelize')
import Model from '../models/index'

const User: Sequelize.Model<Sequelize.Instance<any>, any> = Model['user']
const Accounts: Sequelize.Model<Sequelize.Instance<any>, any> = Model['accounts']
import { parsePostData, parseGetData } from '../utils/parseData'
import { getExpires, maxAge } from '../utils/date'
import { getRememberMeToken, getAuthcode } from '../utils/encryption'
const md5 = require("md5")
import { sendMail } from '../utils/email'
import { CookieKeys } from '../constants/cookieKeys'

const cookieSetting = { maxAge: maxAge, overwrite: false, expires: getExpires(), httpOnly: false }
export default class UserController {

    public static async getUserById(ctx: koa.Context) {
        let userId = ctx.cookies.get(CookieKeys.USER_ID)
        let token = ctx.cookies.get(CookieKeys.REMEMBER_ME)
        let user: any = await User.findById(userId, {
            include: [
                { model: Accounts, as: 'accounts' }
            ]
        })
        let data = null
        let success = false
        if (token === getRememberMeToken(userId)) {
            data = user
            success = true
        }
        ctx.body = {
            success,
            data
        }
    }

    public static async getUserInfo(ctx: koa.Context) {
        let userId = parseGetData(ctx).userId
        let user: any = await User.findById(userId, {
            include: [
                { model: Accounts, as: 'accounts' }
            ]
        })

        user.password = null;
        user.phone = null;

        ctx.body = {
            success: true,
            data: user,
        }
    }

    public static async login(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)
        let password = md5(request.password)

        let account: any = await Accounts.findOne({ where: { openid: request.account, type: 'email' } })
        if (!account) {
            ctx.body = {
                success: false,
                data: '请先验证您的邮箱',
            }
            return
        }
        let data: any = await User.findById(account.userId, {
            include: [
                { model: Accounts, as: 'accounts' }
            ]
        })
        if (data.password != password) {
            ctx.body = {
                success: false,
                data: '您输入的密码有误，请重新输入',
            }
            return
        }
        let success = false
        if (data) {
            ctx.cookies.set(CookieKeys.USER_ID, data.id, cookieSetting)
            ctx.cookies.set(CookieKeys.REMEMBER_ME, getRememberMeToken(data.id), cookieSetting)
            success = true

        }
        ctx.body = {
            success,
            data,
        }
    }

    public static async createUser(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)
        let nowTime = new Date();
        let email = request.account
        let user = await User.findOne({ where: { email: email } })
        let data: any = user;
        let success = false;
        let message = '';
        //查询此邮箱是否已被注册 
        if (!user) {
            let password = md5(request.password)
            const userData = {
                name: request.name,
                password: password,
                email: request.account,
                isAdmin: false,
            }
            data = await User.create(userData)
        }

        //邮箱若没绑定则重新发送邮件
        let account = await Accounts.findOne({ where: { userId: data.id } })
        if (!account) {
            let url = ctx.request.origin
            url = `${url}/validate/change_email?uid=${data.id}&authcode=${getAuthcode(data.id)}`
            sendMail(email, '验证您的邮箱', url)
            message = '发送邮件成功'
            success = true
        } else {
            message = "该邮箱已被注册"
            success = false
        }

        ctx.body = {
            success,
            message,
            data
        }
    }

    public static async updateUser(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)

        let userId = ctx.cookies.get(CookieKeys.USER_ID)
        let token = ctx.cookies.get(CookieKeys.REMEMBER_ME)

        let success = false
        let user = null
        if (token == getRememberMeToken(userId)) {
            user = await User.findById(userId, {
                include: [{
                    model: Accounts, as: 'accounts'
                }]
            })
            user = await user.update({ email: request.email, name: request.name, introduction: request.introduction })
            success = true
        }

        ctx.body = {
            data: user,
            success
        }
    }

    public static async sendEmail(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)
        let userId = request.userId
        let type: 'email' | 'password' = request.type

        let user: any = await User.findById(userId)
        let email = user.email

        let title = ''
        let url = ctx.request.origin
        if (type == 'email') {
            title = '验证您的邮箱'
            url = `${url}/validate/change_email?uid=${userId}&authcode=${getAuthcode(userId)}`
        } else if (type == 'password') {
            title = '修改您的密码'
            url = `${url}/validate/change_password?uid=${userId}&authcode=${getAuthcode(userId)}`

        }
        sendMail(email, title, url)
        ctx.body = {
            success: true
        }
    }

    public static async validateChangeEmail(ctx: koa.Context) {
        let request = parseGetData(ctx)
        let userId = request.uid
        let authcode = request.authcode
        let user:any = await User.findById(userId)
        if (user && authcode == getAuthcode(userId)) {
            let accountData = {
                userId: userId,
                openid: user.email,
                type: 'email',
                info: user.email,
                createTime: new Date()
            }
            let account = await Accounts.create(accountData)
            ctx.cookies.set(CookieKeys.USER_ID, user.id, cookieSetting)
            ctx.cookies.set(CookieKeys.REMEMBER_ME, getRememberMeToken(user.id), cookieSetting)
        }
        ctx.redirect('/')
    }

    public static async validateChangePassword(ctx: koa.Context) {
        let request = parseGetData(ctx)
        let userId = request.uid
        let authcode = request.authcode

        ctx.redirect("/")
    }
}