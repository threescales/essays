import koa = require('koa')

import {User} from '../models/User';

export default class UserController {
    public static getUserByName(ctx:koa.Context) {
        console.log(ctx)
        const {name} = ctx.request.header
        let UserInstants = new User()
        const targetUsers = UserInstants.findUsersByName(name);
        ctx.body = {
            targetUsers
        }
    }
}