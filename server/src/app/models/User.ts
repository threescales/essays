import { Document, Schema, Model, model } from "mongoose";
import { IUser } from '../interfaces/user'
import { resolve } from "../../../../node_modules/@types/bluebird/index";
export interface IUserModel extends IUser, Document {
    findUsersByName(name: string): any
}
export const UserSchema: Schema = new Schema({
    name: String,
    password: String,
    phone:String,
    email:String,
    createTime: Date,
    avatar: String,
    introduction:String,
    isAdmin: Boolean
})

UserSchema.method('findUsersByName', function (name: String) {
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