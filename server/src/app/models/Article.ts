import { Document, Schema, Model, model } from "mongoose";

import { IArticle } from '../interfaces/article';
import { resolve } from "../../../../node_modules/@types/bluebird/index";

export interface IArticleModel extends IArticle, Document {

}

export const ArticleSchema: Schema = new Schema({
    index: Number,
    userId: String,
    title: String,
    description: String,
    cover: String,
    body: String,
    createTime: Date,
    updateTime: Date,
    isPublish: Boolean,
    isOpen:Boolean,
    tag: String,
    readNum: Number,
    likeNum: Number,
})

export const Article: Model<IArticleModel> = model<IArticleModel>('Article', ArticleSchema);
export default Article