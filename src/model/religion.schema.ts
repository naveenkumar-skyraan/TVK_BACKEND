import { model, Schema } from "mongoose";
import type {  IReligion } from "../interface/member.js";

const religionSchema = new Schema<IReligion>(
  {
    name: {
      type: String,
      required: true,
    },
    s_delete: {
      type: Number,
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


export const ReligionSchema = model<IReligion>("ReligionSchema",religionSchema)