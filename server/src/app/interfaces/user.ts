export interface IUser {
    name?: string;
    password?: string;
    email?:string;
    phone?:string;
    createTimg?: Date;
    avatar?: string;
    isAdmin: boolean;
}