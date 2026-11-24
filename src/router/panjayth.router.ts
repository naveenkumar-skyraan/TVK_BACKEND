import express from "express";
import { PanjaythController } from "../controller/panjayath.controller.js";
import { AuthClass } from "../middleware/auth.middleware.js";

const routerPanjayth = express.Router();

const controllerPanjayth = new PanjaythController();
const authClass = new AuthClass()

routerPanjayth.post(
    "/createPanjayth",
    //#swagger.tags = ['Panjayth']
    //#swagger.parameters['body'] = {in:'body',schema:{_id:"ObjectId",constituencyId:"ObjectId",name:"string"}}
    controllerPanjayth.createPanjayth
);


routerPanjayth.post(
    "/getPanjayth",
    authClass.authMiddelware,
    //#swagger.tags = ['Panjayth']
    //#swagger.parameters['body'] = {in:'body',schema:{constituencyId:"ObjectId",name:"string",cursor:"ertyui"}}
    controllerPanjayth.getAllPanjayth
);


routerPanjayth.post(
    "/getPanjaythById",
    //#swagger.tags = ['Panjayth']
    //#swagger.parameters['body'] = {in:'body',schema:{_id:"ObjectId"}}
    controllerPanjayth.getPanjaythById
);


routerPanjayth.post(
    "/deletePanjayth",
    //#swagger.tags = ['Panjayth']
    //#swagger.parameters['body'] = {in:'body',schema:{_id:"ObjectId"}}
    controllerPanjayth.deletePanjayth
);


export default routerPanjayth;