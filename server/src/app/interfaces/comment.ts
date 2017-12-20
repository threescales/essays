export interface IComment {
    userId?:String,
    articleId?:String,
    toCommentId?:String,
    content?:String,
    createTime?:Date,
    blockKey?:String,
    selectText?:String,
    likeNum?:Number,
    depth?:Number,
    isShow?:Boolean
}