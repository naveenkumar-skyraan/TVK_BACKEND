import mongoose, { Schema } from "mongoose";
import {
  ResponseBuilder,
  type ResponseFormate,
} from "../helper/ResponseFormate.js";
import type {
  ICaste,
  IEducationQualification,
  Iinactive,
  ImarkAsInactive,
  IMemberFilter,
  IMembers,
  IReligion,
  IWork,
} from "../interface/member.js";
import type { IUser } from "../interface/user.interface.js";
import { CasteSchema } from "../model/caste.schema.js";
import { EducationQualificationSchema } from "../model/educationqualification.schema.js";
import membersSchema, {
  InactiveSchema,
  SearchHistrorySchema,
} from "../model/members.schema.js";
import partyPositionSchema from "../model/partyPosition.schema.js";
import { ReligionSchema } from "../model/religion.schema.js";
import { UserSchema } from "../model/user.schema.js";
import { WorkSchema } from "../model/work.schema.js";

export class MemberService {
  //   async createMember(data: IMembers,user:IUser): Promise<ResponseFormate> {
  //   try {
  //     if (data._id) {
  //       const updateData = { ...data };
  //       delete updateData._id;

  //       const update = await membersSchema.findByIdAndUpdate(
  //         data._id,
  //         updateData,
  //         {
  //           new: true,
  //           runValidators: true,
  //         }
  //       );

  //       if (!update) {
  //         return ResponseBuilder.Failure(0, "Member not found", []);
  //       }

  //       await this.createHistory(user?.id,data._id,"update")
  //       return ResponseBuilder.Success(
  //         1,
  //         "The member is Updated",
  //         [update]
  //       );
  //     }

  //         data.addedById = user.id;

  //     const create = await membersSchema.create(data);

  //     await  this.createHistory(user.id,create.id,"create")
  //     return ResponseBuilder.Success(
  //       1,
  //       "The member is Created",
  //       [create]
  //     );
  //   } catch (error: any) {
  //     return ResponseBuilder.Failure(
  //       0,
  //       "Error in Creating/Updating the Member",
  //       [error]
  //     );
  //   }
  // }

  async createMember(data: IMembers, user: IUser): Promise<ResponseFormate> {
    try {
      console.log("data", data);

      if (data._id) {
        const updateData = { ...data };
        delete updateData._id;

        const update = await membersSchema.findByIdAndUpdate(
          data._id,
          {
            $set: updateData,
          },
          {
            new: true,
            runValidators: true,
          },
        );

        if (!update) {
          return ResponseBuilder.Failure(0, "Member not found", []);
        }

        await this.createHistory(user?.id, data._id, "update");

        return ResponseBuilder.Success(1, "The member is Updated", [update]);
      }

      data.addedById = user.id;

      const create = await membersSchema.create(data);

      await this.createHistory(user.id, create.id, "create");

      return ResponseBuilder.Success(1, "The member is Created", [create]);
    } catch (error: any) {
      return ResponseBuilder.Failure(
        0,
        "Error in Creating/Updating the Member",
        [error],
      );
    }
  }

  // async getMembers(userData: IUser,filter: IMemberFilter,cursor?: string,search?: string): Promise<ResponseFormate> {
  //   try {
  //     const id = userData.id;

  //     // =====================================================
  //     // GET USER
  //     // =====================================================

  //     const user: any = await UserSchema.findById(id)
  //       .select("role panjaythIds")
  //       .lean();

  //     if (!user) {
  //       return ResponseBuilder.Failure(
  //         0,
  //         "User not found",
  //         [],
  //       );
  //     }

  //     // =====================================================
  //     // BASE QUERY
  //     // =====================================================

  //     const baseQuery: any = {};

  //     // =====================================================
  //     // S_DELETE
  //     // =====================================================

  //     if (
  //       filter.s_delete !== undefined &&
  //       filter.s_delete !== null
  //     ) {
  //       baseQuery.s_delete = Number(
  //         filter.s_delete,
  //       );
  //     }

  //     // =====================================================
  //     // ROLE BASED FILTER
  //     // =====================================================

  //     if (user.role === "User") {
  //       baseQuery.panjaythId = {
  //         $in: user.panjaythIds || [],
  //       };
  //     }

  //     // =====================================================
  //     // CONVERT IDS TO OBJECT IDS
  //     // =====================================================

  //     const convertToObjectIds = (
  //       ids: string[] | undefined,
  //       fieldName: string,
  //     ): mongoose.Types.ObjectId[] | null => {
  //       if (!ids || ids.length === 0) {
  //         return null;
  //       }

  //       const invalidIds = ids.filter(
  //         (item) =>
  //           !mongoose.Types.ObjectId.isValid(item),
  //       );

  //       if (invalidIds.length > 0) {
  //         throw new Error(
  //           `Invalid ${fieldName}`,
  //         );
  //       }

  //       return ids.map(
  //         (item) =>
  //           new mongoose.Types.ObjectId(item),
  //       );
  //     };

  //     // =====================================================
  //     // DAY RANGE HELPER
  //     // =====================================================

  //     const getDayRange = (
  //       dateStr: string,
  //     ): {
  //       start: Date;
  //       end: Date;
  //     } | null => {
  //       const parsed = new Date(dateStr);

  //       if (isNaN(parsed.getTime())) {
  //         return null;
  //       }

  //       const start = new Date(
  //         parsed.getFullYear(),
  //         parsed.getMonth(),
  //         parsed.getDate(),
  //         0,
  //         0,
  //         0,
  //         0,
  //       );

  //       const end = new Date(
  //         parsed.getFullYear(),
  //         parsed.getMonth(),
  //         parsed.getDate(),
  //         23,
  //         59,
  //         59,
  //         999,
  //       );

  //       return {
  //         start,
  //         end,
  //       };
  //     };

  //     // =====================================================
  //     // RELIGION
  //     // =====================================================

  //     const religionIds =
  //       convertToObjectIds(
  //         filter.relegionId,
  //         "relegionId",
  //       );

  //     if (religionIds) {
  //       baseQuery.religionId = {
  //         $in: religionIds,
  //       };
  //     }

  //     // =====================================================
  //     // CAST
  //     // =====================================================

  //     const castIds =
  //       convertToObjectIds(
  //         filter.castId,
  //         "castId",
  //       );

  //     if (castIds) {
  //       baseQuery.castId = {
  //         $in: castIds,
  //       };
  //     }

  //     // =====================================================
  //     // EDUCATION
  //     // =====================================================

  //     const educationIds =
  //       convertToObjectIds(
  //         filter.educationId,
  //         "educationId",
  //       );

  //     if (educationIds) {
  //       baseQuery.educationId = {
  //         $in: educationIds,
  //       };
  //     }

  //     // =====================================================
  //     // WORK
  //     // =====================================================

  //     const workIds =
  //       convertToObjectIds(
  //         filter.workId,
  //         "workId",
  //       );

  //     if (workIds) {
  //       baseQuery.workId = {
  //         $in: workIds,
  //       };
  //     }

  //     // =====================================================
  //     // CONSTITUENCY
  //     // =====================================================

  //     const constituencyIds =
  //       convertToObjectIds(
  //         filter.constituencyId,
  //         "constituencyId",
  //       );

  //     if (constituencyIds) {
  //       baseQuery.assemblyConstituencyId = {
  //         $in: constituencyIds,
  //       };
  //     }

  //     // =====================================================
  //     // PANJAYTH
  //     // =====================================================

  //     const panjaythIds =
  //       convertToObjectIds(
  //         filter.panjaythId,
  //         "panjaythId",
  //       );

  //     if (panjaythIds) {
  //       baseQuery.panjaythId = {
  //         $in: panjaythIds,
  //       };
  //     }

  //     // =====================================================
  //     // VILLAGE
  //     // =====================================================

  //     const villageIds =
  //       convertToObjectIds(
  //         filter.villageId,
  //         "villageId",
  //       );

  //     if (villageIds) {
  //       baseQuery.villageId = {
  //         $in: villageIds,
  //       };
  //     }

  //     // =====================================================
  //     // WARD
  //     // =====================================================

  //     const wardIds =
  //       convertToObjectIds(
  //         filter.wardId,
  //         "wardId",
  //       );

  //     if (wardIds) {
  //       baseQuery.wardId = {
  //         $in: wardIds,
  //       };
  //     }

  //     // =====================================================
  //     // BOOTH
  //     // =====================================================

  //     const boothIds =
  //       convertToObjectIds(
  //         filter.boothId,
  //         "boothId",
  //       );

  //     if (boothIds) {
  //       baseQuery.boothId = {
  //         $in: boothIds,
  //       };
  //     }

  //     // =====================================================
  //     // GENDER
  //     // =====================================================

  //     if (
  //       filter.gender &&
  //       Array.isArray(filter.gender) &&
  //       filter.gender.length > 0
  //     ) {
  //       const genders = filter.gender
  //         .map((gender: string) =>
  //           gender.trim(),
  //         )
  //         .filter(Boolean);

  //       if (genders.length > 0) {
  //         baseQuery.gender = {
  //           $in: genders,
  //         };
  //       }
  //     }

  //     // =====================================================
  //     // AGE FILTER
  //     // =====================================================

  //     if ((filter.fromAge !== undefined &&filter.fromAge !== null &&filter.fromAge !== "") ||(filter.toAge !== undefined &&filter.toAge !== null &&filter.toAge !== "")) {
  //       const today = new Date();

  //       const dobQuery: any = {};

  //       // ---------------------------------------------------
  //       // FROM AGE
  //       // ---------------------------------------------------

  //       if (
  //         filter.fromAge !== undefined &&
  //         filter.fromAge !== null &&
  //         filter.fromAge !== ""
  //       ) {
  //         const fromAge = Number(
  //           filter.fromAge,
  //         );

  //         if (
  //           Number.isNaN(fromAge) ||
  //           fromAge < 0
  //         ) {
  //           return ResponseBuilder.Failure(
  //             0,
  //             "Invalid fromAge",
  //             [],
  //           );
  //         }

  //         const maxDOB = new Date(
  //           today.getFullYear() -
  //             fromAge,
  //           today.getMonth(),
  //           today.getDate(),
  //           23,
  //           59,
  //           59,
  //           999,
  //         ).getTime();

  //         dobQuery.$lte = maxDOB;
  //       }

  //       // ---------------------------------------------------
  //       // TO AGE
  //       // ---------------------------------------------------

  //       if (
  //         filter.toAge !== undefined &&
  //         filter.toAge !== null &&
  //         filter.toAge !== ""
  //       ) {
  //         const toAge = Number(
  //           filter.toAge,
  //         );

  //         if (
  //           Number.isNaN(toAge) ||
  //           toAge < 0
  //         ) {
  //           return ResponseBuilder.Failure(
  //             0,
  //             "Invalid toAge",
  //             [],
  //           );
  //         }

  //         const minDOB = new Date(
  //           today.getFullYear() -
  //             toAge -
  //             1,
  //           today.getMonth(),
  //           today.getDate() + 1,
  //           0,
  //           0,
  //           0,
  //           0,
  //         ).getTime();

  //         dobQuery.$gte = minDOB;
  //       }

  //       if (
  //         Object.keys(dobQuery).length > 0
  //       ) {
  //         baseQuery.dateOfBirth =
  //           dobQuery;
  //       }
  //     }

  //     // =====================================================
  //     // INACTIVE FILTER
  //     // =====================================================

  //     if (filter.inactivId) {
  //       if (
  //         !mongoose.Types.ObjectId.isValid(
  //           filter.inactivId,
  //         )
  //       ) {
  //         return ResponseBuilder.Failure(
  //           0,
  //           "Invalid inactivId",
  //           [],
  //         );
  //       }

  //       baseQuery.inactivId =
  //         new mongoose.Types.ObjectId(
  //           filter.inactivId,
  //         );
  //     }

  //     // =====================================================
  //     // CREATED_AT FILTER
  //     // =====================================================

  //     if (filter.fromDate ||filter.toDate) {
  //       const createdQuery: any = {};

  //       if (filter.fromDate) {
  //         const fromRange =
  //           getDayRange(
  //             filter.fromDate,
  //           );

  //         if (!fromRange) {
  //           return ResponseBuilder.Failure(
  //             0,
  //             "Invalid fromDate",
  //             [],
  //           );
  //         }

  //         createdQuery.$gte =
  //           fromRange.start;
  //       }

  //       if (filter.toDate) {
  //         const toRange =
  //           getDayRange(
  //             filter.toDate,
  //           );

  //         if (!toRange) {
  //           return ResponseBuilder.Failure(
  //             0,
  //             "Invalid toDate",
  //             [],
  //           );
  //         }

  //         createdQuery.$lte =
  //           toRange.end;
  //       }

  //       baseQuery.created_at =
  //         createdQuery;
  //     }

  //     // =====================================================
  //     // UPDATED_AT FILTER
  //     // =====================================================

  //     if (filter.updatedDate) {
  //       const updatedRange =
  //         getDayRange(
  //           filter.updatedDate,
  //         );

  //       if (!updatedRange) {
  //         return ResponseBuilder.Failure(
  //           0,
  //           "Invalid updatedDate",
  //           [],
  //         );
  //       }

  //       baseQuery.updated_at = {
  //         $gte: updatedRange.start,
  //         $lte: updatedRange.end,
  //       };
  //     }

  //     // =====================================================
  //     // INACTIVE_DATE FILTER
  //     // =====================================================

  //     if (filter.inactiveDate) {
  //       const inactiveRange =
  //         getDayRange(
  //           filter.inactiveDate,
  //         );

  //       if (!inactiveRange) {
  //         return ResponseBuilder.Failure(
  //           0,
  //           "Invalid inactiveDate",
  //           [],
  //         );
  //       }

  //       baseQuery.inactive_date = {
  //         $gte:
  //           inactiveRange.start.getTime(),
  //         $lte:
  //           inactiveRange.end.getTime(),
  //       };
  //     }

  //     // =====================================================
  //     // SORT ORDER
  //     //
  //     // 1 = A-Z
  //     // 0 / anything else = Z-A
  //     // =====================================================

  //     const sortOrder =
  //       Number(
  //         filter.alphabeticalOrder,
  //       ) === 1
  //         ? 1
  //         : -1;

  //     // =====================================================
  //     // MEMBER QUERY
  //     // =====================================================

  //     const memberQuery: any = {
  //       ...baseQuery,
  //     };

  //     // =====================================================
  // // INACTIVE_DATE RANGE FILTER
  // //
  // // inactive_date is stored as milliseconds timestamp
  // //
  // // Example:
  // // inactiveFomDate = "2026-08-01"
  // // inactiveToDate  = "2026-08-19"
  // //
  // // Means:
  // // inactive_date >= 2026-08-01 00:00:00
  // // AND
  // // inactive_date <= 2026-08-19 23:59:59.999
  // // =====================================================

  // if (
  //   filter.inactiveFomDate ||
  //   filter.inactiveToDate
  // ) {
  //   const inactiveQuery: any = {};

  //   // ---------------------------------------------------
  //   // FROM DATE
  //   // ---------------------------------------------------

  //   if (filter.inactiveFomDate) {
  //     const fromRange = getDayRange(
  //       filter.inactiveFomDate,
  //     );

  //     if (!fromRange) {
  //       return ResponseBuilder.Failure(
  //         0,
  //         "Invalid inactiveFomDate",
  //         [],
  //       );
  //     }

  //     inactiveQuery.$gte =
  //       fromRange.start.getTime();
  //   }

  //   // ---------------------------------------------------
  //   // TO DATE
  //   // ---------------------------------------------------

  //   if (filter.inactiveToDate) {
  //     const toRange = getDayRange(
  //       filter.inactiveToDate,
  //     );

  //     if (!toRange) {
  //       return ResponseBuilder.Failure(
  //         0,
  //         "Invalid inactiveToDate",
  //         [],
  //       );
  //     }

  //     inactiveQuery.$lte =
  //       toRange.end.getTime();
  //   }

  //   // ---------------------------------------------------
  //   // APPLY FILTER
  //   // ---------------------------------------------------

  //   baseQuery.inactive_date =
  //     inactiveQuery;
  // }

  //     // =====================================================
  //     // AND CONDITIONS
  //     //
  //     // Search + Cursor both use $or.
  //     // So directly assigning memberQuery.$or twice
  //     // will overwrite one another.
  //     //
  //     // We use $and to safely combine them.
  //     // =====================================================

  //     const andConditions: any[] = [];

  //     // =====================================================
  //     // SEARCH
  //     //
  //     // voterId OR mobileNumber OR fullName
  //     // =====================================================

  //     if (search?.trim()) {
  //       const searchValue =
  //         search.trim();

  //       andConditions.push({
  //         $or: [
  //           {
  //             voterId: {
  //               $regex: searchValue,
  //               $options: "i",
  //             },
  //           },
  //           {
  //             mobileNumber: {
  //               $regex: searchValue,
  //               $options: "i",
  //             },
  //           },
  //           {
  //             fullName: {
  //               $regex: searchValue,
  //               $options: "i",
  //             },
  //           },
  //         ],
  //       });
  //     }

  //     // =====================================================
  //     // CURSOR PAGINATION
  //     //
  //     // IMPORTANT:
  //     //
  //     // Sort:
  //     //
  //     // fullName ASC/DESC
  //     // _id DESC
  //     //
  //     // Therefore cursor must contain BOTH:
  //     //
  //     // fullName
  //     // _id
  //     //
  //     // We cannot use only _id because the primary sort
  //     // field is fullName.
  //     // =====================================================

  //     if (cursor) {
  //       try {
  //         // -------------------------------------------------
  //         // Decode base64 cursor
  //         // -------------------------------------------------

  //         const decodedString =
  //           Buffer.from(
  //             cursor,
  //             "base64",
  //           ).toString("utf8");

  //         const decodedCursor =
  //           JSON.parse(decodedString);

  //         // -------------------------------------------------
  //         // Validate cursor
  //         // -------------------------------------------------

  //         if (
  //           typeof decodedCursor.fullName !==
  //             "string" ||
  //           !decodedCursor._id ||
  //           !mongoose.Types.ObjectId.isValid(
  //             decodedCursor._id,
  //           )
  //         ) {
  //           return ResponseBuilder.Failure(
  //             0,
  //             "Invalid cursor",
  //             [],
  //           );
  //         }

  //         const cursorFullName =
  //           decodedCursor.fullName;

  //         const cursorId =
  //           new mongoose.Types.ObjectId(
  //             decodedCursor._id,
  //           );

  //         // -------------------------------------------------
  //         // A-Z
  //         //
  //         // Sort:
  //         //
  //         // fullName: 1
  //         // _id: -1
  //         //
  //         // Next records:
  //         //
  //         // fullName > cursorFullName
  //         //
  //         // OR
  //         //
  //         // same fullName AND _id < cursorId
  //         // -------------------------------------------------

  //         if (sortOrder === 1) {
  //           andConditions.push({
  //             $or: [
  //               {
  //                 fullName: {
  //                   $gt: cursorFullName,
  //                 },
  //               },
  //               {
  //                 fullName:
  //                   cursorFullName,
  //                 _id: {
  //                   $lt: cursorId,
  //                 },
  //               },
  //             ],
  //           });
  //         }

  //         // -------------------------------------------------
  //         // Z-A
  //         //
  //         // Sort:
  //         //
  //         // fullName: -1
  //         // _id: -1
  //         //
  //         // Next records:
  //         //
  //         // fullName < cursorFullName
  //         //
  //         // OR
  //         //
  //         // same fullName AND _id < cursorId
  //         // -------------------------------------------------

  //         else {
  //           andConditions.push({
  //             $or: [
  //               {
  //                 fullName: {
  //                   $lt: cursorFullName,
  //                 },
  //               },
  //               {
  //                 fullName:
  //                   cursorFullName,
  //                 _id: {
  //                   $lt: cursorId,
  //                 },
  //               },
  //             ],
  //           });
  //         }
  //       } catch (error) {
  //         return ResponseBuilder.Failure(
  //           0,
  //           "Invalid cursor",
  //           [],
  //         );
  //       }
  //     }

  //     // =====================================================
  //     // APPLY AND CONDITIONS
  //     // =====================================================

  //     if (andConditions.length > 0) {
  //       memberQuery.$and =
  //         andConditions;
  //     }

  //     // =====================================================
  //     // DEBUG - OPTIONAL
  //     //
  //     // Uncomment if you want to inspect pagination query.
  //     // =====================================================

  //     // console.log(
  //     //   "Cursor:",
  //     //   cursor,
  //     // );

  //     // console.log(
  //     //   "Member Query:",
  //     //   JSON.stringify(
  //     //     memberQuery,
  //     //     null,
  //     //     2,
  //     //   ),
  //     // );

  //     // =====================================================
  //     // MEMBERS + STATISTICS
  //     // =====================================================

  //     const [
  //       members,
  //       statistics,
  //     ] = await Promise.all([
  //       // ===================================================
  //       // MEMBERS
  //       // ===================================================

  //       membersSchema
  //         .find(memberQuery)

  //         .populate({
  //           path: "distictId",
  //           select: "_id name",
  //         })

  //         .populate({
  //           path:
  //             "assemblyConstituencyId",
  //           select: "_id name",
  //         })

  //         .populate({
  //           path: "panjaythId",
  //           select: "_id name",
  //         })

  //         .populate({
  //           path: "villageId",
  //           select: "_id name",
  //         })

  //         .populate({
  //           path: "wardId",
  //           select: "_id name",
  //         })

  //         .populate({
  //           path: "boothId",
  //           select:
  //             "_id boothNumber boothName boothLocation",
  //         })

  //         .populate({
  //           path: "educationId",
  //           select: "_id name",
  //         })

  //         .populate({
  //           path: "workId",
  //           select: "_id name",
  //         })

  //         .populate({
  //           path: "religionId",
  //           select: "_id name",
  //         })

  //         .populate({
  //           path: "castId",
  //           select: "_id name",
  //         })

  //         .populate({
  //           path: "inactivId",
  //           select: "_id name",
  //         })

  //         // -------------------------------------------------
  //         // IMPORTANT:
  //         //
  //         // Primary sort = fullName
  //         // Secondary sort = _id
  //         // -------------------------------------------------

  //         .sort({
  //           fullName: sortOrder,
  //           _id: -1,
  //         })

  //         // -------------------------------------------------
  //         // Fetch 11 records
  //         //
  //         // 10 -> response
  //         // 11th -> determine hasNextPage
  //         // -------------------------------------------------

  //         .limit(11)

  //         .lean(),

  //       // ===================================================
  //       // BOOTH STATISTICS
  //       //
  //       // Cursor is intentionally NOT applied here.
  //       // Statistics should represent the complete filtered
  //       // dataset, not only the current page.
  //       // ===================================================

  //       membersSchema.aggregate([
  //         {
  //           $match: baseQuery,
  //         },

  //         {
  //           $lookup: {
  //             from: "booths",
  //             localField: "boothId",
  //             foreignField: "_id",
  //             as: "booth",
  //           },
  //         },

  //         {
  //           $unwind: {
  //             path: "$booth",
  //             preserveNullAndEmptyArrays:
  //               false,
  //           },
  //         },

  //         {
  //           $group: {
  //             _id: "$boothId",

  //             boothNumber: {
  //               $first:
  //                 "$booth.boothNumber",
  //             },

  //             boothName: {
  //               $first:
  //                 "$booth.boothName",
  //             },

  //             boothLocation: {
  //               $first:
  //                 "$booth.boothLocation",
  //             },

  //             noOfVotes: {
  //               $sum: 1,
  //             },

  //             male: {
  //               $sum: {
  //                 $cond: [
  //                   {
  //                     $eq: [
  //                       "$gender",
  //                       "Male",
  //                     ],
  //                   },
  //                   1,
  //                   0,
  //                 ],
  //               },
  //             },

  //             female: {
  //               $sum: {
  //                 $cond: [
  //                   {
  //                     $eq: [
  //                       "$gender",
  //                       "Female",
  //                     ],
  //                   },
  //                   1,
  //                   0,
  //                 ],
  //               },
  //             },

  //             thirdGender: {
  //               $sum: {
  //                 $cond: [
  //                   {
  //                     $eq: [
  //                       "$gender",
  //                       "Third Gender",
  //                     ],
  //                   },
  //                   1,
  //                   0,
  //                 ],
  //               },
  //             },
  //           },
  //         },

  //         {
  //           $project: {
  //             _id: 0,

  //             boothId: "$_id",

  //             boothNumber: 1,
  //             boothName: 1,
  //             boothLocation: 1,

  //             noOfVotes: 1,

  //             male: 1,
  //             female: 1,
  //             thirdGender: 1,
  //           },
  //         },

  //         {
  //           $sort: {
  //             boothNumber: 1,
  //           },
  //         },
  //       ]),
  //     ]);

  //     // =====================================================
  //     // PAGINATION
  //     // =====================================================

  //     const hasNextPage =
  //       members.length > 10;

  //     // -----------------------------------------------------
  //     // Only return 10 records
  //     // -----------------------------------------------------

  //     const memberList =
  //       hasNextPage
  //         ? members.slice(0, 10)
  //         : members;

  //     // =====================================================
  //     // NEXT CURSOR
  //     //
  //     // Cursor contains:
  //     //
  //     // fullName
  //     // _id
  //     //
  //     // This is required because sorting is based on
  //     // fullName + _id.
  //     // =====================================================

  //     let nextCursor: string | null =
  //       null;

  //     if (
  //       hasNextPage &&
  //       memberList.length > 0
  //     ) {
  //       const lastMember =
  //         memberList[
  //           memberList.length - 1
  //         ];

  //       const cursorData = {
  //         fullName:
  //           lastMember.fullName ?? "",
  //         _id:
  //           lastMember._id.toString(),
  //       };

  //       nextCursor =
  //         Buffer.from(
  //           JSON.stringify(
  //             cursorData,
  //           ),
  //         ).toString("base64");
  //     }

  //     // =====================================================
  //     // FORMAT MEMBER DATA
  //     // =====================================================

  //     const membersWithAge =
  //       memberList.map(
  //         (member: any) => {
  //           // ------------------------------------------------
  //           // AGE
  //           // ------------------------------------------------

  //           let age: number | null =
  //             null;

  //           if (
  //             member.dateOfBirth !==
  //               undefined &&
  //             member.dateOfBirth !== null
  //           ) {
  //             const dob =
  //               new Date(
  //                 Number(
  //                   member.dateOfBirth,
  //                 ),
  //               );

  //             const today =
  //               new Date();

  //             age =
  //               today.getFullYear() -
  //               dob.getFullYear();

  //             const monthDiff =
  //               today.getMonth() -
  //               dob.getMonth();

  //             if (
  //               monthDiff < 0 ||
  //               (monthDiff === 0 &&
  //                 today.getDate() <
  //                   dob.getDate())
  //             ) {
  //               age--;
  //             }
  //           }

  //           // ------------------------------------------------
  //           // RETURN MEMBER
  //           // ------------------------------------------------

  //           return {
  //             ...member,

  //             age,

  //             // ------------------------------------------------
  //             // CREATED / UPDATED
  //             // ------------------------------------------------

  //             created_at:
  //               member.created_at
  //                 ? new Date(
  //                     member.created_at,
  //                   ).getTime()
  //                 : null,

  //             updated_at:
  //               member.updated_at
  //                 ? new Date(
  //                     member.updated_at,
  //                   ).getTime()
  //                 : null,

  //             // ------------------------------------------------
  //             // INACTIVE
  //             // ------------------------------------------------

  //             inactivId:
  //               member.inactivId?._id
  //                 ?.toString() ?? null,

  //             inactiveReasonName:
  //               member.inactivId?.name ??
  //               null,

  //             InactivereasonName:
  //               member.inactivId?.name ??
  //               null,

  //             // ------------------------------------------------
  //             // DISTRICT
  //             // ------------------------------------------------

  //             distictId:
  //               member.distictId?._id
  //                 ?.toString() ?? null,

  //             distictName:
  //               member.distictId?.name ??
  //               null,

  //             // ------------------------------------------------
  //             // ASSEMBLY CONSTITUENCY
  //             // ------------------------------------------------

  //             assemblyConstituencyId:
  //               member
  //                 .assemblyConstituencyId?._id
  //                 ?.toString() ?? null,

  //             assemblyConstituencyName:
  //               member
  //                 .assemblyConstituencyId
  //                 ?.name ?? null,

  //             // ------------------------------------------------
  //             // PANJAYTH
  //             // ------------------------------------------------

  //             panjaythId:
  //               member.panjaythId?._id
  //                 ?.toString() ?? null,

  //             panjaythName:
  //               member.panjaythId?.name ??
  //               null,

  //             // ------------------------------------------------
  //             // VILLAGE
  //             // ------------------------------------------------

  //             villageId:
  //               member.villageId?._id
  //                 ?.toString() ?? null,

  //             villageName:
  //               member.villageId?.name ??
  //               null,

  //             // ------------------------------------------------
  //             // WARD
  //             // ------------------------------------------------

  //             wardId:
  //               member.wardId?._id
  //                 ?.toString() ?? null,

  //             wardName:
  //               member.wardId?.name ??
  //               null,

  //             // ------------------------------------------------
  //             // BOOTH
  //             // ------------------------------------------------

  //             boothId:
  //               member.boothId?._id
  //                 ?.toString() ?? null,

  //             boothNumber:
  //               member.boothId?.boothNumber ??
  //               null,

  //             boothName:
  //               member.boothId?.boothName ??
  //               null,

  //             boothLocation:
  //               member.boothId
  //                 ?.boothLocation ??
  //               null,

  //             // ------------------------------------------------
  //             // EDUCATION
  //             // ------------------------------------------------

  //             educationId:
  //               member.educationId?._id
  //                 ?.toString() ?? null,

  //             educationName2:
  //               member.educationId?.name ??
  //               null,

  //             // ------------------------------------------------
  //             // WORK
  //             // ------------------------------------------------

  //             workId:
  //               member.workId?._id
  //                 ?.toString() ?? null,

  //             workname:
  //               member.workId?.name ??
  //               null,

  //             // ------------------------------------------------
  //             // RELIGION
  //             // ------------------------------------------------

  //             religionId:
  //               member.religionId?._id
  //                 ?.toString() ?? null,

  //             religionName:
  //               member.religionId?.name ??
  //               null,

  //             // ------------------------------------------------
  //             // CAST
  //             // ------------------------------------------------

  //             castId:
  //               member.castId?._id
  //                 ?.toString() ?? null,

  //             castName:
  //               member.castId?.name ??
  //               null,
  //           };
  //         },
  //       );

  //     // =====================================================
  //     // BOOTH DETAILS
  //     // =====================================================

  //     let booth = null;

  //     if (
  //       filter.boothId?.length &&
  //       statistics.length > 0
  //     ) {
  //       booth =
  //         statistics.filter(
  //           (item: any) =>
  //             filter.boothId!.some(
  //               (filterBoothId: string) =>
  //                 filterBoothId.toString() ===
  //                 item.boothId?.toString(),
  //             ),
  //         );
  //     }

  //     // =====================================================
  //     // RESPONSE
  //     // =====================================================

  //     return ResponseBuilder.Success(
  //       1,
  //       "Members List",
  //       [
  //         {
  //           booth,

  //           members: membersWithAge,

  //           pagination: {
  //             limit: 10,
  //             nextCursor,
  //             hasNextPage,
  //           },
  //         },
  //       ],
  //     );
  //   } catch (error: any) {
  //     console.error(
  //       "Error in Fetching Members:",
  //       error,
  //     );

  //     return ResponseBuilder.Failure(
  //       0,
  //       "Error in Fetching Members",
  //       [error.message],
  //     );
  //   }
  // }

  async getMembers(
    userData: IUser,
    filter: IMemberFilter,
    cursor?: string,
    search?: string,
  ): Promise<ResponseFormate> {
    try {
      const id = userData.id;

      // =====================================================
      // GET USER
      // =====================================================

      const user: any = await UserSchema.findById(id)
        .select("role panjaythIds")
        .lean();

      if (!user) {
        return ResponseBuilder.Failure(0, "User not found", []);
      }

      // =====================================================
      // BASE QUERY
      // =====================================================

      const baseQuery: any = {};

      // =====================================================
      // S_DELETE
      // =====================================================

      if (filter.s_delete !== undefined && filter.s_delete !== null) {
        baseQuery.s_delete = Number(filter.s_delete);
      }

      // =====================================================
      // ROLE BASED FILTER
      // =====================================================

      if (user.role === "User") {
        baseQuery.panjaythId = {
          $in: user.panjaythIds || [],
        };
      }

      // =====================================================
      // CONVERT IDS TO OBJECT IDS
      // =====================================================

      const convertToObjectIds = (
        ids: string[] | undefined,
        fieldName: string,
      ): mongoose.Types.ObjectId[] | null => {
        if (!ids || ids.length === 0) {
          return null;
        }

        const invalidIds = ids.filter(
          (item) => !mongoose.Types.ObjectId.isValid(item),
        );

        if (invalidIds.length > 0) {
          throw new Error(`Invalid ${fieldName}`);
        }

        return ids.map((item) => new mongoose.Types.ObjectId(item));
      };

      // =====================================================
      // DAY RANGE HELPER
      // =====================================================

      const getDayRange = (
        dateStr: string,
      ): {
        start: Date;
        end: Date;
      } | null => {
        const parsed = new Date(dateStr);

        if (isNaN(parsed.getTime())) {
          return null;
        }

        const start = new Date(
          parsed.getFullYear(),
          parsed.getMonth(),
          parsed.getDate(),
          0,
          0,
          0,
          0,
        );

        const end = new Date(
          parsed.getFullYear(),
          parsed.getMonth(),
          parsed.getDate(),
          23,
          59,
          59,
          999,
        );

        return {
          start,
          end,
        };
      };

      // =====================================================
      // RELIGION
      // =====================================================

      const religionIds = convertToObjectIds(filter.relegionId, "relegionId");

      if (religionIds) {
        baseQuery.religionId = {
          $in: religionIds,
        };
      }

      // =====================================================
      // CAST
      // =====================================================

      const castIds = convertToObjectIds(filter.castId, "castId");

      if (castIds) {
        baseQuery.castId = {
          $in: castIds,
        };
      }

      // =====================================================
      // EDUCATION
      // =====================================================

      const educationIds = convertToObjectIds(
        filter.educationId,
        "educationId",
      );

      if (educationIds) {
        baseQuery.educationId = {
          $in: educationIds,
        };
      }

      // =====================================================
      // WORK
      // =====================================================

      const workIds = convertToObjectIds(filter.workId, "workId");

      if (workIds) {
        baseQuery.workId = {
          $in: workIds,
        };
      }

      // =====================================================
      // CONSTITUENCY
      // =====================================================

      const constituencyIds = convertToObjectIds(
        filter.constituencyId,
        "constituencyId",
      );

      if (constituencyIds) {
        baseQuery.assemblyConstituencyId = {
          $in: constituencyIds,
        };
      }

      // =====================================================
      // PANJAYTH
      // =====================================================

      const panjaythIds = convertToObjectIds(filter.panjaythId, "panjaythId");

      if (panjaythIds) {
        baseQuery.panjaythId = {
          $in: panjaythIds,
        };
      }

      // =====================================================
      // VILLAGE
      // =====================================================

      const villageIds = convertToObjectIds(filter.villageId, "villageId");

      if (villageIds) {
        baseQuery.villageId = {
          $in: villageIds,
        };
      }

      // =====================================================
      // WARD
      // =====================================================

      const wardIds = convertToObjectIds(filter.wardId, "wardId");

      if (wardIds) {
        baseQuery.wardId = {
          $in: wardIds,
        };
      }

      // =====================================================
      // BOOTH
      // =====================================================

      const boothIds = convertToObjectIds(filter.boothId, "boothId");

      if (boothIds) {
        baseQuery.boothId = {
          $in: boothIds,
        };
      }

      // =====================================================
      // GENDER
      // =====================================================

      if (
        filter.gender &&
        Array.isArray(filter.gender) &&
        filter.gender.length > 0
      ) {
        const genders = filter.gender
          .map((gender: string) => gender.trim())
          .filter(Boolean);

        if (genders.length > 0) {
          baseQuery.gender = {
            $in: genders,
          };
        }
      }

      // =====================================================
      // AGE FILTER
      // =====================================================

      if (
        (filter.fromAge !== undefined &&
          filter.fromAge !== null &&
          filter.fromAge !== "") ||
        (filter.toAge !== undefined &&
          filter.toAge !== null &&
          filter.toAge !== "")
      ) {
        const today = new Date();

        const dobQuery: any = {};

        // ---------------------------------------------------
        // FROM AGE
        // ---------------------------------------------------

        if (
          filter.fromAge !== undefined &&
          filter.fromAge !== null &&
          filter.fromAge !== ""
        ) {
          const fromAge = Number(filter.fromAge);

          if (Number.isNaN(fromAge) || fromAge < 0) {
            return ResponseBuilder.Failure(0, "Invalid fromAge", []);
          }

          const maxDOB = new Date(
            today.getFullYear() - fromAge,
            today.getMonth(),
            today.getDate(),
            23,
            59,
            59,
            999,
          ).getTime();

          dobQuery.$lte = maxDOB;
        }

        // ---------------------------------------------------
        // TO AGE
        // ---------------------------------------------------

        if (
          filter.toAge !== undefined &&
          filter.toAge !== null &&
          filter.toAge !== ""
        ) {
          const toAge = Number(filter.toAge);

          if (Number.isNaN(toAge) || toAge < 0) {
            return ResponseBuilder.Failure(0, "Invalid toAge", []);
          }

          const minDOB = new Date(
            today.getFullYear() - toAge - 1,
            today.getMonth(),
            today.getDate() + 1,
            0,
            0,
            0,
            0,
          ).getTime();

          dobQuery.$gte = minDOB;
        }

        if (Object.keys(dobQuery).length > 0) {
          baseQuery.dateOfBirth = dobQuery;
        }
      }

      // =====================================================
      // INACTIVE REASON FILTER
      // =====================================================

      if (filter.inactivId) {
        if (!mongoose.Types.ObjectId.isValid(filter.inactivId)) {
          return ResponseBuilder.Failure(0, "Invalid inactivId", []);
        }

        baseQuery.inactivId = new mongoose.Types.ObjectId(filter.inactivId);
      }

      // =====================================================
      // CREATED_AT FILTER
      //
      // fromDate + toDate
      // =====================================================

      if (filter.fromDate || filter.toDate) {
        const createdQuery: any = {};

        // ---------------------------------------------------
        // FROM DATE
        // ---------------------------------------------------

        if (filter.fromDate) {
          const fromRange = getDayRange(filter.fromDate);

          if (!fromRange) {
            return ResponseBuilder.Failure(0, "Invalid fromDate", []);
          }

          createdQuery.$gte = fromRange.start;
        }

        // ---------------------------------------------------
        // TO DATE
        // ---------------------------------------------------

        if (filter.toDate) {
          const toRange = getDayRange(filter.toDate);

          if (!toRange) {
            return ResponseBuilder.Failure(0, "Invalid toDate", []);
          }

          createdQuery.$lte = toRange.end;
        }

        baseQuery.created_at = createdQuery;
      }

      // =====================================================
      // UPDATED_AT FILTER
      //
      // Single exact day
      // =====================================================

      if (filter.updatedDate) {
        const updatedRange = getDayRange(filter.updatedDate);

        if (!updatedRange) {
          return ResponseBuilder.Failure(0, "Invalid updatedDate", []);
        }

        baseQuery.updated_at = {
          $gte: updatedRange.start,
          $lte: updatedRange.end,
        };
      }

      // =====================================================
      // INACTIVE_DATE RANGE FILTER
      //
      // IMPORTANT:
      //
      // inactive_date is stored as milliseconds timestamp.
      //
      // Example:
      //
      // inactiveFomDate = "2026-08-01"
      // inactiveToDate  = "2026-08-19"
      //
      // Query:
      //
      // inactive_date >=
      // 2026-08-01 00:00:00
      //
      // AND
      //
      // inactive_date <=
      // 2026-08-19 23:59:59.999
      // =====================================================

      if (filter.inactiveFomDate || filter.inactiveToDate) {
        const inactiveQuery: any = {};

        // ---------------------------------------------------
        // FROM DATE
        // ---------------------------------------------------

        if (filter.inactiveFomDate) {
          const fromRange = getDayRange(filter.inactiveFomDate);

          if (!fromRange) {
            return ResponseBuilder.Failure(0, "Invalid inactiveFomDate", []);
          }

          inactiveQuery.$gte = fromRange.start.getTime();
        }

        // ---------------------------------------------------
        // TO DATE
        // ---------------------------------------------------

        if (filter.inactiveToDate) {
          const toRange = getDayRange(filter.inactiveToDate);

          if (!toRange) {
            return ResponseBuilder.Failure(0, "Invalid inactiveToDate", []);
          }

          inactiveQuery.$lte = toRange.end.getTime();
        }

        // ---------------------------------------------------
        // FROM > TO VALIDATION
        // ---------------------------------------------------

        if (
          inactiveQuery.$gte !== undefined &&
          inactiveQuery.$lte !== undefined &&
          inactiveQuery.$gte > inactiveQuery.$lte
        ) {
          return ResponseBuilder.Failure(
            0,
            "inactiveFomDate cannot be greater than inactiveToDate",
            [],
          );
        }

        // ---------------------------------------------------
        // APPLY FILTER
        // ---------------------------------------------------

        baseQuery.inactive_date = inactiveQuery;
      }

      // =====================================================
      // SORT ORDER
      //
      // 1 = A-Z
      // 0 / anything else = Z-A
      // =====================================================

      const sortOrder = Number(filter.alphabeticalOrder) === 1 ? 1 : -1;

      // =====================================================
      // MEMBER QUERY
      // =====================================================

      const memberQuery: any = {
        ...baseQuery,
      };

      // =====================================================
      // AND CONDITIONS
      //
      // Search + Cursor both use $or.
      // So we use $and.
      // =====================================================

      const andConditions: any[] = [];

      // =====================================================
      // SEARCH
      //
      // voterId OR mobileNumber OR fullName
      // =====================================================

      if (search?.trim()) {
        const searchValue = search.trim();

        andConditions.push({
          $or: [
            {
              voterId: {
                $regex: searchValue,
                $options: "i",
              },
            },
            {
              mobileNumber: {
                $regex: searchValue,
                $options: "i",
              },
            },
            {
              fullName: {
                $regex: searchValue,
                $options: "i",
              },
            },
          ],
        });
      }

      // =====================================================
      // CURSOR PAGINATION
      // =====================================================

      if (cursor) {
        try {
          // -------------------------------------------------
          // Decode cursor
          // -------------------------------------------------

          const decodedString = Buffer.from(cursor, "base64").toString("utf8");

          const decodedCursor = JSON.parse(decodedString);

          // -------------------------------------------------
          // Validate cursor
          // -------------------------------------------------

          if (
            typeof decodedCursor.fullName !== "string" ||
            !decodedCursor._id ||
            !mongoose.Types.ObjectId.isValid(decodedCursor._id)
          ) {
            return ResponseBuilder.Failure(0, "Invalid cursor", []);
          }

          const cursorFullName = decodedCursor.fullName;

          const cursorId = new mongoose.Types.ObjectId(decodedCursor._id);

          // -------------------------------------------------
          // A-Z
          //
          // Sort:
          //
          // fullName ASC
          // _id DESC
          // -------------------------------------------------

          if (sortOrder === 1) {
            andConditions.push({
              $or: [
                {
                  fullName: {
                    $gt: cursorFullName,
                  },
                },
                {
                  fullName: cursorFullName,
                  _id: {
                    $lt: cursorId,
                  },
                },
              ],
            });
          }

          // -------------------------------------------------
          // Z-A
          //
          // Sort:
          //
          // fullName DESC
          // _id DESC
          // -------------------------------------------------
          else {
            andConditions.push({
              $or: [
                {
                  fullName: {
                    $lt: cursorFullName,
                  },
                },
                {
                  fullName: cursorFullName,
                  _id: {
                    $lt: cursorId,
                  },
                },
              ],
            });
          }
        } catch (error) {
          return ResponseBuilder.Failure(0, "Invalid cursor", []);
        }
      }

      // =====================================================
      // APPLY AND CONDITIONS
      // =====================================================

      if (andConditions.length > 0) {
        memberQuery.$and = andConditions;
      }

      // =====================================================
      // MEMBERS + STATISTICS
      // =====================================================

      const [members, statistics] = await Promise.all([
        // ===================================================
        // MEMBERS
        // ===================================================

        membersSchema
          .find(memberQuery)

          .populate({
            path: "distictId",
            select: "_id name",
          })

          .populate({
            path: "assemblyConstituencyId",
            select: "_id name",
          })

          .populate({
            path: "panjaythId",
            select: "_id name",
          })

          .populate({
            path: "villageId",
            select: "_id name",
          })

          .populate({
            path: "wardId",
            select: "_id name",
          })

          .populate({
            path: "boothId",
            select: "_id boothNumber boothName boothLocation",
          })

          .populate({
            path: "educationId",
            select: "_id name",
          })

          .populate({
            path: "workId",
            select: "_id name",
          })

          .populate({
            path: "religionId",
            select: "_id name",
          })

          .populate({
            path: "castId",
            select: "_id name",
          })

          .populate({
            path: "inactivId",
            select: "_id name",
          })

          // -------------------------------------------------
          // SORT
          // -------------------------------------------------

          .sort({
            fullName: sortOrder,
            _id: -1,
          })

          // -------------------------------------------------
          // Fetch 11
          //
          // 10 = response
          // 11th = hasNextPage
          // -------------------------------------------------

          .limit(11)

          .lean(),

        // ===================================================
        // BOOTH STATISTICS
        //
        // IMPORTANT:
        //
        // Cursor is NOT applied here.
        //
        // baseQuery contains all filters including:
        // inactiveFomDate
        // inactiveToDate
        //
        // So statistics represent the complete filtered
        // dataset.
        // ===================================================

        membersSchema.aggregate([
          {
            $match: baseQuery,
          },

          // -------------------------------------------------
          // BOOTH LOOKUP
          // -------------------------------------------------

          {
            $lookup: {
              from: "booths",
              localField: "boothId",
              foreignField: "_id",
              as: "booth",
            },
          },

          // -------------------------------------------------
          // UNWIND BOOTH
          // -------------------------------------------------

          {
            $unwind: {
              path: "$booth",
              preserveNullAndEmptyArrays: false,
            },
          },

          // -------------------------------------------------
          // GROUP BY BOOTH
          // -------------------------------------------------

          {
            $group: {
              _id: "$boothId",

              boothNumber: {
                $first: "$booth.boothNumber",
              },

              boothName: {
                $first: "$booth.boothName",
              },

              boothLocation: {
                $first: "$booth.boothLocation",
              },

              noOfVotes: {
                $sum: 1,
              },

              male: {
                $sum: {
                  $cond: [
                    {
                      $eq: ["$gender", "Male"],
                    },
                    1,
                    0,
                  ],
                },
              },

              female: {
                $sum: {
                  $cond: [
                    {
                      $eq: ["$gender", "Female"],
                    },
                    1,
                    0,
                  ],
                },
              },

              thirdGender: {
                $sum: {
                  $cond: [
                    {
                      $eq: ["$gender", "Third Gender"],
                    },
                    1,
                    0,
                  ],
                },
              },
            },
          },

          // -------------------------------------------------
          // PROJECT
          // -------------------------------------------------

          {
            $project: {
              _id: 0,

              boothId: "$_id",

              boothNumber: 1,
              boothName: 1,
              boothLocation: 1,

              noOfVotes: 1,

              male: 1,
              female: 1,
              thirdGender: 1,
            },
          },

          // -------------------------------------------------
          // SORT BOOTH
          // -------------------------------------------------

          {
            $sort: {
              boothNumber: 1,
            },
          },
        ]),
      ]);

      // =====================================================
      // PAGINATION
      // =====================================================

      const hasNextPage = members.length > 10;

      // =====================================================
      // ONLY RETURN 10
      // =====================================================

      const memberList = hasNextPage ? members.slice(0, 10) : members;

      // =====================================================
      // NEXT CURSOR
      // =====================================================

      let nextCursor: string | null = null;

      if (hasNextPage && memberList.length > 0) {
        const lastMember = memberList[memberList.length - 1];

        const cursorData = {
          fullName: lastMember.fullName ?? "",
          _id: lastMember._id.toString(),
        };

        nextCursor = Buffer.from(JSON.stringify(cursorData)).toString("base64");
      }

      // =====================================================
      // FORMAT MEMBER DATA
      // =====================================================

      const membersWithAge = memberList.map((member: any) => {
        // ------------------------------------------------
        // AGE
        // ------------------------------------------------

        let age: number | null = null;

        if (member.dateOfBirth !== undefined && member.dateOfBirth !== null) {
          const dob = new Date(Number(member.dateOfBirth));

          const today = new Date();

          age = today.getFullYear() - dob.getFullYear();

          const monthDiff = today.getMonth() - dob.getMonth();

          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < dob.getDate())
          ) {
            age--;
          }
        }

        // ------------------------------------------------
        // RETURN MEMBER
        // ------------------------------------------------

        return {
          ...member,

          age,

          // ------------------------------------------------
          // CREATED / UPDATED
          // ------------------------------------------------

          created_at: member.created_at
            ? new Date(member.created_at).getTime()
            : null,

          updated_at: member.updated_at
            ? new Date(member.updated_at).getTime()
            : null,

          // ------------------------------------------------
          // INACTIVE
          // ------------------------------------------------

          inactivId: member.inactivId?._id?.toString() ?? null,

          inactiveReasonName: member.inactivId?.name ?? null,

          InactivereasonName: member.inactivId?.name ?? null,

          // ------------------------------------------------
          // DISTRICT
          // ------------------------------------------------

          distictId: member.distictId?._id?.toString() ?? null,

          distictName: member.distictId?.name ?? null,

          // ------------------------------------------------
          // ASSEMBLY CONSTITUENCY
          // ------------------------------------------------

          assemblyConstituencyId:
            member.assemblyConstituencyId?._id?.toString() ?? null,

          assemblyConstituencyName: member.assemblyConstituencyId?.name ?? null,

          // ------------------------------------------------
          // PANJAYTH
          // ------------------------------------------------

          panjaythId: member.panjaythId?._id?.toString() ?? null,

          panjaythName: member.panjaythId?.name ?? null,

          // ------------------------------------------------
          // VILLAGE
          // ------------------------------------------------

          villageId: member.villageId?._id?.toString() ?? null,

          villageName: member.villageId?.name ?? null,

          // ------------------------------------------------
          // WARD
          // ------------------------------------------------

          wardId: member.wardId?._id?.toString() ?? null,

          wardName: member.wardId?.name ?? null,

          // ------------------------------------------------
          // BOOTH
          // ------------------------------------------------

          boothId: member.boothId?._id?.toString() ?? null,

          boothNumber: member.boothId?.boothNumber ?? null,

          boothName: member.boothId?.boothName ?? null,

          boothLocation: member.boothId?.boothLocation ?? null,

          // ------------------------------------------------
          // EDUCATION
          // ------------------------------------------------

          educationId: member.educationId?._id?.toString() ?? null,

          educationName2: member.educationId?.name ?? null,

          // ------------------------------------------------
          // WORK
          // ------------------------------------------------

          workId: member.workId?._id?.toString() ?? null,

          workname: member.workId?.name ?? null,

          // ------------------------------------------------
          // RELIGION
          // ------------------------------------------------

          religionId: member.religionId?._id?.toString() ?? null,

          religionName: member.religionId?.name ?? null,

          // ------------------------------------------------
          // CAST
          // ------------------------------------------------

          castId: member.castId?._id?.toString() ?? null,

          castName: member.castId?.name ?? null,
        };
      });

      // =====================================================
      // BOOTH DETAILS
      // =====================================================

      let booth = null;

      if (filter.boothId?.length && statistics.length > 0) {
        booth = statistics.filter((item: any) =>
          filter.boothId!.some(
            (filterBoothId: string) =>
              filterBoothId.toString() === item.boothId?.toString(),
          ),
        );
      }

      // =====================================================
      // RESPONSE
      // =====================================================

      return ResponseBuilder.Success(1, "Members List", [
        {
          booth,

          members: membersWithAge,

          pagination: {
            limit: 10,
            nextCursor,
            hasNextPage,
          },
        },
      ]);
    } catch (error: any) {
      console.error("Error in Fetching Members:", error);

      return ResponseBuilder.Failure(0, "Error in Fetching Members", [
        error.message,
      ]);
    }
  }

  async createEducation(
    data: IEducationQualification,
  ): Promise<ResponseFormate> {
    try {
      if (data._id) {
        const update = await EducationQualificationSchema.findOneAndUpdate(
          { _id: data._id },
          data,
          { new: true },
        );
        return ResponseBuilder.Success(1, "The Value is Update", [update]);
      }
      const create = await EducationQualificationSchema.create(data);
      return ResponseBuilder.Failure(1, "The Value is Created", [create]);
    } catch (error: any) {
      return ResponseBuilder.Failure(
        0,
        data._id ? "Error in Updating" : "Error in Adding",
        [error.message],
      );
    }
  }

  async getEducation(
    cursor?: string,
    searchKey?: string,
  ): Promise<ResponseFormate> {
    try {
      const limit = 10;
      const filter: any = {
        s_delete: 0,
      };
      // =====================================
      // SEARCH KEY
      // =====================================
      if (searchKey?.trim()) {
        filter.name = {
          $regex: searchKey.trim(),
          $options: "i",
        };
      }

      // =====================================
      // CURSOR
      // =====================================

      if (cursor) {
        if (!mongoose.Types.ObjectId.isValid(cursor)) {
          return ResponseBuilder.Failure(0, "Invalid cursor", []);
        }

        filter._id = {
          $gt: new mongoose.Types.ObjectId(cursor),
        };
      }

      // =====================================
      // GET 10 + 1
      // =====================================

      const education = await EducationQualificationSchema.find(filter)
        .sort({ _id: 1 })
        .limit(limit + 1)
        .lean();

      // =====================================
      // PAGINATION
      // =====================================

      const hasNextPage = education.length > limit;

      const educationList = hasNextPage ? education.slice(0, limit) : education;

      const nextCursor =
        hasNextPage && educationList.length > 0
          ? educationList[educationList.length - 1]._id.toString()
          : null;

      // =====================================
      // RESPONSE
      // =====================================

      return ResponseBuilder.Success(
        1,
        educationList.length
          ? "Education fetched successfully"
          : "No Data found",
        [
          {
            educationList,

            pagination: {
              limit,
              nextCursor,
              hasNextPage,
            },
          },
        ],
      );
    } catch (error: any) {
      return ResponseBuilder.Failure(0, "Error in Fetching the Value", [
        error.message,
      ]);
    }
  }

  async createWork(data: IWork): Promise<ResponseFormate> {
    try {
      if (data._id) {
        const update = await WorkSchema.findOneAndUpdate(
          { _id: data._id },
          data,
          { new: true },
        );

        return ResponseBuilder.Success(1, "The Value is Updated", [update]);
      }
      const create = await WorkSchema.create(data);
      return ResponseBuilder.Success(1, "THe Value is Updated", [create]);
    } catch (error: any) {
      return ResponseBuilder.Failure(
        0,
        data._id ? "Error in Updating" : "Error in Adigg",
        [error.message],
      );
    }
  }

  async getWork(cursor?: string, searchKey?: string): Promise<ResponseFormate> {
    try {
      const limit = 10;

      const filter: any = {
        s_delete: 0,
      };

      // =====================================
      // SEARCH KEY
      // =====================================

      if (searchKey?.trim()) {
        filter.name = {
          $regex: searchKey.trim(),
          $options: "i",
        };
      }

      // =====================================
      // CURSOR
      // =====================================

      if (cursor) {
        if (!mongoose.Types.ObjectId.isValid(cursor)) {
          return ResponseBuilder.Failure(0, "Invalid cursor", []);
        }

        filter._id = {
          $gt: new mongoose.Types.ObjectId(cursor),
        };
      }

      // =====================================
      // GET 10 + 1
      // =====================================

      const work = await WorkSchema.find(filter)
        .sort({ _id: 1 })
        .limit(limit + 1)
        .lean();

      // =====================================
      // PAGINATION
      // =====================================

      const hasNextPage = work.length > limit;

      const workList = hasNextPage ? work.slice(0, limit) : work;

      const nextCursor =
        hasNextPage && workList.length > 0
          ? workList[workList.length - 1]._id.toString()
          : null;

      // =====================================
      // RESPONSE
      // =====================================

      return ResponseBuilder.Success(
        1,
        workList.length ? "Work fetched successfully" : "No Data found",
        [
          {
            items: workList,

            pagination: {
              limit,
              nextCursor,
              hasNextPage,
            },
          },
        ],
      );
    } catch (error: any) {
      return ResponseBuilder.Failure(0, "Error in Fetching the Value", [
        error.message,
      ]);
    }
  }

  async createReligion(data: IReligion): Promise<ResponseFormate> {
    try {
      if (data._id) {
        const update = await ReligionSchema.findOneAndUpdate(
          { _id: data._id },
          data,
          { new: true },
        );
        return ResponseBuilder.Success(1, "The Value is UPdated", [update]);
      }
      const create = await ReligionSchema.create(data);
      return ResponseBuilder.Success(1, "THe Value is Updated", [create]);
    } catch (error: any) {
      return ResponseBuilder.Failure(
        0,
        data._id ? "Error in Updating" : "Error in Adigg",
        [error.message],
      );
    }
  }

  // async getReligion(cursor?: string): Promise<ResponseFormate> {
  //   try {
  //     const take = 10;
  //     const filter: any = {};
  //     if (cursor) {
  //       filter._id = { $gt: cursor };
  //     }
  //     const religion = await ReligionSchema.find(filter)
  //       .sort({ _id: 1 })
  //       .limit(take);
  //     return ResponseBuilder.Success(1, "THe Value", religion);
  //   } catch (error: any) {
  //     return ResponseBuilder.Failure(0, "Error in Fetching the Value", [
  //       error.message,
  //     ]);
  //   }
  // }
  async getReligion(
    cursor?: string,
    searchKey?: string,
  ): Promise<ResponseFormate> {
    try {
      const limit = 10;

      const filter: any = {
        s_delete: 0,
      };

      // =====================================
      // SEARCH KEY
      // =====================================

      if (searchKey?.trim()) {
        filter.name = {
          $regex: searchKey.trim(),
          $options: "i",
        };
      }

      // =====================================
      // CURSOR
      // =====================================

      if (cursor) {
        if (!mongoose.Types.ObjectId.isValid(cursor)) {
          return ResponseBuilder.Failure(0, "Invalid cursor", []);
        }

        filter._id = {
          $gt: new mongoose.Types.ObjectId(cursor),
        };
      }

      // =====================================
      // GET 10 + 1
      // =====================================

      const religion = await ReligionSchema.find(filter)
        .sort({ _id: 1 })
        .limit(limit + 1)
        .lean();

      // =====================================
      // PAGINATION
      // =====================================

      const hasNextPage = religion.length > limit;

      const religionList = hasNextPage ? religion.slice(0, limit) : religion;

      const nextCursor =
        hasNextPage && religionList.length > 0
          ? religionList[religionList.length - 1]._id.toString()
          : null;

      // =====================================
      // RESPONSE
      // =====================================

      return ResponseBuilder.Success(
        1,
        religionList.length ? "Religion fetched successfully" : "No Data found",
        [
          {
            items: religionList,

            pagination: {
              limit,
              nextCursor,
              hasNextPage,
            },
          },
        ],
      );
    } catch (error: any) {
      return ResponseBuilder.Failure(0, "Error in Fetching the Value", [
        error.message,
      ]);
    }
  }

  async createCaste(data: ICaste): Promise<ResponseFormate> {
    try {
      // Handle caste soft deletion BEFORE caste name validation
      if (data._id && Number(data.s_delete) === 1) {
        const deletedCaste = await CasteSchema.findByIdAndUpdate(
          data._id,
          { $set: { s_delete: 1 } },
          { returnDocument: "after", runValidators: true },
        );

        if (!deletedCaste) {
          return ResponseBuilder.Failure(0, "Caste not found", []);
        }

        return ResponseBuilder.Success(1, "Caste deleted successfully", [
          deletedCaste,
        ]);
      }

      const name = String(data.name ?? "")
        .trim()
        .replace(/\s+/g, " ");

      if (!name) {
        return ResponseBuilder.Failure(0, "Caste name is required", []);
      }

      const normalizedName = name.normalize("NFKC").toLowerCase();
      const { _id, ...casteData } = data;

      const referenceId =
        data.referenceId === undefined
          ? undefined
          : String(data.referenceId).trim();

      if (referenceId !== undefined && referenceId.length > 50) {
        return ResponseBuilder.Failure(
          0,
          "referenceId cannot exceed 50 characters",
          [],
        );
      }

      const payload = {
        ...casteData,
        name,
        normalizedName,
        ...(referenceId !== undefined ? { referenceId } : {}),
        s_delete: data.s_delete ?? 0,
      };

      const updateOperation = {
        $set: payload,
      };

      if (_id) {
        const update = await CasteSchema.findOneAndUpdate(
          { _id },
          updateOperation,
          { returnDocument: "after", runValidators: true },
        );

        if (!update) {
          return ResponseBuilder.Failure(0, "Caste not found", []);
        }

        await CasteSchema.collection.updateOne(
          { _id: update._id },
          { $unset: { referenceIds: "" } },
        );

        return ResponseBuilder.Success(1, "Caste updated successfully", [
          update,
        ]);
      }

      const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const existing = await CasteSchema.findOne({
        name: { $regex: `^${escapedName}$`, $options: "i" },
      });

      if (existing) {
        const update = await CasteSchema.findByIdAndUpdate(
          existing._id,
          updateOperation,
          { returnDocument: "after", runValidators: true },
        );

        if (update?._id) {
          await CasteSchema.collection.updateOne(
            { _id: update._id },
            { $unset: { referenceIds: "" } },
          );
        }

        return ResponseBuilder.Success(1, "Caste updated successfully", [
          update,
        ]);
      }

      const create = await CasteSchema.create(payload);

      return ResponseBuilder.Success(1, "Caste created successfully", [create]);
    } catch (error: any) {
      return ResponseBuilder.Failure(
        0,
        data._id ? "Error in Updating Caste" : "Error in Creating Caste",
        [error.message],
      );
    }
  }

  // async getCaste(cursor?: string): Promise<ResponseFormate> {
  //   try {
  //     const take = 10;
  //     const filter: any = {};
  //     if (cursor) {
  //       filter._id = { $gt: cursor };
  //     }
  //     const cast = await CasteSchema.find(filter).sort({ _id: 1 }).limit(take);
  //     return ResponseBuilder.Success(1, "THe Value", cast);
  //   } catch (error: any) {
  //     return ResponseBuilder.Failure(0, "Error in Fetching the Value", [
  //       error.message,
  //     ]);
  //   }
  // }

  async getCaste(
    cursor?: string,
    searchKey?: string,
  ): Promise<ResponseFormate> {
    try {
      const limit = 10;

      const filter: any = {
        s_delete: 0,
      };

      // =====================================
      // SEARCH KEY
      // =====================================

      if (searchKey?.trim()) {
        const normalizedSearch = searchKey
          .trim()
          .normalize("NFKC")
          .replace(/\s+/g, " ");
        const escapedSearch = normalizedSearch.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        );
        filter.$or = [
          { normalizedName: { $regex: escapedSearch.toLowerCase() } },
          { name: { $regex: escapedSearch, $options: "i" } },
        ];
      }

      // =====================================
      // CURSOR
      // =====================================

      if (cursor) {
        if (!mongoose.Types.ObjectId.isValid(cursor)) {
          return ResponseBuilder.Failure(0, "Invalid cursor", []);
        }

        filter._id = {
          $gt: new mongoose.Types.ObjectId(cursor),
        };
      }

      // =====================================
      // GET 10 + 1
      // =====================================

      const cast = await CasteSchema.find(filter)
        .select("_id name referenceId")
        .sort({ _id: 1 })
        .limit(limit + 1)
        .lean();

      // =====================================
      // PAGINATION
      // =====================================

      const hasNextPage = cast.length > limit;

      const casteList = hasNextPage ? cast.slice(0, limit) : cast;

      const nextCursor =
        hasNextPage && casteList.length > 0
          ? casteList[casteList.length - 1]._id.toString()
          : null;

      // =====================================
      // RESPONSE
      // =====================================

      return ResponseBuilder.Success(
        1,
        casteList.length ? "Caste fetched successfully" : "No Data found",
        [
          {
            items: casteList,

            pagination: {
              limit,
              nextCursor,
              hasNextPage,
            },
          },
        ],
      );
    } catch (error: any) {
      return ResponseBuilder.Failure(0, "Error in Fetching the Value", [
        error.message,
      ]);
    }
  }

  async createInactive(data: Iinactive): Promise<ResponseFormate> {
    try {
      if (data._id) {
        const update = await InactiveSchema.findOneAndUpdate(
          { _id: data._id },
          data,
          { new: true },
        );
        return ResponseBuilder.Success(1, "The Value is UPdated", [update]);
      }
      const create = await InactiveSchema.create(data);
      return ResponseBuilder.Success(1, "THe Value is Updated", [create]);
    } catch (error: any) {
      return ResponseBuilder.Failure(
        0,
        data._id ? "Error in Updating" : "Error in Adigg",
        [error.message],
      );
    }
  }

  async getInactive(): Promise<ResponseFormate> {
    try {
      const partyPosition = await InactiveSchema.find().sort({ _id: 1 });

      return ResponseBuilder.Success(1, "THe Value", partyPosition);
    } catch (error: any) {
      return ResponseBuilder.Failure(0, "Error in Fetching the Value", [
        error.message,
      ]);
    }
  }

  async markAsInActive(
    data: ImarkAsInactive,
    user: IUser,
  ): Promise<ResponseFormate> {
    try {
      console.log("data", data.id);
      const member = await membersSchema.findByIdAndUpdate(
        data.id,
        {
          $set: {
            inactivId: data.inactivId,
            otherInactiveReason: data.otherInactiveReason,
            inactive_date: data.inactive_date,
            inactive_description: data.inactive_description,
            s_delete: 1,
          },
        },
        {
          new: true,
        },
      );

      if (!member) {
        return ResponseBuilder.Failure(0, "Member not found", []);
      }

      await this.createHistory(user.id, data.id, "delete");

      return ResponseBuilder.Success(
        1,
        "Member marked as inactive successfully",
        [member],
      );
    } catch (error) {
      console.error(error);

      return ResponseBuilder.Failure(0, "Failed to mark member as inactive", [
        error.message,
      ]);
    }
  }

  async getInactiveById(id: string): Promise<ResponseFormate> {
    try {
      const member = await membersSchema
        .findById(id)
        .populate("educationId", "name")
        .populate("workId", "name")
        .populate("religionId", "name")
        .populate("castId", "name")
        .populate("distictId", "name")
        .populate("assemblyConstituencyId", "name")
        .populate("panjaythId", "name")
        .populate("villageId", "name")
        .populate("wardId", "name")
        .populate("boothId", "name")
        .populate("inactivId", "name")
        .lean();

      const response = {
        ...member,

        educationName: (member?.educationId as any)?.name,
        workName: (member?.workId as any)?.name,
        religionName: (member?.religionId as any)?.name,
        casteName: (member?.castId as any)?.name,
        districtName: (member?.distictId as any)?.name,
        assemblyConstituencyName: (member?.assemblyConstituencyId as any)?.name,
        panchayatName: (member?.panjaythId as any)?.name,
        villageName: (member?.villageId as any)?.name,
        wardName: (member?.wardId as any)?.name,
        boothName: (member?.boothId as any)?.name,
        inactiveReason: (member?.inactivId as any)?.name,

        // Remove the populated objects
        educationId: undefined,
        workId: undefined,
        religionId: undefined,
        castId: undefined,
        distictId: undefined,
        assemblyConstituencyId: undefined,
        panjaythId: undefined,
        villageId: undefined,
        wardId: undefined,
        boothId: undefined,
        inactivId: undefined,
      };

      if (!member) {
        return ResponseBuilder.Failure(0, "Member not found", []);
      }

      return ResponseBuilder.Success(
        1,
        "Inactive member fetched successfully",
        [response],
      );
    } catch (error: any) {
      return ResponseBuilder.Failure(0, "Error in Updating", [error.message]);
    }
  }

  async createHistory(
    userId: string,
    memberId: Schema.Types.ObjectId,
    type: string,
  ): Promise<null> {
    try {
      await SearchHistrorySchema.create({
        userId,
        memberId,
        type,
      });

      return null;
    } catch (error) {
      console.error("Create search history error:", error);

      return null;
    }
  }

  async getLast10DaysActivity(
    userId: Schema.Types.ObjectId,
  ): Promise<ResponseFormate> {
    try {
      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      startDate.setDate(startDate.getDate() - 9);

      const result = await SearchHistrorySchema.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            created_at: {
              $gte: startDate,
            },
            type: {
              $in: ["create", "update", "delete"],
            },
          },
        },
        {
          $group: {
            _id: {
              date: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$created_at",
                },
              },
              type: "$type",
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $group: {
            _id: "$_id.date",

            create: {
              $sum: {
                $cond: [{ $eq: ["$_id.type", "create"] }, "$count", 0],
              },
            },

            update: {
              $sum: {
                $cond: [{ $eq: ["$_id.type", "update"] }, "$count", 0],
              },
            },

            delete: {
              $sum: {
                $cond: [{ $eq: ["$_id.type", "delete"] }, "$count", 0],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            date: "$_id",
            create: 1,
            update: 1,
            delete: 1,
            total: {
              $add: ["$create", "$update", "$delete"],
            },
          },
        },
        {
          $sort: {
            date: 1,
          },
        },
      ]);

      return {
        success: true,
        message: "Last 10 days activity fetched successfully",
        data: result,
      };
    } catch (error) {
      console.error("Last 10 days activity error:", error);

      return {
        success: false,
        message: "Failed to fetch activity",
        data: null,
      };
    }
  }

  async getMemberActivity(
    userId: Schema.Types.ObjectId,
    page: number,
    limit: number,
  ): Promise<ResponseFormate> {
    try {
      const objectUserId = new mongoose.Types.ObjectId(userId);

      const skip = (page - 1) * limit;

      // Total create / delete
      const totalResult = await SearchHistrorySchema.aggregate([
        {
          $match: {
            userId: objectUserId,
            type: {
              $in: ["create", "delete"],
            },
          },
        },
        {
          $group: {
            _id: "$type",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      let totalMembersAdded = 0;
      let totalMembersDeleted = 0;

      for (const item of totalResult) {
        
        if (item._id === "create") {
          totalMembersAdded = item.count;
        }

        if (item._id === "delete") {
          totalMembersDeleted = item.count;
        }
      }

      // Total active days
      const totalDaysResult = await SearchHistrorySchema.aggregate([
        {
          $match: {
            userId: objectUserId,
            type: {
              $in: ["create", "update", "delete"],
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$created_at",
              },
            },
          },
        },
        {
          $count: "totalDays",
        },
      ]);

      const totalDays = totalDaysResult[0]?.totalDays || 0;

      const totalPages = Math.ceil(totalDays / limit);

      // Day-wise activity
      const dailyActivity = await SearchHistrorySchema.aggregate([
        {
          $match: {
            userId: objectUserId,
            type: {
              $in: ["create", "update", "delete"],
            },
          },
        },

        // Date + type
        {
          $group: {
            _id: {
              date: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$created_at",
                },
              },
              type: "$type",
            },
            count: {
              $sum: 1,
            },
          },
        },

        // Only count > 0
        {
          $match: {
            count: {
              $gt: 0,
            },
          },
        },

        // Group by date
        {
          $group: {
            _id: "$_id.date",
            activities: {
              $push: {
                type: "$_id.type",
                count: "$count",
              },
            },
          },
        },

        // Latest date first
        {
          $sort: {
            _id: -1,
          },
        },

        // Pagination
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },

        // Final structure
        {
          $project: {
            _id: 0,
            date: "$_id",
            activities: 1,
          },
        },
      ]);

      return {
        success: true,
        message: "Member activity fetched successfully",
        data: {
          totalMembersAdded,
          totalMembersDeleted,

          pagination: {
            currentPage: page,
            pageSize: limit,
            totalDays,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
          },

          data: dailyActivity,
        },
      };
    } catch (error) {
      console.error("Get member activity error:", error);

      return {
        success: false,
        message: "Failed to fetch member activity",
        data: null,
      };
    }
  }
}
