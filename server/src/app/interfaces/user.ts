export interface IUser {
    name?: string;
    password?: string;
    introduction?: string;
    email?:string;
    phone?:string;
    createTimg?: Date;
    avatar?: string;
    isAdmin: boolean;
}