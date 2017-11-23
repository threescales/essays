import * as Router from 'koa-router'
import { home } from './app/controllers/home'
import QiNiu from './app/controllers/uptokenGen'
import UserController from './app/controllers/user'
// import jsonWebToken,{ jwtPassthrough } from './middlewares/jsonWebToken'

export default function (): Router {
    var router = new Router()
    router.get('/write', home)
    router.get('/welcome', home)

    //graphql

    //api
    router.get('/api/uptoken', QiNiu.upTokenGen, )
    router.post('/api/user', UserController.getUserByName)
    return router
}