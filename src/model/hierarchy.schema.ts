import { model, Schema } from "mongoose";
import type { IDistrict } from "../interface/district.interface.js";

const hierarchySchema  = new Schema<IDistrict>({
    name:{
        type:String,
        required:true
    },
    s_delete:{
        type:Number,
        required:true,
        default:0
    }
},{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at`"
    }
}
)

export default model<IDistrict>("hierarchy",hierarchySchema)