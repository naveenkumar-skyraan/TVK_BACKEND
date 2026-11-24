import type { Schema } from "mongoose";

export interface Ipanjayth {
    _id?:Schema.Types.ObjectId,
    constituencyId:Schema.Types.ObjectId,
    name:string,
    s_delete:number,
    created_at:Date,
    updated_at:Date
}