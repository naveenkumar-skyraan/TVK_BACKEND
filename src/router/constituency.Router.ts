import express from "express";
import { ConstituencyController } from "../controller/constituency.controller.js";

const routerConstituency = express.Router();
const controllerConstituency = new ConstituencyController();

routerConstituency.post(
  "/createConstituency",
  //#swagger.tags = ['Constituency']
  //#swagger.parameters['body'] = {in:'body',schema:{_id:"string",name:"string",districtId:"string"}}
  controllerConstituency.createConstituency,
);

routerConstituency.post(
  "/getAllConstituency",
  //#swagger.tags = ['Constituency']
  //#swagger.parameters['body'] = {in:'body',schema:{districtId:"objectId",objectId:"string",name:"string"}}
  controllerConstituency.getAllConstituency,
);



// routerConstituency.post(
//   "/createHierarchy",
//   //#swagger.tags = ['Hierarchy']
//   //#swagger.parameters['body'] = {in:'body',schema:{_id:"string",name:"string"}}
//   controllerConstituency.createHierarchy,
// );

// routerConstituency.post(
//   "/getAllHierarchy",
//   //#swagger.tags = ['Hierarchy']
//   controllerConstituency.getAllHierarchy,
// );

export default routerConstituency;
