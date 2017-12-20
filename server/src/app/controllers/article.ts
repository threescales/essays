import koa = require('koa')

import Sequelize = require('sequelize')
import Model from '../models/index'
import { ArticleInstance } from '../models/article';
import { Articles as ModelArticles } from '../models/article'
const Articles: ModelArticles = Model['articles']
const Tags: Sequelize.Model<Sequelize.Instance<any>, any> = Model['tags']
const User: Sequelize.Model<Sequelize.Instance<any>, any> = Model['user']
import { parsePostData, parseGetData } from '../utils/parseData'

import rq = require("request-promise")
export default class ArticleController {
    static async  checkPermi(ctx: koa.Context, articleId: number): Promise<ArticleInstance> {
        const article: any = await Articles.find({
            where: {
                id: articleId
            }
        })

        if (!article) {
            ctx.throw('未找到该文章', 404)
        }

        const uid = article.ownerId

        if (uid !== parseInt(ctx.cookies.get('userId'), 10)) {
            ctx.throw('你没有该权限,确认是否正常登录', 403)
        }

        return article
    }
    public static async createArticle(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)
        let nowTime = new Date()
        const requestData = {
            ownerId: request.userId,
            title: request.title,
            description: request.description,
            cover: request.cover,
            body: request.body,
            tags: request.tags,
            type: 0,
            readNum: 0,
            likeNum: 0
        }

        let data = await Articles.create(requestData)
        ctx.body = {
            data
        }
    }

    public static async getArticleById(ctx: koa.Context) {
        let data = await Articles.findById(ctx.params.articleId)
        ctx.body = {
            data
        }
    }

    public static async saveBody(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)
        let body = JSON.parse(request.body)
        let data = await Articles.updateBody({ articleId: request.id, body })
        ctx.body = {
            data
        }
    }

    public static async getAllArticles(ctx: koa.Context) {
        let data = await Articles.findAll({
            where: { isPublished: true,isPublic:true },
            attributes:{
                exclude:['body']
            }
        })

        ctx.body = {
            data
        }
    }

    public static async getMyArticles(ctx: koa.Context) {
        let userId = parseGetData(ctx).userId;
        let data = await Articles.findAll({
            where: {
                ownerId: userId,
            },
            attributes:{
                exclude:['body']
            }
        })
        ctx.body = {
            data
        }
    }
    public static async togglePublish(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)
        let articleId = request.articleId
        let isPublished = request.isPublished
        let article = await ArticleController.checkPermi(ctx, articleId)
        let data = await article.update({ isPublished: isPublished })
        ctx.body = {
            data
        }
    }
    public static async updateCount(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)
        let article: any = await Articles.findById(request.articleId)
        if (request.type == "read") {
            article.readNum++
        } else {
            article.likeNum++
        }
        let data = await article.save()
        ctx.body = {
            readNum: data.readNum,
            likeNum: data.likeNum
        }
    }
    //通过url获取网页预览信息
    public static async getPageInfo(ctx: koa.Context) {
        let url: any = parseGetData(ctx).url
        let data = {
            title: '',
            description: '',
            previewImg: ''
        }
        if (url.indexOf(ctx.host) > -1) {
            let articleId = url.split('/articles/')[1]
            let article: any = await Articles.findById(articleId)
            data.title = article.title
            data.description = article.description
            data.previewImg = article.cover
        } else {
            let page = await rq.get(`https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshareget_urlinfo?url=${url}`)
            const length = page.length - 2
            page = JSON.parse(page.toString().substring(10, length))
            data.title = page.title;
            data.description = page.summary;
            data.previewImg = page.pics.split('|')[0]
        }
        ctx.body = {
            data
        }
    }
}