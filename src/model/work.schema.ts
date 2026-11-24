import { model, Schema } from "mongoose";
import type { IWork } from "../interface/member.js";

const workSchema = new Schema<IWork>(
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


export const WorkSchema = model<IWork>("WorkSchema",workSchema)