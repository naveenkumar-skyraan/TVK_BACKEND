import type { RequestHandler } from "express";
import { VillageService } from "../service/village.service.js";
import type { Ivillage } from "../interface/village.interface.js";
import { ResponseBuilder } from "../helper/ResponseFormate.js";

export class VillageController {
  private villageService = new VillageService();

  createVillage: RequestHandler = async (req, res) => {
    try {
      const data: Ivillage = req.body;

      const result = await this.villageService.create(data);

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json(ResponseBuilder.Failure(0, "Internal Server Error", [error.message]));
    }
  };

  getVillages: RequestHandler = async (req, res) => {
    try {
      const {panjaythIds,name,cursor} = req.body
      const user = req.user
      const result = await this.villageService.getAll(user,panjaythIds, name,cursor);

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json(ResponseBuilder.Failure(0, "Internal Server Error", [error.message]));
    }
  };

  getVillageById: RequestHandler = async (req, res) => {
    try {
      const { id } = req.body;

      const result = await this.villageService.getById(id);

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json(ResponseBuilder.Failure(0, "Internal Server Error", [error.message]));
    }
  };

  deleteVillage: RequestHandler = async (req, res) => {
    try {
      const { id } = req.body;

      const result = await this.villageService.delete(id);

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json(ResponseBuilder.Failure(0, "Internal Server Error", [error.message]));
    }
  };
}
