import * as Router from 'koa-router'
import { home } from './app/controllers/home'
import QiNiu from './app/controllers/uptokenGen'
import UserController from './app/controllers/user'
import ArticleController from './app/controllers/article'
// import jsonWebToken,{ jwtPassthrough } from './middlewares/jsonWebToken'

export default function (): Router {
    var router = new Router()
    router.get('/articles/:articleId', home)
    router.get('/', home)
    router.get('/login',home)
    //graphql

    //api
    router.get('/api/uptoken', QiNiu.upTokenGen, )

    //user
    // router.post('/api/user', UserController.getUserByName)
    router.put('/api/user',UserController.createUser)
    router.post('/api/user/login',UserController.login)
    router.get('/api/user',UserController.getUserById)
    //article
    router.put('/api/articles',ArticleController.createArticle)
    router.get('/api/articles/:articleId',ArticleController.getArticleById)
    router.post('/api/articles/savebody',ArticleController.saveBody)
    router.get('/api/articles',ArticleController.getAllArticles)
    return router
}