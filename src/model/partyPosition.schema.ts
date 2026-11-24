import { model, Schema } from "mongoose";
import type {  IPartyPosition, IReligion } from "../interface/member.js";

const partyPositionSchema = new Schema<IPartyPosition>(
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


export default   model<IPartyPosition>("PartyPosition",partyPositionSchema)