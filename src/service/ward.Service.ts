import mongoose, { Schema } from "mongoose";
import { ResponseBuilder,type ResponseFormate } from "../helper/ResponseFormate.js";
import type{ IWard } from "../interface/ward.interface.js";
import { WardSchema } from "../model/ward.schema.js";
import type { IUser } from "../interface/user.interface.js";
import { UserSchema } from "../model/user.schema.js";
import villageSchema from "../model/village.schema.js";

export class WardService {

async createWard(data: IWard): Promise<ResponseFormate> {
  try {
    if (data._id) {
      const update = await WardSchema.findByIdAndUpdate(
        data._id,
        data,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!update) {
        return ResponseBuilder.Failure(0, "No Record Found", []);
      }

      return ResponseBuilder.Success(
        1,
        "The value is Updated",
        [update]
      );
    }

    const create = await WardSchema.create(data);

    return ResponseBuilder.Success(
      1,
      "The value is Created",
      [create]
    );
  } catch (error: any) {
    return ResponseBuilder.Failure(
      0,
      "Error in Adding the Ward",
      [error.message]
    );
  }
}
  

  

async getAllWards(userData: IUser,villageId?: string,cursor?: string,name?: string): Promise<ResponseFormate> {
  try {
    const id = userData.id;

    const user: any = await UserSchema.findById(id)
      .select("role panjaythIds");

    if (!user) {
      return ResponseBuilder.Failure(
        0,
        "User not found",
        []
      );
    }

    const query: any = {
      s_delete: 0,
    };

    // =====================================
    // ADMIN
    // =====================================

    if (user.role === "Admin") {

      if (villageId) {
        if (!mongoose.Types.ObjectId.isValid(villageId)) {
          return ResponseBuilder.Failure(
            0,
            "Invalid villageId",
            []
          );
        }

        query.villageId =
          new mongoose.Types.ObjectId(villageId);
      }
    }

    // =====================================
    // USER
    // =====================================

    else {

      const villages = await villageSchema
        .find({
          panjaythId: {
            $in: user.panjaythIds,
          },
          s_delete: 0,
        })
        .select("_id");

      const villageIds = villages.map(
        (v) => v._id
      );

      if (villageId) {

        if (!mongoose.Types.ObjectId.isValid(villageId)) {
          return ResponseBuilder.Failure(
            0,
            "Invalid villageId",
            []
          );
        }

        const requestedVillageId =
          new mongoose.Types.ObjectId(villageId);

        const allowed = villageIds.some((id: mongoose.Types.ObjectId) =>id.equals(requestedVillageId));

        if (!allowed) {
          return ResponseBuilder.Failure(
            0,
            "You don't have access to this village",
            []
          );
        }

        query.villageId = requestedVillageId;

      } else {

        query.villageId = {
          $in: villageIds,
        };
      }
    }

    // =====================================
    // CURSOR PAGINATION
    // =====================================

    if (cursor) {

      if (!mongoose.Types.ObjectId.isValid(cursor)) {
        return ResponseBuilder.Failure(
          0,
          "Invalid cursor",
          []
        );
      }

      query._id = {
        $lt: new mongoose.Types.ObjectId(cursor),
      };
    }

    // =====================================
    // NAME SEARCH
    // =====================================

    if (name?.trim()) {
      query.name = {
        $regex: name.trim(),
        $options: "i",
      };
    }

    // =====================================
    // AGGREGATION
    // =====================================

    const result = await WardSchema.aggregate([

      // 1. Filter
      {
        $match: query,
      },

      // 2. Cursor order
      {
        $sort: {
          _id: -1,
        },
      },

      // 3. Fetch 11 records
      // 10 records + 1 to check next page
      {
        $limit: 11,
      },

      // 4. Booth count
      {
        $lookup: {
          from: "booths",

          let: {
            wardId: "$_id",
          },

          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: [
                        "$wardId",
                        "$$wardId",
                      ],
                    },
                    {
                      $eq: [
                        "$s_delete",
                        0,
                      ],
                    },
                  ],
                },
              },
            },

            {
              $count: "count",
            },
          ],

          as: "boothData",
        },
      },

      // 5. Add booth count
      {
        $addFields: {
          boothCount: {
            $ifNull: [
              {
                $arrayElemAt: [
                  "$boothData.count",
                  0,
                ],
              },
              0,
            ],
          },
        },
      },

      // 6. Required fields only
      {
        $project: {
          _id: 1,
          name: 1,
          villageId: 1,
          boothCount: 1,
        },
      },
    ]);

    // =====================================
    // PAGINATION RESULT
    // =====================================

    const hasNextPage =
      result.length > 10;

    const wards = hasNextPage
      ? result.slice(0, 10)
      : result;

    const nextCursor =
      hasNextPage && wards.length > 0
        ? wards[
            wards.length - 1
          ]._id.toString()
        : "";

    // =====================================
    // RESPONSE
    // =====================================

    return ResponseBuilder.Success(
      wards.length ? 1 : 0,
      wards.length
        ? "Wards fetched successfully"
        : "No Data found",
      [{
         wards,

        pagination: {
          nextCursor,
          hasNextPage,
        },
      }]
    );

  } catch (error: any) {

    console.error(
      "Error in fetching wards:",
      error
    );

    return ResponseBuilder.Failure(
      0,
      "Error in Fetching the Value",
      [error.message]
    );
  }
}


}
