import express from "express"
import { VillageController } from "../controller/village.controller.js";
import { AuthClass } from "../middleware/auth.middleware.js";

const routerVillage = express.Router()
const controllerVillage  = new VillageController()
const authClass = new AuthClass();

routerVillage.post(
    "/createVillage",
    //#swagger.tags = ['Village']
    //#swagger.parameters['body'] = {in:'body',schema:{_id:"ObjectId",panjaythId:"ObjectId",name:"string"}}
    controllerVillage.createVillage
);


routerVillage.post(
    "/getVillage",
    authClass.authMiddelware,
    //#swagger.tags = ['Village']
    //#swagger.parameters['body'] = {in:'body',schema:{panjaythIds:"ObjectId",name:"string",cursor:"string"}}
    controllerVillage.getVillages
);


routerVillage.post(
    "/getVillageById",
    authClass.authMiddelware,
    //#swagger.tags = ['Village']
    //#swagger.parameters['body'] = {in:'body',schema:{id:"ObjectId"}}
    controllerVillage.getVillageById
);


routerVillage.post(
    "/deleteVillage",
    //#swagger.tags = ['Village']
    //#swagger.parameters['body'] = {in:'body',schema:{id:"ObjectId"}}
    controllerVillage.deleteVillage
);


export default routerVillage;