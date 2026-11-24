import mongoose, { Schema } from "mongoose";
import type{ IWard } from "../interface/ward.interface.js";

const wardSchema = new Schema<IWard>(
  {
    name: {
      type: String,
      required: true,
    },
    villageId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"villages"
    },
    s_delete: {
      type: Number,
      required: true,
      default:0
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);


export const WardSchema = mongoose.model("wards",wardSchema)