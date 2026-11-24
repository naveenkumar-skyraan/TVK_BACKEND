import mongoose from "mongoose";
import {
  ResponseBuilder,
  type ResponseFormate,
} from "../helper/ResponseFormate.js";
import type { Ipanjayth } from "../interface/panjayath.interface.js";
import type { IUser } from "../interface/user.interface.js";
import panjayathSchema from "../model/panjayath.schema.js";
import { UserSchema } from "../model/user.schema.js";

export class PanjaythService {
  async createPanjayth(data: Ipanjayth): Promise<ResponseFormate> {
    try {
      let result;
      if (data._id) {
        result = await panjayathSchema.findByIdAndUpdate(data._id, data, {
          new: true,
          runValidators: true,
        });
        if (!result) {
          return ResponseBuilder.Failure(0, "Panjayth not found", []);
        }
        return ResponseBuilder.Success(1, "Panjayth updated successfully", [result]);
      }
      result = await panjayathSchema.create(data);
      return ResponseBuilder.Success(1, "Panjayth created successfully", [result]);
    } catch (error: any) {
      return ResponseBuilder.Failure(0,data._id ? "Error while updating" : "Error while creating",[error.message]);
    }
  }

  // Get All
  // async getAllPanjayth(userData: IUser): Promise<ResponseFormate> {
  //   try {

  //           console.log('userData', userData)
  //   const id  = userData.id
  //   const user: any = await UserSchema.findById(id).select("role panjaythIds");

  //       // const user = await UserSchema.findOne({id: userData._id,s_delete: 0,}).select("role panjaythIds");
  //     if (!user) {
  //       return ResponseBuilder.Failure(0, "User Not Found", []);
  //     }

  //     let filter: any = {
  //       s_delete: 0,
  //     };

  //     if (user.role === "User") {
  //       filter._id = {
  //         $in: user.panjaythIds,
  //       };
  //     }

  //     const result = await panjayathSchema.find(filter).sort({ createdAt: -1 });
  //     return ResponseBuilder.Success(1,"Panjayth list fetched successfully",result);
  //   } catch (error: any) {
  //     return ResponseBuilder.Failure(0, "Error while fetching data", [error.message]);
  //   }
  // }


async getAllPanjayth(
  userData: IUser,
  constituencyId?: string,
  name?: string,
  cursor?: string,
): Promise<ResponseFormate> {
  try {
    const id = userData.id;

    const user: any =
      await UserSchema.findById(id).select("role panjaythIds");

    if (!user) {
      return ResponseBuilder.Failure(0, "User Not Found", []);
    }

    // =====================================
    // MATCH FILTER
    // =====================================

    const matchFilter: any = {
      s_delete: 0,
    };

    // =====================================
    // USER PANJAYTH FILTER
    // =====================================

    if (user.role === "User") {
      matchFilter._id = {
        $in: user.panjaythIds,
      };
    }

    // =====================================
    // CONSTITUENCY FILTER
    // =====================================

    if (constituencyId?.trim()) {
      if (!mongoose.Types.ObjectId.isValid(constituencyId)) {
        return ResponseBuilder.Failure(
          0,
          "Invalid constituencyId",
          [],
        );
      }

      matchFilter.constituencyId =
        new mongoose.Types.ObjectId(constituencyId);
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
        return ResponseBuilder.Failure(
          0,
          "Invalid cursor",
          [],
        );
      }

      if (matchFilter._id?.$in) {
        matchFilter.$and = [
          {
            _id: {
              $in: user.panjaythIds,
            },
          },
          {
            _id: {
              $gt: new mongoose.Types.ObjectId(cursor),
            },
          },
        ];

        delete matchFilter._id;
      } else {
        matchFilter._id = {
          $gt: new mongoose.Types.ObjectId(cursor),
        };
      }
    }

    // =====================================
    // AGGREGATION
    // =====================================

    const result = await panjayathSchema.aggregate([
      {
        $match: matchFilter,
      },

      {
        $sort: {
          _id: 1,
        },
      },

      // 10 + 1
      {
        $limit: 11,
      },

      {
        $project: {
          s_delete: 0,
          created_at: 0,
          updated_at: 0,
          __v: 0,
        },
      },
    ]);

    // =====================================
    // PAGINATION
    // =====================================

    const hasNextPage = result.length > 10;

    const panjayaths = hasNextPage
      ? result.slice(0, 10)
      : result;

    const nextCursor =
      hasNextPage && panjayaths.length > 0
        ? panjayaths[panjayaths.length - 1]._id.toString()
        : "";

    // =====================================
    // RESPONSE - OLD FORMAT
    // =====================================

    return ResponseBuilder.Success(
      1,
      "Panjayth list fetched successfully",
      [
        {
          panjayaths,

          pagination: {
            nextCursor,
            hasNextPage,
          },
        },
      ],
    );
  } catch (error: any) {
    console.error("Panjayth getAll error:", error);

    return ResponseBuilder.Failure(
      0,
      "Error while fetching panjayth",
      [error.message],
    );
  }
}


  // Get By Id
  async getPanjaythById(id: string): Promise<ResponseFormate> {
    try {
      const result = await panjayathSchema.findById(id);

      if (!result) {
        return ResponseBuilder.Failure(0, "Panjayth not found", []);
      }

      return ResponseBuilder.Success(1, "Panjayth fetched successfully", [result]);
    } catch (error: any) {

      return ResponseBuilder.Failure(0, "Error while fetching Panjayth", [error.message]);
    }
  }

  // Delete
  async deletePanjayth(id: string): Promise<ResponseFormate> {
    try {
      const result = await panjayathSchema.findByIdAndDelete(id);

      if (!result) {
        return ResponseBuilder.Failure(0, "Panjayth not found", []);
      }

      return ResponseBuilder.Success(1, "Panjayth deleted successfully", [result]);
    } catch (error: any) {
      return ResponseBuilder.Failure(0, "Error while deleting Panjayth", [error.message]);
    }
  }
}
