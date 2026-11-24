import mongoose, { model, Schema } from "mongoose";
import type { IConstituency } from "../interface/constituency.interface.js";

const constituencySchema = new Schema<IConstituency>(
  {
    districtId:{
      type:Schema.Types.ObjectId,
      required:true,
      ref:"districts"
    }
    ,
    name: {
      type: String,
      required: true,
    },
    s_delete: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

export default model<IConstituency>("constituencys",constituencySchema)