import koa = require('koa')

import { Article } from '../models/Article'
import { Tag } from '../models/Tag'
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

        let tagResult = await Tag.findOne({ tag: request.tag })
        if (!tagResult) {
            let tagDate = {
                tag: request.tag,
                createTime: nowTime
            }
            let tag = new Tag(tagDate)
            let tagData = await tag.save()
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
        let data = await Article.update({ _id: request.id }, { body: request.body, updateTime: new Date() })
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
        let userId = parseGetData(ctx).userId;
        let data = await Article.find({ userId: userId }).sort({ "updateTime": -1 })
        ctx.body = {
            data
        }
    }
}