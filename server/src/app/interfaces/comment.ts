export interface IComment {
    userId?:string;
    articleId?:string;
    toUserId?:string;
    content?:string;
    createTime?:string;
    blockId?:string;
    isShow?:boolean;
}