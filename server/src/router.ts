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
    router.get('/login', home)
    router.get('/myarticles', home)
    //graphql

    //api
    router.get('/api/uptoken', QiNiu.upTokenGen, )
    router.get('/api/pageInfo',ArticleController.getPageInfo)
    //user
    // router.post('/api/user', UserController.getUserByName)
    router.put('/api/user', UserController.createUser)
    router.post('/api/user/login', UserController.login)
    router.get('/api/user', UserController.getUserById)
    //article
    router.put('/api/articles', ArticleController.createArticle)
    router.post('/api/article/savebody', ArticleController.saveBody)
    router.post('/api/article/togglePublish', ArticleController.togglePublish)
    router.post('/api/article/updateCount',ArticleController.updateCount)
    router.get('/api/articles', ArticleController.getAllArticles)
    router.get('/api/articles/getMyArticles', ArticleController.getMyArticles)

    router.get('/api/articles/:articleId', ArticleController.getArticleById)
    return router
}