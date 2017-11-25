import koa = require('koa')

import {User} from '../models/User';

export default class UserController {
    public static async getUserByName(ctx:koa.Context) {
        console.log(ctx)
        const {name} = ctx.request.header
        let UserInstants = new User()
        let result = await UserInstants.findUsersByName(name)
        ctx.body = {
            result
        }
    }
    public static async createUser(ctx:koa.Context) {
        const {name,password,email,avatar,isAdmin} = ctx.request.header
        const data = {name,password,email,avatar,isAdmin,createTime:new Date()}
        let user = new User(data)
        let result = await user.save()
        ctx.body = {
            result
        }
    }
}