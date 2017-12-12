export interface IUserAssociation {
    userId: string;
    type: 'github' | 'wechat';
    openid: string;
    info: string;
    createTime: Date;
}    