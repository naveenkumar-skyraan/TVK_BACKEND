import type { RequestHandler } from "express";
import { DistrictService } from "../service/district.service.js";
import type { IDistrict } from "../interface/district.interface.js";
import { ResponseBuilder } from "../helper/ResponseFormate.js";

export class DistrictController{
    private districtService = new DistrictService()


    createDistrict:RequestHandler = async(req,res)=>{
        try {
            const data:IDistrict = req.body;
            const create = await this.districtService.createDistrict(data)
            return res.status(200).json(create)
        } catch (error:any) {
            return res.status(500).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))
        }
    }
    getDistrict:RequestHandler = async(req,res)=>{
        try {
            const create = await this.districtService.getDistrict()
            return res.status(200).json(create)
        } catch (error:any) {
            return res.status(500).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))
        }
    }

}