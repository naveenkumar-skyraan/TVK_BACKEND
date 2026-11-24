import { ResponseBuilder, type ResponseFormate } from "../helper/ResponseFormate.js";
import type { IDistrict } from "../interface/district.interface.js";
import districtSchema from "../model/district.schema.js";

export class DistrictService{
    async createDistrict(data:IDistrict):Promise<ResponseFormate>{
        try {
            if(data._id){                
            const update = await districtSchema.findOneAndUpdate({ _id: data._id },data)
            return ResponseBuilder.Success(1,"The Value is Updated",[update])
            }
            const create =  await districtSchema.create(data)
            return ResponseBuilder.Success(1,"The Value is Created",[create])
        } catch (error:any) {
            return ResponseBuilder.Failure(0,"Error in Creatung thr Value",[error.message])
        }
    }

    async getDistrict():Promise<ResponseFormate>{
        try {
            const data = await districtSchema.find({ s_delete: 0})
            return ResponseBuilder.Success(1,"The District List",data)
        } catch (error:any) {
            return ResponseBuilder.Failure(0,"Erro in f",[error.message])
        }
    }
}