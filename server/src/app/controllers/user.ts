import koa = require('koa')

import { User } from '../models/User';
import { parsePostData, parseGetData } from '../utils/parseData'

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
        let data = await User.findById(ctx.params.userId)
        ctx.body = {
            data
        }
    }
    public static async login(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)
        const loginData = {
            email:request.email,
            password:request.password
        }
        let data:any = await User.findOne(loginData,{password:0})
        ctx.cookies.set('userId',data._id)
        ctx.body = {
            data
        }
    }

    public static async createUser(ctx: koa.Context) {
        console.log(ctx)
        let request: any = await parsePostData(ctx)
        console.log(request)
        let nowTime = new Date();
        const userData = {
            name: request.name,
            password: request.password,
            email: request.email,
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