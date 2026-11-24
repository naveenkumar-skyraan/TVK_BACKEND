import mongoose from "mongoose";
import {
  ResponseBuilder,
  type ResponseFormate,
} from "../helper/ResponseFormate.js";
import type { IUser } from "../interface/user.interface.js";
import type { Ivillage } from "../interface/village.interface.js";
import { UserSchema } from "../model/user.schema.js";
import villageSchema from "../model/village.schema.js";

export class VillageService {
  async create(data: Ivillage): Promise<ResponseFormate> {
    try {
      let result;

      if (data._id) {
        result = await villageSchema.findByIdAndUpdate(data._id, data, {
          new: true,
          runValidators: true,
        });
        if (!result) {
          return ResponseBuilder.Success(0, "No Village found", []);
        }

        return ResponseBuilder.Success(1, "THe Value is Updated", [result]);
      }
      result = await villageSchema.create(data);
      return ResponseBuilder.Success(1, "THe vlaue is update", [result]);
    } catch (error: any) {
      return ResponseBuilder.Failure(0, "Error ", [error.message]);
    }
  }

  //   async getAll(userData: IUser,name?: string): Promise<ResponseFormate> {
  //   try {

  //     console.log('userData', userData)
  //     const id  = userData.id
  //     const user: any = await UserSchema.findById(id).select("role panjaythIds");

  //     console.log('user', user)
  //     if (!user) {
  //       return ResponseBuilder.Failure(0, "User not found", []);
  //     }

  //     const filter: any = {
  //       s_delete: 0,
  //     };

  //     // Role Based
  //     if (user.role === "User") {
  //       filter.panjaythId = {
  //         $in: user.panjaythIds,
  //       };
  //     }

  //     // Name Search
  //     if (name) {
  //       filter.name = {
  //         $regex: name,
  //         $options: "i",
  //       };
  //     }

  //     const result = await villageSchema
  //       .find(filter)
  //       .populate({
  //         path: "panjaythId",
  //         select: "name",
  //       });

  //     return ResponseBuilder.Success(1,"Village fetched successfully",result);
  //   } catch (error: any) {
  //     return ResponseBuilder.Failure(0,"Error while fetching village",[error.message]);
  //   }
  // }

  async getAll(userData: IUser,panjaythIds?: string,name?: string,cursor?: string): Promise<ResponseFormate> {
    try {
      const id = userData.id;

      const user: any =
        await UserSchema.findById(id).select("role panjaythIds");

      if (!user) {
        return ResponseBuilder.Failure(0, "User not found", []);
      }

      const matchFilter: any = {
        s_delete: 0,
      };

      // =====================================
      // PANJAYTH FILTER
      // =====================================

      if (panjaythIds?.trim()) {
        // Explicit panjaythIds passed
        const ids = panjaythIds
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean);

        const invalidIds = ids.filter(
          (id) => !mongoose.Types.ObjectId.isValid(id),
        );

        if (invalidIds.length > 0) {
          return ResponseBuilder.Failure(0, "Invalid panjaythId", invalidIds);
        }

        matchFilter.panjaythId = {
          $in: ids.map((id) => new mongoose.Types.ObjectId(id)),
        };
      } else if (user.role === "User") {
        // No panjaythIds passed
        // So take from logged-in user's token/database

        matchFilter.panjaythId = {
          $in: user.panjaythIds,
        };
      }

      // =====================================
      // NAME SEARCH
      // =====================================

      if (name?.trim()) {
        matchFilter.name = {
          $regex: name.trim(),
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

        matchFilter._id = {
          $gt: new mongoose.Types.ObjectId(cursor),
        };
      }

      // =====================================
      // AGGREGATION
      // =====================================

      const result = await villageSchema.aggregate([
        // Filter
        {
          $match: matchFilter,
        },

        // Cursor order
        {
          $sort: {
            _id: 1,
          },
        },

        // 10 records + 1 extra
        {
          $limit: 11,
        },

        // Ward count
        {
          $lookup: {
            from: "wards",

            let: {
              villageId: "$_id",
            },

            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$villageId", "$$villageId"],
                      },
                      {
                        $eq: ["$s_delete", 0],
                      },
                    ],
                  },
                },
              },

              {
                $count: "count",
              },
            ],

            as: "wardData",
          },
        },

        // Panchayath
        {
          $lookup: {
            from: "panjayths",

            localField: "panjaythId",
            foreignField: "_id",

            pipeline: [
              {
                $project: {
                  name: 1,
                },
              },
            ],

            as: "panjayth",
          },
        },

        // Add ward count
        {
          $addFields: {
            wardCount: {
              $ifNull: [
                {
                  $arrayElemAt: ["$wardData.count", 0],
                },
                0,
              ],
            },

            panjayth: {
              $arrayElemAt: ["$panjayth", 0],
            },
          },
        },

        // Remove unnecessary data
        {
          $project: {
            s_delete: 0,
            created_at: 0,
            updated_at: 0,
            __v: 0,
            panjayth:0,
            wardData: 0,
          },
        },
      ]);

      // =====================================
      // PAGINATION
      // =====================================

      const hasNextPage = result.length > 10;

      const villages = hasNextPage ? result.slice(0, 10) : result;

      const nextCursor =
        hasNextPage && villages.length > 0
          ? villages[villages.length - 1]._id.toString()
          : "";

      return ResponseBuilder.Success(1, "Village fetched successfully", [
        {
           villages,

          pagination: {
            nextCursor,
            hasNextPage,
          },
        },
      ]);
    } catch (error: any) {
      console.error("Village getAll error:", error);

      return ResponseBuilder.Failure(0, "Error while fetching village", [
        error.message,
      ]);
    }
  }
  
  async getById(id: string): Promise<ResponseFormate> {
    try {
      const result = await villageSchema.findOne({
        id: id,
        s_delete: 0,
      });

      if (!result) {
        return ResponseBuilder.Failure(0, "Village not found", []);
      }

      return ResponseBuilder.Success(1, "Village fetched successfully", [
        result,
      ]);
    } catch (error: any) {
      return ResponseBuilder.Failure(0, "Error while fetching village", [
        error.message,
      ]);
    }
  }

  async delete(id: string): Promise<ResponseFormate> {
    try {
      const result = await villageSchema.findByIdAndUpdate(
        id,
        {
          s_delete: 1,
        },
        {
          new: true,
        },
      );

      if (!result) {
        return ResponseBuilder.Failure(0, "Village not found", []);
      }

      return ResponseBuilder.Success(1, "Village deleted successfully", [
        result,
      ]);
    } catch (error: any) {
      return ResponseBuilder.Failure(0, "Error while deleting village", [
        error.message,
      ]);
    }
  }
}
