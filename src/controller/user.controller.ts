import type{ RequestHandler } from "express";
import { userService } from "../service/user.Service.js";
import type{ IUser } from "../interface/user.interface.js";
import { ResponseBuilder } from "../helper/ResponseFormate.js";
import mongoose from "mongoose";
export class UserController {
  private UserService = new userService();

  // createUser: RequestHandler = async (req, res) => {
  //   try {
  //     const data: IUser = req.body;

  //     if (req.files && "thumbnail" in req.files) {
  //       const files = req.files as {
  //         [fieldname: string]: Express.Multer.File[];
  //       };

  //       if (files.profilepic?.length) {
  //         data.image = files.profilepic[0].filename;
  //       }
  //     }

  //     const create = await this.UserService.createUser(data);
  //     return res.status(200).json(create);
  //   } catch (error: any) {
  //     return res
  //       .status(400)
  //       .json(
  //         ResponseBuilder.Failure(0, "Internal Server Error", [error.message]),
  //       );
  //   }
  // };


  createUser: RequestHandler = async (req, res) => {
  try {
    const data: IUser = req.body;

    // 👇 Convert comma-separated string to ObjectId array
    if (typeof req.body.panjaythIds === "string") {
      data.panjaythIds = req.body.panjaythIds.split(",").map((id: string) => new mongoose.Types.ObjectId(id.trim()));
    }

    if (req.files && "userImage" in req.files) {
      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      if (files.userImage?.length) {
        data.image = files.userImage[0].filename;
      }
    }

    const create = await this.UserService.createUser(data);
    return res.status(200).json(create);
  } catch (error: any) {
    console.log('error', error)
    return res.status(400).json(
      ResponseBuilder.Failure(0, "Internal Server Error", [error.message]),
    );
  }
  };


  loginUser:RequestHandler = async(req,res)=>{
  try {
    const payload:IUser = req.body;
    const userData = await this.UserService.loginUser(payload)
    return res.status(200).json(userData)
  } catch (error:any) {
    return ResponseBuilder.Failure(0,"Internal Server Error",[error.message])
  }
  }

changePassword: RequestHandler = async (req, res) => {
  try {
    const { id, oldPassword, newPassword } = req.body;

    const result = await this.UserService.changePassword(
      id,
      oldPassword,
      newPassword
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      status: 0,
      message: "Internal Server Error",
      data: [error.message],
    });
  }
};


  homePageApi:RequestHandler = async(req,res)=>{
    try {
      const userData = req.user
      const {cursor,search} = req.body
      const data  = await this.UserService.homepageApi(userData,cursor,search)
      return res.status(200).json(data)
    } catch (error:any) {
      return res.status(400).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))
    }
  }

  getUser:RequestHandler = async(req,res)=>{
    try {
      const userData = req.user
      // const {cursor,search} = req.body
      const data  = await this.UserService.getUser(userData.id)
      return res.status(200).json(data)
    } catch (error:any) {
      return res.status(400).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))
    }
  }



}
