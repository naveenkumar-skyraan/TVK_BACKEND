import type{ RequestHandler } from "express";
import { ResponseBuilder } from "../helper/ResponseFormate.js";
import type { IConstituency } from "../interface/constituency.interface.js";
import { ConstituencyService } from "../service/constituency.Service.js";
import type { IDistrict } from "../interface/district.interface.js";

export class ConstituencyController{
    private constituencyService = new ConstituencyService()

    createConstituency:RequestHandler=async(req,res)=>{
        try {
            const data:IConstituency = req.body
            const create = await this.constituencyService.createConstituency(data)
            return res.status(200).json(create)
        } catch (error:any) {
            return res.status(400).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))
        }
    }

    getAllConstituency:RequestHandler = async(req,res)=>{
        try {
            const {districtId,objectId,name} = req.body 
            const response = await this.constituencyService.getAllConstituency(districtId,objectId,name)
            return res.status(200).json(response)
        } catch (error:any) {
            return res.status(400).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))
        }
    }

    createHierarchy:RequestHandler = async(req,res)=>{
        try {
            const data:IDistrict = req.body
            const create = await this.constituencyService.createhierarchy(data)
            return res.status(200).json(create)
        } catch (error:any) {
            return res.status(400).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))
        }
    }

    getAllHierarchy:RequestHandler=async(req,res)=>{
        try {
            const data  = await this.constituencyService.getAllHieraechy()
            return res.status(200).json(data)
        } catch (error:any) {
            return res.status(400).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))
        }
    }
}