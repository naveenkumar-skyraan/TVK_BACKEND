import { model, Schema } from "mongoose";
import type { ICaste } from "../interface/member.js";

const casteSchema = new Schema<ICaste>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    normalizedName: {
      type: String,
      required: true,
      trim: true,
    },
    referenceId: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "",
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

casteSchema.index({ s_delete: 1, _id: 1 });
casteSchema.index({ s_delete: 1, normalizedName: 1 });
casteSchema.index({ s_delete: 1, name: 1 });
casteSchema.index({ normalizedName: 1 });

export const CasteSchema = model<ICaste>("CasteSchema", casteSchema);
