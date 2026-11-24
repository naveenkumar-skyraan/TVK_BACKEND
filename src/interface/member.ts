import { Schema } from "mongoose";

export interface IMembers {
  _id?: String;
  gender: string;
  voterId: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  dateOfBirth: Number;
  fatherName: string;
  aadharNo: string;
  bloodGroup: string;
  maritalStatus: String;
  educationId: Schema.Types.ObjectId;
  educationName: string;
  workId: Schema.Types.ObjectId;

  workName: string;
  workExpirence: String;
  religionId: Schema.Types.ObjectId;
  castId: Schema.Types.ObjectId;
  distictId: Schema.Types.ObjectId;
  assemblyConstituencyId: Schema.Types.ObjectId;
  panjaythId: Schema.Types.ObjectId;
  villageId: Schema.Types.ObjectId;
  wardId: Schema.Types.ObjectId;
  addedById:Schema.Types.ObjectId,
  partNumber: String;

  boothId: Schema.Types.ObjectId;
  pincode: Number;
  streetName: string;
  landMark_nearby: string;
  doorNumber_buildName: string;
  addressLine1: string;
  addressLine2: string;
  profilepic: string;
  s_delete: Number;
  inactivId: Schema.Types.ObjectId;
  otherInactiveReason: String;
  inactive_date: Number;
  inactive_description: string;
  userImage?:string
}

export interface IEducationQualification {
  _id?: Schema.Types.ObjectId;
  name: string;
  s_delete: number;
}
export interface IWork {
  _id?: Schema.Types.ObjectId;
  name: string;
  s_delete: number;
}
export interface IReligion {
  _id?: Schema.Types.ObjectId;
  name: string;
  s_delete: number;
}
export interface ICaste {
  _id?: Schema.Types.ObjectId;
  name: string;
  normalizedName?: string;
  referenceId?: string;
  s_delete: number;
}
export interface Iinactive {
  _id?: Schema.Types.ObjectId;
  name: string;
  s_delete: number;
}

export interface IMemberFilter {
  gender?: string[];

  fromAge?: string;
  toAge?: string;
  s_delete?: number;

  // 1 = A-Z
  // 0 = Z-A
  alphabeticalOrder: number;
  inactivId?: Schema.Types.ObjectId;
  relegionId?: Schema.Types.ObjectId[];
  castId?: Schema.Types.ObjectId[];
  educationId?: Schema.Types.ObjectId[];
  workId?: Schema.Types.ObjectId[];
  constituencyId?: Schema.Types.ObjectId[];

  panjaythId?: Schema.Types.ObjectId[];
  villageId?: Schema.Types.ObjectId[];
  wardId?: Schema.Types.ObjectId[];
  boothId?: Schema.Types.ObjectId[];

  
  // ---------------------------------------------------
  // CREATED_AT -> range filter
  // fromDate & toDate (inclusive), matches created_at
  // ---------------------------------------------------
  fromDate?: string; // e.g. "2026-08-01"
  toDate?: string;   // e.g. "2026-08-19"
 
  // ---------------------------------------------------
  // UPDATED_AT -> single date filter (that exact day)
  // ---------------------------------------------------
  updateDate?: string; // e.g. "2026-08-19"
 
  // ---------------------------------------------------
  // INACTIVE_DATE (deleted date) -> single date filter
  // ---------------------------------------------------
  inactiveDate?: string; // e.g. "2026-08-19"
  inactiveFomDate?:string
  inactiveToDate?:string
}

export interface ImarkAsInactive {
  id: Schema.Types.ObjectId;
  inactivId: Schema.Types.ObjectId;
  otherInactiveReason: string;
  inactive_date: Number;
  inactive_description: String;
}


export interface ISearchSchema{
  id:Schema.Types.ObjectId,
  userId:Schema.Types.ObjectId,
  memberId:Schema.Types.ObjectId,
  type:String
}


export interface ActivityItem {
  type: "create" | "update" | "delete";
  count: number;
}

export interface DailyActivity {
  date: string;
  activities: ActivityItem[];
}

export interface ActivityPagination {
  currentPage: number;
  pageSize: number;
  totalDays: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface MemberActivityResponse {
  totalMembersAdded: number;
  totalMembersDeleted: number;
  pagination: ActivityPagination;
  data: DailyActivity[];
}
