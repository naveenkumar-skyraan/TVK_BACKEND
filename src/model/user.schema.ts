import mongoose, { Schema } from "mongoose";
import type{ IUser } from "../interface/user.interface.js";

const userSchema = new Schema<IUser>({
  mobile: {
    type: Number,
    required: true,
      unique: true,

  },
  password: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    required:true
  },
 userRole :{
    type:String,
    required:true
  },
  image: {
    type: String,
  },
  accountAccessModule:{
    type:String,
  },
  accountAccessPrivilege:{
    type:String
  },
  panjaythIds: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: "panjayth"
  }],
  s_delete:{
    type:Number,
    default:0
  }
});

export const UserSchema = mongoose.model<IUser>("users", userSchema);
