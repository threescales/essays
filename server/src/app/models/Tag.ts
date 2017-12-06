import { Document, Schema, Model, model } from "mongoose";

import { ITag } from '../interfaces/tag';
import { resolve } from "../../../../node_modules/@types/bluebird/index";

export interface ITagModel extends ITag, Document {
    
    }

export const TagSchema: Schema = new Schema({
    tag: String,
    createTime:Date
})

export const Tag: Model<ITagModel> = model<ITagModel>('Tag',TagSchema);
export default Tag;