import mongoose, { Schema, model } from "mongoose";
import type { IBooth } from "../interface/booth.interface.js";

const boothSchema = new Schema<IBooth>(
  {
    wardId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "wards", 
    },
    boothNumber: {
      type: String,
      required: true,
    },
    boothName: {
      type: String,
      required: true,
    },
    boothLocation: {
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
  }
);

export const BoothSchema = model<IBooth>("booths", boothSchema);