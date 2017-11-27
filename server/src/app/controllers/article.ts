import koa = require('koa')

import { Article } from '../models/Article'
import {parsePostData} from '../utils/parseData'
export default class ArticleController {
    public static async createArticle(ctx:koa.Context) {
        let requestData:any = await parsePostData(ctx)
        let nowTime = new Date()
        const data = {
            title:requestData.title,
            description:requestData.description,
            cover:requestData.cover,
            body:'',
            createTime:nowTime,
            updateTime:nowTime,
            isPublish:false,
            tag:requestData.tag
        }
        let article = new Article(data)
        let result = await article.save()
        console.log('11111111111')
        console.log(result)
        ctx.body = {
            result
        }
    }
}