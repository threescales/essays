import koa = require('koa')

import { Article } from '../models/Article'
import { Tag } from '../models/Tag'
import { parsePostData, parseGetData } from '../utils/parseData'
const user = require('./user.json')
import rq = require("request-promise")
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
        let data = await Article.find({ userId: userId }).sort({ "isPublish": -1, "updateTime": -1 })
        ctx.body = {
            data
        }
    }
    public static async togglePublish(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)
        let articleId = request.articleId
        let isPublish = request.isPublish
        let data = await Article.update({ _id: articleId }, { isPublish: isPublish, updateTime: new Date() })
        ctx.body = {
            data
        }
    }
    public static async updateCount(ctx: koa.Context) {
        let request: any = await parsePostData(ctx)
        let article = await Article.findById(request.articleId)
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
            title:'',
            description:'',
            previewImg:''
        }
        if(url.indexOf(ctx.host)>-1){
            let articleId = url.split('/articles/')[1]
            console.error(articleId)
            let article = await Article.findById(articleId,{body:0})
            console.error(article)
            data.title = article.title
            data.description = article.description
            data.previewImg = article.cover
        }else {
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