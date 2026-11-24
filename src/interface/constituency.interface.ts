import { Schema } from "mongoose";

export interface IConstituency{
    _id?:Schema.Types.ObjectId,
    districtId:Schema.Types.ObjectId,
    name:string,
    number:string,
    s_delete:number,
    created_at:Date,
    updated_at:Date
}