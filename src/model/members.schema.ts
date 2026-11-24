import { Schema, model, Types } from "mongoose";
import type { ICaste, Iinactive, IMembers, ISearchSchema } from "../interface/member.js";

// const membersSchema = new Schema<IMembers>(
//   {
//     gender: { type: String, required: true },
//     fullName: { type: String, required: true },
//     voterId: { type: String, required: true },
//     mobileNumber: { type: String, required: true },
//     email: { type: String },
//     dateOfBirth: { type: Number, required: true },
//     fatherName: String,
//     aadharNo: String,
//     bloodGroup: String,
//     maritalStatus :String,
//     educationId: {
//       type: Schema.Types.ObjectId,
//       ref: "EducationQualification",
//     },
//     educationName: String,
//     workId: { type: Schema.Types.ObjectId, ref: "WorkSchema" },
//     workName: String,
//     workExpirence:String,
//     religionId: {
//       type: Schema.Types.ObjectId,
//       ref: "ReligionSchema",
//       required: true,
//     },
//     castId: { type: Schema.Types.ObjectId, ref: "CasteSchema", required: true },
//     distictId: {
//       type: Schema.Types.ObjectId,
//       ref: "districts",
//       required: true,
//     },
//     assemblyConstituencyId: {
//       type: Schema.Types.ObjectId,
//       ref: "constituencys",
//       required: true,
//     },
//     panjaythId: {
//       type: Schema.Types.ObjectId,
//       ref: "panjayth",
//       required: true,
//     },
//     villageId: { type: Schema.Types.ObjectId, ref: "villages", required: true },
//     wardId: { type: Schema.Types.ObjectId, ref: "wards", required: true },
//     partNumber:String,
//     boothId: { type: Schema.Types.ObjectId, ref: "booths", required: true },
//     pincode: Number,
//     streetName: String,
//     landMark_nearby: String,
//     doorNumber_buildName: String,
//     addressLine1: String,
//     addressLine2: String,

//     profilepic: String,
//     s_delete: {type: Number,default: 0},
//     inactivId:{type:Schema.Types.ObjectId,ref:"Inactive"},
//     addedById:{type:Schema.Types.ObjectId,ref:"users"},
//         otherInactiveReason:String,
//     inactive_date:Number,
//     inactive_description:String,
  
  
//   },
  

//   {
//     timestamps: {
//       createdAt: "created_at",
//       updatedAt: "updated_at",
//     },
//   },
// );

// export default model<IMembers>("Members", membersSchema);


const membersSchema = new Schema<IMembers>(
  {
    gender: { type: String },
    fullName: { type: String },
    voterId: { type: String },
    mobileNumber: { type: String },
    email: { type: String },
    dateOfBirth: { type: Number },
    fatherName: String,
    aadharNo: String,
    bloodGroup: String,
    maritalStatus :String,
    educationId: {
      type: Schema.Types.ObjectId,
      ref: "EducationQualification",
    },
    educationName: String,
    workId: { type: Schema.Types.ObjectId, ref: "WorkSchema" },
    workName: String,
    workExpirence:String,
    religionId: {
      type: Schema.Types.ObjectId,
      ref: "ReligionSchema",
    },
    castId: { type: Schema.Types.ObjectId, ref: "CasteSchema"},
    distictId: {
      type: Schema.Types.ObjectId,
      ref: "districts",
    },
    assemblyConstituencyId: {
      type: Schema.Types.ObjectId,
      ref: "constituencys",
    },
    panjaythId: {
      type: Schema.Types.ObjectId,
      ref: "panjayth",
    },
    villageId: { type: Schema.Types.ObjectId, ref: "villages"},
    wardId: { type: Schema.Types.ObjectId, ref: "wards" },
    partNumber:String,
    boothId: { type: Schema.Types.ObjectId, ref: "booths" },
    pincode: Number,
    streetName: String,
    landMark_nearby: String,
    doorNumber_buildName: String,
    addressLine1: String,
    addressLine2: String,

    profilepic: String,
    s_delete: {type: Number,default: 0},
    inactivId:{type:Schema.Types.ObjectId,ref:"Inactive"},
    // addedById:{type:Schema.Types.ObjectId},
        otherInactiveReason:String,
    inactive_date:Number,
    inactive_description:String,
  },
  

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

export default model<IMembers>("Members", membersSchema);





const inactiveSchema = new Schema<Iinactive>(
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


export const InactiveSchema = model<Iinactive>("Inactive",inactiveSchema)

const searchHistrorySchema = new Schema<ISearchSchema>(
  {
   userId: {
      type:Schema.Types.ObjectId,
      required: true,
    },
    memberId:{
      type:Schema.Types.ObjectId,
      required:true
    },
    type:{
      type:String,
      required:true
    }
   
  },
  {
    timestamps: {   
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);


export const SearchHistrorySchema = model<ISearchSchema>("searchHistroy",searchHistrorySchema)