import express from 'express'
import { UserController } from '../controller/user.controller.js'
import { uploadUserImage } from '../config/multer.js'
import { AuthClass } from '../middleware/auth.middleware.js';

const routerUser  = express.Router()
const controllerUser  = new UserController()
const authClass = new AuthClass()


routerUser.post(
  "/createUser",
  /* #swagger.tags = ['User']
  #swagger.parameters['userImage'] = { in:'formData', type:'file', required:false }
  #swagger.parameters['mobile'] = { in:'formData', type:'number', required:true }
  #swagger.parameters['password'] = { in:'formData', type:'string', required:true }
  #swagger.parameters['name'] = { in:'formData', type:'string', required:true }
  #swagger.parameters['role'] = { in:'formData', type:'string', required:true }
  #swagger.parameters['userRole'] = { in:'formData', type:'string', required:true }
  #swagger.parameters['accountAccessPrivilege] = { in:'formData', type:'string', required:true }
  #swagger.parameters['accountAccessModule'] = { in:'formData', type:'string', required:true }
  #swagger.parameters['panjaythIds'] = { in:'formData',type:'array',items:{ type:'string' },description:'Array of Panjayath ObjectIds'}
  */
  uploadUserImage,
  controllerUser.createUser
);

routerUser.post(
  "/loginUser",
  /*
  #swagger.tags = ['User']
  #swagger.parameters['body'] = {in:'body',schema:{"mobile":9789101866,password:"Daveram@123"}}
  */
 controllerUser.loginUser
)
routerUser.post(
  "/changePassword",
  /*
  #swagger.tags = ['User']
  #swagger.parameters['body'] = {in:'body',schema:{id:"objectId", oldPassword:"string", newPassword:"string"}}
  */
 controllerUser.changePassword
)

routerUser.post("/homepageApi",
  authClass.authMiddelware,
    //#swagger.tags = ['homepageApi']
    //#swagger.parameters['body'] = {in:'body',schema:{cursor:"dfhjk",search:"ERTYUI"}}
    controllerUser.homePageApi
)

routerUser.get("/getUser",


  authClass.authMiddelware,
    //#swagger.tags = ['User']
    controllerUser.getUser)


export default routerUser