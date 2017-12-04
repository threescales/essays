import koa = require('koa')

import { Article } from '../models/Article'
import { parsePostData, parseGetData } from '../utils/parseData'
const user = require('./user.json')
export default class ArticleController {
    public static async createArticle(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)
        let nowTime = new Date()
        const requestData = {
            userId: request.userId,
            title: request.title,
            description: request.description,
            cover: request.cover,
            body: request.body,
            createTime: nowTime,
            updateTime: nowTime,
            isPublish: false,
            tag: request.tag,
            readNum: 0,
            likeNum: 0
        }
        let article = new Article(requestData)
        let data = await article.save()
        ctx.body = {
            data
        }
    }

    public static async getArticleById(ctx: koa.Context) {
        let data = await Article.findById(ctx.params.articleId)
        ctx.body = {
            data
        }
    }

    public static async saveBody(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)
        let data = await Article.update({ _id: request.id }, { body: request.body })
        ctx.body = {
            data
        }
    }

    public static async getAllArticles(ctx: koa.Context) {
        let data = await Article.find({ isPublish: true }, { body: 0 }).sort({ "_id": -1 })
        ctx.body = {
            data
        }
    }

    public static async getMyArticles(ctx: koa.Context) {
        let data = await Article.find({userId:parseGetData(ctx).userId}).sort({'_id':1})
        ctx.body = {
            data
        }
    }
}