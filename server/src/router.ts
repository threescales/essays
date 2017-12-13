import * as Router from 'koa-router'
import { home } from './app/controllers/home'
import TokenController from './app/controllers/token'
import UserController from './app/controllers/user'
import ArticleController from './app/controllers/article'
import * as OAuthUrl from './utils/getOAuthUrl'
// import jsonWebToken,{ jwtPassthrough } from './middlewares/jsonWebToken'

export default function (): Router {
    var router = new Router()
    router.get('/articles/:articleId', home)
    router.get('/', home)
    router.get('/login', home)
    router.get('/myarticles', home)
    router.redirect('/github_login', OAuthUrl.getGithubUrl())
    router.get('/github_bind/:userId', (ctx) => {
        ctx.redirect(OAuthUrl.getGithubUrl(ctx.params.userId) + `&redirect_uri=http://www.zymlj.net/api/token/bind/github`)
    })
    router.get('/account', home)
    //graphql

    //api

    //token
    router.get('/api/uptoken', TokenController.qiniuUpTokenGen)
    router.get('/api/token/github/info', TokenController.githubInfo)
    router.get('/api/token/bind/github', TokenController.bindGithub)

    router.get('/api/pageInfo', ArticleController.getPageInfo)
    //user
    // router.post('/api/user', UserController.getUserByName)
    router.put('/api/user', UserController.createUser)
    router.post('/api/user/login', UserController.login)
    router.get('/api/user', UserController.getUserById)
    //article
    router.put('/api/articles', ArticleController.createArticle)
    router.post('/api/article/savebody', ArticleController.saveBody)
    router.post('/api/article/togglePublish', ArticleController.togglePublish)
    router.post('/api/article/updateCount', ArticleController.updateCount)
    router.get('/api/articles', ArticleController.getAllArticles)
    router.get('/api/articles/getMyArticles', ArticleController.getMyArticles)

    router.get('/api/articles/:articleId', ArticleController.getArticleById)
    return router
}