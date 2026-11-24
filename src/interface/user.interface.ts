import { Schema } from "mongoose";

export interface IUser{
    id?:string,
    mobile:number,
    password:string,
    name:string,
    image:string,
    role:string,
    userRole:string,
    panjaythIds:Schema.Types.ObjectId[],
    s_delete : 0 ,
    accountAccessPrivilege:string,
    accountAccessModule:string,
    created_at:Date,
    updated_at:Date
}