import { Document, Schema, Model, model } from "mongoose";
import { IUser } from '../interfaces/user'
import { userInfo } from "os";
export interface IUserModel extends IUser, Document {
    findUsersByName(name:string): any
}
export const UserSchema: Schema = new Schema({
    name: String,
    password: String,
    email: String,
    createTime: Date,
    avatar: String,
    isAdmin: Boolean
})

UserSchema.method('findUsersByName',function(name:String) {
    console.log('名字是:'+name)
    //TODO
    return this.model('User').find({name})
})

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
export default User