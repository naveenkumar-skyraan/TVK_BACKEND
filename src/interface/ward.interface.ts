import { Schema } from "mongoose"

export interface IWard{
    _id?:string,
    name:string,
    villageId:Schema.Types.ObjectId,
    s_delete:number,
    created_at:Date,
    updated_at:Date
}