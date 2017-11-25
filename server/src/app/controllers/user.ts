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
}