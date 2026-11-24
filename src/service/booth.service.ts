import mongoose from "mongoose";
import { ResponseBuilder,type ResponseFormate } from "../helper/ResponseFormate.js";
import type{ IBooth } from "../interface/booth.interface.js";
import { BoothSchema } from "../model/booth.schema.js";
import { UserSchema } from "../model/user.schema.js";
import villageSchema from "../model/village.schema.js";
import { WardSchema } from "../model/ward.schema.js";
import type { IUser } from "../interface/user.interface.js";

export class boothService{
async createBooth(data: IBooth): Promise<ResponseFormate> {
    try {
        // Update
        if (data._id) {
            const update = await BoothSchema.findOneAndUpdate({ _id: data._id },data,{new: true,runValidators: true});

            // Booth not found
            if (!update) {
                return ResponseBuilder.Failure(0,"Booth not found",[]);
            }

            return ResponseBuilder.Success(1,"The Booth is Updated",[update]);
        }

        // Create
        const create = await BoothSchema.create(data);

        return ResponseBuilder.Success(1,"The Booth is Created",[create]);

    } catch (error: any) {

        // Duplicate key error
        if (error.code === 11000) {
            return ResponseBuilder.Failure(
                0,
                "Booth already exists",
                [error.message]
            );
        }

        return ResponseBuilder.Failure(
            0,
            "Error in Creating the Booth",
            [error.message]
        );
    }
}

  async getAllBooth(userData: IUser,wardId?: string,cursor?: string,name?: string): Promise<ResponseFormate> {
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
    // WARD FILTER
    // =====================================

    if (wardId) {
      if (!mongoose.Types.ObjectId.isValid(wardId)) {
        return ResponseBuilder.Failure(
          0,
          "Invalid wardId",
          []
        );
      }

      const requestedWardId =
        new mongoose.Types.ObjectId(wardId);

      // ===================================
      // ADMIN
      // ===================================

      if (user.role === "Admin") {
        query.wardId = requestedWardId;
      }

      // ===================================
      // USER
      // ===================================

      else {
        // User's assigned villages
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

        // User's assigned wards
        const wards = await WardSchema
          .find({
            villageId: {
              $in: villageIds,
            },
            s_delete: 0,
          })
          .select("_id");

        const wardIds = wards.map(
          (w) => w._id
        );

        // Check requested ward access
        const allowed = wardIds.some(
          (id: mongoose.Types.ObjectId) =>
            id.equals(requestedWardId)
        );

        if (!allowed) {
          return ResponseBuilder.Failure(
            0,
            "You don't have access to this ward",
            []
          );
        }

        query.wardId = requestedWardId;
      }

    }

    // =====================================
    // NO WARD ID
    // =====================================

    else {

      // Admin -> all booths
      if (user.role === "Admin") {
        // No ward filter
      }

      // User -> assigned wards only
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

        const wards = await WardSchema
          .find({
            villageId: {
              $in: villageIds,
            },
            s_delete: 0,
          })
          .select("_id");

        query.wardId = {
          $in: wards.map(
            (w) => w._id
          ),
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
      query.boothName = {
        $regex: name.trim(),
        $options: "i",
      };
    }

    // =====================================
    // FETCH DATA
    // =====================================

    const result = await BoothSchema
      .find(query)
      .select(
        "_id boothNumber boothName boothLocation wardId"
      )
      .sort({
        _id: -1,
      })
      .limit(11)
      .lean();

    // =====================================
    // PAGINATION
    // =====================================

    const hasNextPage =
      result.length > 10;

    const booths = hasNextPage
      ? result.slice(0, 10)
      : result;

    const nextCursor =
      hasNextPage && booths.length > 0 ? booths[booths.length - 1]._id.toString() : "";

    // =====================================
    // RESPONSE
    // =====================================

    return ResponseBuilder.Success(
      booths.length ? 1 : 0,
      booths.length
        ? "Booths fetched successfully"
        : "No Data found",
     [ {
         booths,
        pagination: {
          nextCursor,
          hasNextPage,
        },
      }]
    );

  } catch (error: any) {

    console.error(
      "Error in fetching booths:",
      error
    );

    return ResponseBuilder.Failure(
      0,
      "There is an Error in Fetching Data",
      [error.message]
    );
  }
  }
}