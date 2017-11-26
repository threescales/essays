import { Document, Schema, Model, model } from "mongoose";
import {IComment} from '../interfaces/comment'
import { resolve } from "../../../../node_modules/@types/bluebird/index";

export interface ICommentModel extends IComment,Document {

}

export const CommentShema: Schema = new Schema({
    userId:String,
    articleId:String,
    toUserId:String,
    content:String,
    createTime:Date,
    blockId:String,
    isShow:Boolean
})

export const Comment:Model<ICommentModel> = model<ICommentModel>('Comment',CommentShema);
export default Comment;