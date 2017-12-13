import koa = require('koa')

import { User } from '../models/User';
import { UserAssociation } from '../models/UserAssociation'
import { parsePostData, parseGetData } from '../utils/parseData'
import { getExpires, maxAge } from '../utils/date'
import { getRememberMeToken } from '../utils/encryption'
const md5 = require("md5")

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
        let success = false
        if (token === getRememberMeToken(userId)) {
            user.password = null
            data = user
            success = true
            let accouts: any = await UserAssociation.find({"userId":data._id})
            data.accouts = accouts   
        }
        ctx.body = {
            success,
            data
        }
    }
    public static async login(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)
        let password = md5(request.password)
        const loginData = {
            email: request.account,
            password
        }
        let data: any = await User.findOne(loginData, { password: 0 })
        let success = false
        if (data) {
            ctx.cookies.set('userId', data._id, cookieSetting)
            ctx.cookies.set('essays_rememberMe_token', getRememberMeToken(data._id), cookieSetting)
            success = true

            let accouts: any = await UserAssociation.find({"userId":data._id})
            data.accouts = accouts            
        }
        ctx.body = {
            success,
            data,
        }
    }

    public static async createUser(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)
        let nowTime = new Date();
        const userData = {
            name: request.name,
            password: request.password,
            email: request.account,
            avatar: request.avatar,
            isAdmin: request.isAdmin,
            createTime: nowTime
        }
        let user = new User(userData)
        let data = await user.save()
        ctx.body = {
            data
        }
    }
}