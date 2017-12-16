import koa = require('koa')

import { User } from '../models/User';
import { UserAssociation } from '../models/UserAssociation'
import { parsePostData, parseGetData } from '../utils/parseData'
import { getExpires, maxAge } from '../utils/date'
import { getRememberMeToken, getAuthcode } from '../utils/encryption'
const md5 = require("md5")
import { sendMail } from '../utils/email'

const cookieSetting = { maxAge: maxAge, overwrite: false, expires: getExpires(), httpOnly: false }
export default class UserController {
    public static async getUserByName(ctx: koa.Context) {
        const { name } = ctx.request.header
        let UserInstants = new User()
        let result = await UserInstants.findUsersByName(name)
        ctx.body = {
            result
        }
    }
    public static async getUserById(ctx: koa.Context) {
        let userId = ctx.cookies.get('userId')
        let token = ctx.cookies.get('essays_rememberMe_token')
        let user: any = await User.findById(userId)
        let data = null
        let accounts = []
        let success = false
        if (token === getRememberMeToken(userId)) {
            data = user
            success = true
            accounts = await UserAssociation.find({ "userId": data._id })
        }
        ctx.body = {
            success,
            data,
            accounts
        }
    }

    public static async getUserInfo(ctx: koa.Context) {
        let userId = parseGetData(ctx).userId
        let user: any = await User.findById(userId)
        let userAssociation: any = await UserAssociation.find({ userId: userId })

        user.password = null;
        user.phone = null;

        ctx.body = {
            success: true,
            data: user,
            accounts: userAssociation || []
        }
    }

    public static async login(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)
        let password = md5(request.password)
        const loginData = {
            email: request.account,
            password
        }
        let data: any = await User.findOne(loginData)
        let success = false
        let accounts = []
        if (data) {
            ctx.cookies.set('userId', data._id, cookieSetting)
            ctx.cookies.set('essays_rememberMe_token', getRememberMeToken(data._id), cookieSetting)
            success = true

            accounts = await UserAssociation.find({ "userId": data._id })
        }
        ctx.body = {
            success,
            data,
            accounts
        }
    }

    public static async createUser(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)
        let nowTime = new Date();
        let user = await User.findOne({email:request.account})
        let data = null;
        let success = false
        if(!user) {
            const userData = {
                name: request.name,
                password: request.password,
                email: request.account,
                avatar: request.avatar,
                isAdmin: request.isAdmin,
                createTime: nowTime
            }
            data = await new User(userData).save()
            let success = true
        }
  
        ctx.body = {
            success,
            data
        }
    }

    public static async updateUser(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)

        let userId = ctx.cookies.get('userId')
        let token = ctx.cookies.get('essays_rememberMe_token')

        let success = false
        let accounts = []
        let user = request
        if (token == getRememberMeToken(userId)) {
            await User.update({ _id: userId }, { email: request.email, name: request.name, introduction: request.introduction })
            user = await User.findById(userId)
            if (user) {
                accounts = await UserAssociation.find({ "userId": user._id })

            }
            success = true
        }

        ctx.body = {
            data: user,
            accounts,
            success
        }
    }

    public static async sendEmail(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)
        let userId = request.userId
        let type: 'email' | 'password' = request.type

        let user = await User.findById(userId)
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
        let user = await User.findById(userId)
        if (user && authcode == getAuthcode(userId)) {
            let userAssociationData = {
                userId: userId,
                openid: user.email,
                type: 'email',
                info: user.email,
                createTime: new Date()
            }
            let userAssociation = new UserAssociation(userAssociationData)
            let result = await userAssociation.save()
            ctx.cookies.set('userId', user._id, cookieSetting)
            ctx.cookies.set('essays_rememberMe_token', getRememberMeToken(user._id), cookieSetting)
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