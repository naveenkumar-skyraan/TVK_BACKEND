import type { RequestHandler } from "express";
import type { Ipanjayth } from "../interface/panjayath.interface.js";
import { ResponseBuilder } from "../helper/ResponseFormate.js";
import { PanjaythService } from "../service/panjayth.service.js";

export class PanjaythController {
  private panjaythService = new PanjaythService();

  createPanjayth: RequestHandler = async (req, res) => {
    try {
      const data: Ipanjayth = req.body;

      const result = await this.panjaythService.createPanjayth(data);

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json(
          ResponseBuilder.Failure(0, "Internal Server Error", [error.message]),
        );
    }
  };

  getAllPanjayth: RequestHandler = async (req, res) => {
      try {

        const userData = req.user
        const {constituencyId,name,cursor} = req.body
      const result = await this.panjaythService.getAllPanjayth(userData,constituencyId,name,cursor);

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json(
          ResponseBuilder.Failure(0, "Internal Server Error", [error.message]),
        );
    }
  };

  getPanjaythById: RequestHandler = async (req, res) => {
    try {
      const { id } = req.body;

      const result = await this.panjaythService.getPanjaythById(id);

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json(
          ResponseBuilder.Failure(0, "Internal Server Error", [error.message]),
        );
    }
  };

  deletePanjayth: RequestHandler = async (req, res) => {
    try {
      const { id } = req.body;

      const result = await this.panjaythService.deletePanjayth(id);

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json(
          ResponseBuilder.Failure(0, "Internal Server Error", [error.message]),
        );
    }
  };
}
