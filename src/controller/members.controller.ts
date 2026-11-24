import type{ RequestHandler } from "express";
import { MemberService } from "../service/member.Service.js";
import type{ ICaste, IEducationQualification, Iinactive, ImarkAsInactive, IMemberFilter, IMembers, IReligion, IWork } from "../interface/member.js";
import { ResponseBuilder } from "../helper/ResponseFormate.js";
import mongoose, { Schema } from "mongoose";

export class memberController {
  private memberService = new MemberService();

  // createMember: RequestHandler = async (req, res) => {
  //   try {
  //     const data: IMembers = req.body;
  //     const user = req.user

  //     if (req.files && "userImage" in req.files) {
  //       const files = req.files as {
  //         [fieldname: string]: Express.Multer.File[];
  //       };

  //       if (files.userImage?.length) {
  //         data.profilepic = files?.userImage[0].filename;
  //       }
  //     }


  //     const create = await this.memberService.createMember(data,user);
  //     return res.status(200).json(create);
  //   } catch (error: any) {
  //     return res.status(400).json(ResponseBuilder.Failure(0, "Internal Server Error", [error.message]));
  //   }
  // };

createMember: RequestHandler = async (req, res) => {
  try {
    const data: IMembers = req.body;
    const user = req.user;

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    // New image uploaded
    if (files?.userImage?.length) {
      data.profilepic = files.userImage[0].filename;
    }
    // userImage is explicitly empty -> remove image
    else if (data.userImage === "") {
      data.profilepic = null;
    }

    const create = await this.memberService.createMember(data, user);

    return res.status(200).json(create);
  } catch (error: any) {
    return res
      .status(400)
      .json(
        ResponseBuilder.Failure(0, "Internal Server Error", [error.message])
      );
  }
};

  getMembers:RequestHandler = async(req,res)=>{
    try {
      const filter:IMemberFilter = req.body
      const {cursor,search} = req.body
      const user = req.user
      const data  = await this.memberService.getMembers(user,filter,cursor,search)
      return res.status(200).json(data)
    } catch (error:any) {
      return res.status(400).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))
    }
  }

  createEducation:RequestHandler = async(req,res)=>{
    try {
      const payload:IEducationQualification = req.body
      const data  = await this.memberService.createEducation(payload)
      return res.status(200).json(data)
    } catch (error:any) {
      return res.status(400).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))
    }
  }

  getEducation:RequestHandler = async(req,res)=>{
    try {
      const {cursor,searchKey} = req.body
      const data  = await this.memberService.getEducation(cursor,searchKey)
      return res.status(200).json(data)
    } catch (error:any) {
      return res.status(400).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))
    }
  }

  createWork:RequestHandler = async(req,res)=>{
    try {
      const payload:IWork = req.body
      const data = await this.memberService.createWork(payload)
      return res.status(200).json(data)
    } catch (error:any) {
      return res.status(500).json(ResponseBuilder.Failure(0,"INternal Server Error",[error.message]))
    }
  }


  getWork:RequestHandler = async(req,res)=>{
    try {
      const {cursor,searchKey} = req.body
      const data = await this.memberService.getWork(cursor,searchKey)
      return res.status(200).json(data)
    } catch (error:any) {
      return res.status(500).json(ResponseBuilder.Failure(0,"Internal Server Eror",[error.message]))
    }
  }

  createReligion:RequestHandler = async(req,res)=>{
    try {
      const payload:IReligion = req.body;
      const data  = await this.memberService.createReligion(payload)
      return res.status(200).json(data)
    } catch (error:any) {
      return res.status(500).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))
    }
  }

  getReligion:RequestHandler = async(req,res)=>{
    try {
      const {cursor,searchKey} = req.body
      const data = await this.memberService.getReligion(cursor,searchKey)
      return res.status(200).json(data)
    } catch (error:any) {
      return res.status(500).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))
    }
  }


  createCaste:RequestHandler = async(req,res)=>{
    try {
      const payload:ICaste = req.body
      const data = await this.memberService.createCaste(payload)
      return res.status(200).json(data)
    } catch (error:any) {
      return res.status(500).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))
    }
  }


  getCaste:RequestHandler = async(req,res)=>{
    try {
      const {cursor,searchKey} = req.body
      const data = await this.memberService.getCaste(cursor,searchKey)
      return res.status(200).json(data)
    } catch (error:any) {
      return res.status(500).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))
    }
  }

  createInactive:RequestHandler = async(req,res)=>{
    try {
      const payload:Iinactive = req.body
      const data = await this.memberService.createInactive(payload)
      return res.status(200).json(data)
    } catch (error:any) {
      return res.status(500).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))
    }
  }


  getInactive:RequestHandler = async(req,res)=>{
    try {
      const {cursor} = req.body
      const data = await this.memberService.getInactive(cursor)
      return res.status(200).json(data)
    } catch (error:any) {
      return res.status(500).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))
    }
  }


  markAsInActive:RequestHandler = async(req,res)=>{
    try {
      const data:ImarkAsInactive = req.body
      const user  = req.user
      const create  =  await this.memberService.markAsInActive(data,user)
      return res.status(200).json(create)
     } catch (error:any) {
            return res.status(500).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))

    }
  }

  getInactiveById:RequestHandler = async(req,res)=>{
    try {
      const {id} = req.body
      const data = await this.memberService.getInactiveById(id)
      return res.status(200).json(data)
    } catch (error:any) {
                  return res.status(500).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))

    }
  }
 getLast10DaysActivity:RequestHandler = async(req,res)=>{
    try {

      const id  = req.user.id
      const data = await this.memberService.getLast10DaysActivity(id)
      return res.status(200).json(data)
    } catch (error:any) {
                  return res.status(500).json(ResponseBuilder.Failure(0,"Internal Server Error",[error.message]))

    }
  }


getMemberActivity: RequestHandler = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.user.id);

    const { page = 1, limit = 10 } = req.body;

    const data =
      await this.memberService.getMemberActivity(
        id,
        Number(page),
        Number(limit)
      );

    return res.status(200).json(data);
  } catch (error: any) {
    return res
      .status(500)
      .json(
        ResponseBuilder.Failure(
          0,
          "Internal Server Error",
          [error.message]
        )
      );
  }
};


}
