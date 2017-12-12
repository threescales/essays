import { Document, Schema, Model, model } from "mongoose";
import {IUserAssociation} from '../interfaces/userAssociation'
import { resolve } from "../../../../node_modules/@types/bluebird/index";
export interface IUserAssociationModel extends IUserAssociation,Document{

}

export const UserAssociationSchema: Schema = new Schema({
    userId:String,
    type:String,
    info:String,
    openid:String,
    createTime: Date,    
})

export const UserAssociation: Model<IUserAssociationModel> = model<IUserAssociationModel>('UserAssociation',UserAssociationSchema);
export default UserAssociation;