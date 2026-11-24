import mongoose from "mongoose";

export interface IBooth{
    _id?:mongoose.Types.ObjectId,
    wardId:mongoose.Types.ObjectId,
    boothNumber:string,
    boothName:string,
    boothLocation:string,
    s_delete:number,
    cretaed_at:Date,
    updated_at:Date;
}