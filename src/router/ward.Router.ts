import express from 'express'
import { wardController } from '../controller/ward.controller.js'
import { AuthClass } from '../middleware/auth.middleware.js';

const routerWard = express.Router()
const contollerWard = new wardController()
const authClass = new  AuthClass();

routerWard.post("/createWard",
    //#swagger.tags =['Ward']
    //#swagger.parameters['body'] = {in:'body',schema:{_id:"string",name:"string",villageId:"objectId"}}
    contollerWard.createWard
)

routerWard.post("/getAllWard",
    authClass.authMiddelware,
    //#swagger.tags = ['Ward']
    //#swagger.parameters['body'] = {in:'body',schema:{villageId:"RTYUIO",cursor:"edrfhjk",name:"rtyui"}}
    contollerWard.getAllWards
)

export default routerWard