import { model, Schema } from "mongoose";
import type { IEducationQualification } from "../interface/member.js";

const educationqualificationSchema = new Schema<IEducationQualification>(
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


export const EducationQualificationSchema = model<IEducationQualification>("EducationQualification",educationqualificationSchema)