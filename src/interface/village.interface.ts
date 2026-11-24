import type { Schema } from "mongoose";

export interface Ivillage{
    _id?:Schema.Types.ObjectId,
    panjaythId:Schema.Types.ObjectId,
    name:string,
    s_delete : number,
    created_at : Date,
    update_at :Date
}