import type{ RequestHandler } from "express";
import { WardService } from "../service/ward.Service.js";
import type{ IWard } from "../interface/ward.interface.js";
import { ResponseBuilder } from "../helper/ResponseFormate.js";

export class wardController{
    private wardService = new WardService()

    createWard:RequestHandler=async(req,res)=>{
        try {
            const data:IWard = req.body
            const create = await this.wardService.createWard(data)
            return res.status(200).json(create)
        } catch (error:any) {
            return res.status(400).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))
        }
    }

    getAllWards:RequestHandler = async(req,res)=>{
        try {
            const { villageId,cursor,name} = req.body
            const user = req.user
            const data = await this.wardService.getAllWards(user,villageId,cursor,name)
            return res.status(200).json(data)
        } catch (error:any) {
            return res.status(400).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))
        }
    }
}