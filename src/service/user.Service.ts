import mongoose, { Schema, Types } from "mongoose";
import { ResponseBuilder,type ResponseFormate } from "../helper/ResponseFormate.js";
import type{ IUser } from "../interface/user.interface.js";
import { BoothSchema } from "../model/booth.schema.js";
import { UserSchema } from "../model/user.schema.js";
import { WardSchema } from "../model/ward.schema.js";
import divisionSchema from "../model/constituency.schema.js";
import Members from "../model/members.schema.js";
import { AuthClass } from "../middleware/auth.middleware.js";
import panjayathSchema from "../model/panjayath.schema.js";
import villageSchema from "../model/village.schema.js";
import membersSchema from "../model/members.schema.js";

const authClass = new AuthClass();
export class userService {
  
  
  // async createUser(data: IUser): Promise<ResponseFormate> {
  //   try {
   
  //     data.password = await authClass.createBcrypt(data.password)
  //     const create = await UserSchema.create(data);
  //     return ResponseBuilder.Success(1, "The User is Created", [create]);
  //   } catch (error: any) {
  //     console.log('error', error)
  //     return ResponseBuilder.Failure(0, "Error in Creating the User", [error.message]);
  //   }
  // }



  async createUser(data: IUser): Promise<ResponseFormate> {
  try {
    let user: any;

    // =========================
    // UPDATE USER
    // =========================
    if (data.id) {
      const getUser = await UserSchema.findById(data.id);

      if (!getUser) {
        return ResponseBuilder.Failure(0, "User Not Found", []);
      }

      // Password kuduthirundha mattum hash pannum
      if (data.password) {
        data.password = await authClass.createBcrypt(data.password);
      } else {
        // Existing password maintain pannum
        data.password = getUser.password;
      }

      user = await UserSchema.findByIdAndUpdate(
        data.id,
        {
          $set: {
            ...data,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!user) {
        return ResponseBuilder.Failure(0, "User Update Failed", []);
      }
    }

    // =========================
    // CREATE USER
    // =========================
    else {
      const existingUser = await UserSchema.findOne({
        mobile: data.mobile,
      });

      if (existingUser) {
        return ResponseBuilder.Failure(
          0,
          "User with this mobile number already exists",
          []
        );
      }

      // Password hash
      data.password = await authClass.createBcrypt(data.password);

      user = await UserSchema.create(data);
    }

    // =========================
    // GENERATE TOKEN
    // =========================
    const token = await authClass.generateJWT({
      id: user._id,
      mobile: user.mobile,
      accountAccessPrivilege: user.accountAccessPrivilege,
      accountAccessModule: user.accountAccessModule,
      image: user.image,
      name: user.name,
      role: user.role,
    });

    return ResponseBuilder.Success(
      1,
      data.id ? "The User is Updated" : "The User is Created",
      [
        {
          token,
          user,
        },
      ]
    );
  } catch (error: any) {
    console.log("error", error);

    return ResponseBuilder.Failure(
      0,
      "Error in Creating/Updating the User",
      [error.message]
    );
  }
}

  async loginUser(data:IUser):Promise<ResponseFormate>{
    try {
      const getUser = await UserSchema.findOne({mobile:data.mobile})
      console.log('getUser', getUser)
      if(!getUser){
        return ResponseBuilder.Failure(0,"No User Found",[])
      }
      const ceckPass  = await authClass.checkPass(data.password,getUser.password)

      if(!ceckPass){
        return ResponseBuilder.Failure(0,"Invalid  Password",[])
      }
      
      const token = await authClass.generateJWT({id:getUser._id,mobile:getUser.mobile,accountAccessPrivilege:getUser.accountAccessPrivilege,accountAccessModul:getUser.accountAccessModule,image:getUser.image,name:getUser.name,role:getUser.role})
        console.log('token', token)
      return ResponseBuilder.Success(1,"Login Sucess",[{token,user:getUser}])
    
    
    } catch (error:any) {
      return ResponseBuilder.Failure(0,"Error in Login User ",[error.message])
    }
  }

async changePassword(id: string,oldPassword: string,newPassword: string): Promise<ResponseFormate> {
  try {
    // User ID check
    if (!id) {
      return ResponseBuilder.Failure(0, "User ID is Required", []);
    }

    // Password check
    if (!oldPassword || !newPassword) {
      return ResponseBuilder.Failure(0,"Old Password and New Password are Required",[]);
    }

    // Get user
    const getUser = await UserSchema.findById(id);

    if (!getUser) {
      return ResponseBuilder.Failure(0, "User Not Found", []);
    }

    // Check old password
    const checkPassword = await authClass.checkPass(oldPassword,getUser.password);

    if (!checkPassword) {
      return ResponseBuilder.Failure(0,"Old Password is Invalid",[]);
    }

    // Check new password is not same as old password
    const samePassword = await authClass.checkPass(newPassword,getUser.password);

    if (samePassword) {
      return ResponseBuilder.Failure(0,"New Password Cannot be Same as Old Password",[]);
    }

    // Hash new password
    const hashedPassword = await authClass.createBcrypt(newPassword);

    // Update password
    const updateUser = await UserSchema.findByIdAndUpdate(
      id,
      {
        $set: {
          password: hashedPassword,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateUser) {
      return ResponseBuilder.Failure(0,"Password Update Failed",[]);
    }

    return ResponseBuilder.Success(1,"Password Changed Successfully",[]);
  } catch (error: any) {
    console.log("changePassword error", error);

    return ResponseBuilder.Failure(0,"Error in Changing Password",[error.message]);
  }
}




// async getUser(id: Schema.Types.ObjectId): Promise<ResponseFormate> {
//   try {
//     const user = await UserSchema.findById(id);

//     if (!user) {
//       return ResponseBuilder.Success(0, "User not found",[])
//     }

//     return ResponseBuilder.Success(1,"User fetched successfully",user)
//   } catch (error:any) {
//     console.error("Get user error:", error);

//     return ResponseBuilder.Failure(0, "Failed to fetch user",error.message)
//     };
//   }



async getUser(id: Schema.Types.ObjectId): Promise<ResponseFormate> {
  try {
    const user = await UserSchema.findById(id).select("mobile name role userRole image panjaythIds").populate({path: "panjaythIds",select: "constituencyId",populate: {path: "constituencyId",select: "name"}}).lean();
    
    if (!user) {
      return ResponseBuilder.Success(0, "User not found", []);
    }
    const constituencyIds = user.panjaythIds.map((panjayth: any) => panjayth.constituencyId).filter(Boolean);
    const response = {
      mobile: user.mobile,
      name: user.name,
      role: user.role,
      userRole: user.userRole,
      image: user.image,
      constituencyIds
    };

    return ResponseBuilder.Success(1,"User fetched successfully",response);
  } catch (error: any) {
    console.error("Get user error:", error);

    return ResponseBuilder.Failure(0,"Failed to fetch user",error.message);
  }
}


async homepageApi(userData: IUser,cursor?: string,search?: string): Promise<ResponseFormate> {
  try {

    // ==========================================
    // GET USER
    // ==========================================

    const user = await UserSchema.findById(userData.id)
      .select("role panjaythIds");

    if (!user) {
      return ResponseBuilder.Failure(
        0,
        "User Not Found",
        []
      );
    }


    // ==========================================
    // BASE PANJAYATH QUERY
    // ==========================================

    const panjaythQuery: any = {
      s_delete: 0,
    };


    // ==========================================
    // USER ACCESS
    // ==========================================

    if (user.role !== "Admin") {

      panjaythQuery._id = {
        $in: user.panjaythIds,
      };

    }


    // ==========================================
    // SEARCH PANJAYATH
    // ==========================================

    if (search?.trim()) {

      panjaythQuery.name = {
        $regex: search.trim(),
        $options: "i",
      };

    }


    // ==========================================
    // CURSOR
    // ==========================================

    if (cursor) {

      if (!mongoose.Types.ObjectId.isValid(cursor)) {

        return ResponseBuilder.Failure(
          0,
          "Invalid cursor",
          []
        );

      }

      panjaythQuery._id = {
        ...(panjaythQuery._id || {}),
        $lt: new mongoose.Types.ObjectId(cursor),
      };

    }


    // ==========================================
    // GET PANJAYATH
    // 10 + 1
    // ==========================================

    const panjayaths = await panjayathSchema
      .find(panjaythQuery)
      .select("_id name")
      .sort({ _id: -1 })
      .limit(11)
      .lean();


    // ==========================================
    // PAGINATION
    // ==========================================

    const hasNextPage =
      panjayaths.length > 10;

    const panjaythList =
      hasNextPage
        ? panjayaths.slice(0, 10)
        : panjayaths;


    const nextCursor =
      hasNextPage && panjaythList.length > 0
        ? panjaythList[
            panjaythList.length - 1
          ]._id.toString()
        : null;


    // ==========================================
    // IDS FOR CURRENT PAGE
    // ==========================================

    const currentPanjaythIds =
      panjaythList.map(
        (panjayth) => panjayth._id
      );


    // ==========================================
    // GET VILLAGES
    // CURRENT PAGE PANJAYATH ONLY
    // ==========================================

    const villages = await villageSchema
      .find({
        panjaythId: {
          $in: currentPanjaythIds,
        },
        s_delete: 0,
      })
      .select("_id panjaythId")
      .lean();


    // ==========================================
    // GET ALL PANJAYATH IDS FOR STATISTICS
    // ==========================================

    const allPanjaythQuery: any = {
      s_delete: 0,
    };

    if (user.role !== "Admin") {

      allPanjaythQuery._id = {
        $in: user.panjaythIds,
      };

    }


    const allPanjayaths = await panjayathSchema
      .find(allPanjaythQuery)
      .select("_id")
      .lean();


    const allPanjaythIds =
      allPanjayaths.map(
        (panjayth) => panjayth._id
      );


    // ==========================================
    // ALL VILLAGES
    // ==========================================

    const allVillages = await villageSchema
      .find({
        panjaythId: {
          $in: allPanjaythIds,
        },
        s_delete: 0,
      })
      .select("_id")
      .lean();


    const allVillageIds =
      allVillages.map(
        (village) => village._id
      );


    // ==========================================
    // ALL WARDS
    // ==========================================

    const allWards = await WardSchema
      .find({
        villageId: {
          $in: allVillageIds,
        },
        s_delete: 0,
      })
      .select("_id")
      .lean();


    const allWardIds =
      allWards.map(
        (ward) => ward._id
      );


    // ==========================================
    // ALL BOOTHS
    // ==========================================

    const allBooths = await BoothSchema
      .find({
        wardId: {
          $in: allWardIds,
        },
        s_delete: 0,
      })
      .select("_id")
      .lean();


    const allBoothIds =
      allBooths.map(
        (booth) => booth._id
      );


    // ==========================================
    // MEMBER COUNT
    // ==========================================

    const memberCount =
      await membersSchema.countDocuments({
        boothId: {
          $in: allBoothIds,
        },
        s_delete: 0,
      });


      console.log('allBoothIds', allBoothIds)
      console.log('memberCount', memberCount)

    // ==========================================
    // VILLAGE COUNT MAP
    // ==========================================

    const villageCountMap =
      new Map<string, number>();


    for (const village of villages) {

      const panjaythId =
        village.panjaythId.toString();

      villageCountMap.set(
        panjaythId,
        (villageCountMap.get(panjaythId) ?? 0) + 1
      );

    }


    // ==========================================
    // PANJAYATH RESPONSE
    // ==========================================

    const panjaythResponse =
      panjaythList.map(
        (panjayth: any) => {

          const panjaythId =
            panjayth._id.toString();

          return {
            _id: panjayth._id,
            name: panjayth.name,

            villageCount:
              villageCountMap.get(
                panjaythId
              ) ?? 0,
          };

        }
      );


    // ==========================================
    // STATISTICS
    // ==========================================

    const statistics = {

      panjayathCount:
        allPanjayaths.length,

      villageCount:
        allVillages.length,

      wardCount:
        allWards.length,

      pollingStationCount:
        allBooths.length,

      memberCount:
        memberCount,

    };


    // ==========================================
    // RESPONSE
    // ==========================================

    return ResponseBuilder.Success(
      1,
      "Homepage API",
      [
        {
          statistics,

          panjayaths: panjaythResponse,

          pagination: {
            limit: 10,
            nextCursor,
            hasNextPage,
          },
        },
      ]
    );


  } catch (error: any) {

    console.error(
      "Homepage API Error:",
      error
    );

    return ResponseBuilder.Failure(
      0,
      "Error in Fetching API",
      [
        error.message,
      ]
    );
  }
}
}
