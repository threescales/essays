import { Document, Schema, Model, model } from "mongoose";
import { IUser } from '../interfaces/user'
import { userInfo } from "os";
import { resolve } from "../../../../node_modules/@types/bluebird/index";
export interface IUserModel extends IUser, Document {
    findUsersByName(name: string): any
}
export const UserSchema: Schema = new Schema({
    name: String,
    password: String,
    email: String,
    createTime: Date,
    avatar: String,
    isAdmin: Boolean
})

UserSchema.method('findUsersByName', function (name: String) {
    console.log('名字是:' + name)
    return new Promise((resolve, reject) => {
        this.model('User').find({ name }, (error, users) => {
            resolve({
                error, data: users
            })
        })
    });
})

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
export default User