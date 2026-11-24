import { model, Schema } from "mongoose";
import type { Ipanjayth } from "../interface/panjayath.interface.js";

const panjaythSchema =  new Schema<Ipanjayth>(
    {
        constituencyId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:"constituencys"
        },
        name:{
            type:String,
            required:true
        },
        s_delete:{
            type:Number,
            required:true,
            default:0
        }
    },
     {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
)

export default model<Ipanjayth>("panjayth",panjaythSchema)