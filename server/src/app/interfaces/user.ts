export interface IUser {
    name?: string;
    password?: string;
    account?: string;
    email?:string;
    phone?:string;
    createTimg?: Date;
    avatar?: string;
    isAdmin: boolean;
}