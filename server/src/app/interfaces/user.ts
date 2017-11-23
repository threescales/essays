export interface IUser {
    name?: string;
    password?: string;
    email?: string;
    createTimg?: Date;
    avatar?: string;
    isAdmin: boolean;
}