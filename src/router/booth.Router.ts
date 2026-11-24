import express from 'express'
import { boothController } from '../controller/booth.controller.js'
import { AuthClass } from '../middleware/auth.middleware.js';

const routerBooth = express.Router()
const controllerBooth = new boothController()
const authClass = new AuthClass()

routerBooth.post("/createBooth",
    //#swagger.tags = ['Booth']
    //#swagger.parameters['body'] = {in:'body',schema:{wardId:"String",boothNumber:"String",boothLocation:"string",boothName:"String"}}
    controllerBooth.createBooth
)

routerBooth.post("/getAllBooth",
    authClass.authMiddelware,
    //#swagger.tags = ['Booth']
    //#swagger.parameters['body'] = {in:'body',schema:{wardId:"dfghjkl;",cursor:"dfghjkl;",name:"ertyuiop"}}
    controllerBooth.getAllBooth
)

export default routerBooth