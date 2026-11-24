import { model, Schema } from "mongoose";
import type { Ivillage } from "../interface/village.interface.js";

export const villageSchema = new Schema<Ivillage>(
  {
    name: {
      type: String,
      required: true,
    },
    panjaythId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "panjayth",
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

export default model<Ivillage>("villages", villageSchema);
