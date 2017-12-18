export interface IArticle {
    userId?: string;
    title?: string;
    description?: string;
    cover?: string;
    body?: string;
    createTime?: Date;
    updateTime?: Date;
    tag?: string;
    isPublish: boolean;
    isOpen:boolean;
    readNum: number;
    likeNum: number;
}