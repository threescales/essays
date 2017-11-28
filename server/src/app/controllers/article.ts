import koa = require('koa')

import { Article } from '../models/Article'
import { parsePostData, parseGetData } from '../utils/parseData'
export default class ArticleController {
    public static async createArticle(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)
        let nowTime = new Date()
        const requestData = {
            title: request.title,
            description: request.description,
            cover: request.cover,
            body: '',
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
}