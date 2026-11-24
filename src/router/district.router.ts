import { Router } from "express";
import { DistrictController } from "../controller/district.controller.js";

const routerDistrict = Router()
const controllerDistrict = new DistrictController()

routerDistrict.post("/createDistrict",
    /**
      #swagger.tags = ['District']
      #swagger.parameters['body'] = {in:'body',schema:{_id:"ObjectId",name:"string",s_delete:0}}
     */
    controllerDistrict.createDistrict
)
routerDistrict.post("/getDistrict",
    /**
      #swagger.tags = ['District']
      */
    controllerDistrict.getDistrict
)


export default routerDistrict