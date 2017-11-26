import { Document, Schema, Model, model } from "mongoose";

import { IArticle } from '../interfaces/article';
import { resolve } from "../../../../node_modules/@types/bluebird/index";

export interface IArticleModel extends IArticle, Document {

}

export const ArticleSchema: Schema = new Schema({
    userId: String,
    title: String,
    description: String,
    cover: String,
    body: String,
    createTime: Date,
    updateTime: Date,
    isPublish: Boolean,
    tag: String,
})

export const Article: Model<IArticleModel> = model<IArticleModel>('Article', ArticleSchema);
export default Article