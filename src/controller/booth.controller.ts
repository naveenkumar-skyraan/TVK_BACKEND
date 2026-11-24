import type{ RequestHandler } from "express";
import { boothService } from "../service/booth.service.js";
import type{ IBooth } from "../interface/booth.interface.js";
import { ResponseBuilder } from "../helper/ResponseFormate.js";

export class boothController {
  private boothService = new boothService();

  createBooth:RequestHandler = async (req, res) => {
    try {
      const data: IBooth = req.body;
      const create = await this.boothService.createBooth(data);
      return res.status(200).json(create);
    } catch (error: any) {
      return res.status(400).json(ResponseBuilder.Failure(0, "Internal Server Error", [error.message]));
      
    }
  };

  getAllBooth:RequestHandler = async(req,res)=>{
    try {
        const {wardId,cursor,name} = req.body
        const user = req.user
        const getAllBooth = await this.boothService.getAllBooth(user,wardId,cursor,name)
        return res.status(200).json(getAllBooth)
    } catch (error:any) {
      return res.status(400).json(ResponseBuilder.Failure(0, "Internal Server Error", [error.message]));
    }
  }

}
