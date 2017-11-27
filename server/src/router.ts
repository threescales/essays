import * as Router from 'koa-router'
import { home } from './app/controllers/home'
import QiNiu from './app/controllers/uptokenGen'
import UserController from './app/controllers/user'
import ArticleController from './app/controllers/article'
// import jsonWebToken,{ jwtPassthrough } from './middlewares/jsonWebToken'

export default function (): Router {
    var router = new Router()
    router.get('/article/:articleId', home)
    router.get('/', home)

    //graphql

    //api
    router.get('/api/uptoken', QiNiu.upTokenGen, )

    //user
    router.post('/api/user', UserController.getUserByName)
    router.put('/api/user',UserController.createUser)

    //article
    router.put('/api/article',ArticleController.createArticle)
    return router
}