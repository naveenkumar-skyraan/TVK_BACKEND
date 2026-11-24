import mongoose from "mongoose";
import { ResponseBuilder, type ResponseFormate  } from "../helper/ResponseFormate.js";
import hierarchySchema from "../model/hierarchy.schema.js";
import type { IConstituency } from "../interface/constituency.interface.js";
import constituencySchema from "../model/constituency.schema.js";
import type { IDistrict } from "../interface/district.interface.js";

export class ConstituencyService {


 async createConstituency(data: IConstituency): Promise<ResponseFormate> {
  try {
    // Update
    if (data._id) {
      const { _id, ...updateData } = data;

      const update = await constituencySchema.findByIdAndUpdate(
        _id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

      // ID exists but document not found
      if (!update) {
        return ResponseBuilder.Failure(0,"Constituency not found",[]);
      }

      return ResponseBuilder.Success(1,"The Constituency is Updated",[update]);
    }

    // Create
    const create = await constituencySchema.create(data);

    return ResponseBuilder.Success(1,"The Constituency is Created",[create]);

  } catch (error: any) {
    return ResponseBuilder.Failure(0,
      data._id
        ? "Error in Updating the Constituency"
        : "Error in Creating the Constituency",
      [error.message]
    );
  }
}

  
  async getAllConstituency(districtId?: string,objectId?: string,name?: string): Promise<ResponseFormate> {
  try {
    const query: any = {
       s_delete: 0,
    };

    if (districtId) {
      query.districtId = new mongoose.Types.ObjectId(districtId);
    }

    if (objectId) {
      query._id = { $gt: new mongoose.Types.ObjectId(objectId) };
    }

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    const data = await constituencySchema
      .find(query)
      .sort({ _id: -1 })
      .limit(10)
      .select("-s_delete -created_at -updated_at -__v")
      .lean();

    return ResponseBuilder.Success(1, "The Divisions Fetched", data);
  } catch (error: any) {
    return ResponseBuilder.Failure(0, "Error in Fetching the Data", [
      error.message,
    ]);
  }
}
  

  async createhierarchy(data:IDistrict):Promise<ResponseFormate>{
    try {
      if(data._id){
        const update  = await hierarchySchema.findByIdAndUpdate(
            data._id,
            data,
            {new:true}
        )
        return ResponseBuilder.Success(1,"The value is Updated",[update])
      }else{
        const create = await hierarchySchema.create(data)
        return ResponseBuilder.Success(1,"The Value is Created",[create])

      }
    } catch (error:any) {
      return ResponseBuilder.Failure(0,data._id ? "There is an Error in Updaring":"There is an Error in Creating",[error.message])
    }
  }

  async getAllHieraechy():Promise<ResponseFormate>{
    try {
      const data  =  await hierarchySchema.find({ s_delete: 0})
      return ResponseBuilder.Success(1,"The Values Fetched",data)
    } catch (error:any) {
      return ResponseBuilder.Failure(0,"Error in Fetching the Value",[error.message])
    }
  }
}
