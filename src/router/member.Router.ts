import express from "express";
import { memberController } from "../controller/members.controller.js";
import { uploadUserImage } from "../config/multer.js";
import { AuthClass } from "../middleware/auth.middleware.js";

const routerMembers = express.Router();
const controllerMember = new memberController();
const authClass = new AuthClass();

routerMembers.post(
  "/createMembers",
  /* #swagger.tags = ['Members']
   #swagger.parameters['body'] = {
     in:'body',
    schema:{
         _id:"ObjectId",
         gender:"Male",
         fullName:"John Doe",
         voterId:"ABC1234567",
         mobileNumber:"9876543210",
         email:"john@example.com",
        dateOfBirth:1785926780804,
         fatherName:"Robert",
         aadharNo:"123412341234",
         bloodGroup:"O+",
           maritalStatus :"String",

         educationId:"ObjectId",
         educationName:"B.E",
         workId:"ObjectId",
             workExpirence:"String",

         workName:"Software Engineer",
         religionId:"ObjectId",
         castId:"ObjectId",
         distictId:"ObjectId",
         assemblyConstituencyId:"ObjectId",
         panjaythId:"ObjectId",
         villageId:"ObjectId",
         wardId:"ObjectId",
   partNumber:"String",
         boothId:"ObjectId",
         pincode:600001,
         streetName:"Anna Salai",
         landMark_nearby:"Near Bus Stand",
         doorNumber_buildName:"12A, ABC Apartments",
         addressLine1:"No.12, Anna Salai",
         addressLine2:"Chennai",
         userImage:"image.jpg"
     }
   }, */
  uploadUserImage,
  authClass.authMiddelware,
  controllerMember.createMember,
);
// routerMembers.post(
//   "/getMembers",
//   authClass.authMiddelware,

//   /* #swagger.tags = ['Members']

//   #swagger.parameters['body'] = {
//     in: 'body',
//     required: true,
//     schema: {

//       search: "Aradhana",

//       cursor: "66a733aec325e4b269ed79f22",

//       gender: "Female",

//       fromAge: "18",
//       toAge: "60",

//       s_delete:0,

//     alphabeticalOrder:0,

//     inactivId:"ertyuiop",

//       relegionId: [
//         "6895f1d2c123456789abcdef",
//         "6895f1d2c123456789abcde1"
//       ],

//       castId: [
//         "6895f1d2c123456789abcdef",
//         "6895f1d2c123456789abcde1"
//       ],

//       educationId: [
//         "6895f1d2c123456789abcdef",
//         "6895f1d2c123456789abcde1"
//       ],

//       workId: [
//         "6895f1d2c123456789abcdef",
//         "6895f1d2c123456789abcde1"
//       ],

//       constituencyId: [
//         "6895f1d2c123456789abcdef",
//         "6895f1d2c123456789abcde1"
//       ],

//       panjaythId: [
//         "6895f1d2c123456789abcdef",
//         "6895f1d2c123456789abcde1"
//       ],

//       villageId: [
//         "6895f1d2c123456789abcdef",
//         "6895f1d2c123456789abcde1"
//       ],

//       wardId: [
//         "6895f1d2c123456789abcdef",
//         "6895f1d2c123456789abcde1"
//       ],

//       boothId: [
//         "6895f1d2c123456789abcdef",
//         "6895f1d2c123456789abcde1"
//       ]

//     }
//   }
//   */

//   controllerMember.getMembers,
// );


routerMembers.post(
  "/getMembers",
  authClass.authMiddelware,

  /* #swagger.tags = ['Members']

  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {

      search: "Aradhana",

      cursor: "66a733aec325e4b269ed79f22",

      gender: "Female",

      fromAge: "18",
      toAge: "60",

      s_delete:0,

      alphabeticalOrder:0,

      inactivId:"ertyuiop",

      fromDate: "2026-08-01",
      toDate: "2026-08-19",
      inactiveFomDate: "2026-08-01",
      inactiveToDate: "2026-08-19",

      updateDate: "2026-08-19",

      inactiveDate: "2026-08-19",

      relegionId: [
        "6895f1d2c123456789abcdef",
        "6895f1d2c123456789abcde1"
      ],

      castId: [
        "6895f1d2c123456789abcdef",
        "6895f1d2c123456789abcde1"
      ],

      educationId: [
        "6895f1d2c123456789abcdef",
        "6895f1d2c123456789abcde1"
      ],

      workId: [
        "6895f1d2c123456789abcdef",
        "6895f1d2c123456789abcde1"
      ],

      constituencyId: [
        "6895f1d2c123456789abcdef",
        "6895f1d2c123456789abcde1"
      ],

      panjaythId: [
        "6895f1d2c123456789abcdef",
        "6895f1d2c123456789abcde1"
      ],

      villageId: [
        "6895f1d2c123456789abcdef",
        "6895f1d2c123456789abcde1"
      ],

      wardId: [
        "6895f1d2c123456789abcdef",
        "6895f1d2c123456789abcde1"
      ],

      boothId: [
        "6895f1d2c123456789abcdef",
        "6895f1d2c123456789abcde1"
      ]

    }
  }
  */

  controllerMember.getMembers,
);
routerMembers.post(
  "/createEducation",
  //#swagger.tags = ['Education']
  //#swagger.parameters['body'] = {in:'body',schema:{ _id:"Schema.Types.ObjectId",name:"string",}}
  controllerMember.createEducation,
);
routerMembers.post(
  "/getEducation",
  //#swagger.tags = ['Education']
  //#swagger.parameters['body'] = {in:'body',schema:{ cursor:"ObjectId",searchKey:"rtyuio"}}
  authClass.authMiddelware,
  controllerMember.getEducation,
);

routerMembers.post(
  "/createWork",
  //#swagger.tags = ['Work']
  //#swagger.parameters['body'] = {in:'body',schema:{ _id:"Schema.Types.ObjectId",name:"string",}}
  controllerMember.createWork,
);

routerMembers.post(
  "/getWork",
  //#swagger.tags = ['Work']
  //#swagger.parameters['body'] = {in:'body',schema:{ cursor:"ObjectId",searchKey:"rtyuiop"}}
  controllerMember.getWork,
);

routerMembers.post(
  "/createReligion",
  //#swagger.tags = ['Religion']
  //#swagger.parameters['body'] = {in:'body',schema:{ _id:"Schema.Types.ObjectId",name:"string",}}
  controllerMember.createReligion,
);

routerMembers.post(
  "/getReligion",
  //#swagger.tags = ['Religion']
  //#swagger.parameters['body'] = {in:'body',schema:{ cursor:"ObjectId",searchKey:"rtyuiopl"}}
  controllerMember.getReligion,
);
routerMembers.post(
  "/createCaste",
  //#swagger.tags = ['Caste']
  //#swagger.parameters['body'] = {in:'body',schema:{ _id:"Schema.Types.ObjectId",name:"string",}}
  controllerMember.createCaste,
);

routerMembers.post(
  "/getCaste",
  //#swagger.tags = ['Caste']
  //#swagger.parameters['body'] = {in:'body',schema:{ cursor:"ObjectId",searchKey:"ertyuikol"}}
  controllerMember.getCaste,
);

routerMembers.post(
  "/createInactive",
  //#swagger.tags = ['Inactive']
  //#swagger.parameters['body'] = {in:'body',schema:{ _id:"Schema.Types.ObjectId",name:"string",}}
  controllerMember.createInactive,
);

routerMembers.post(
  "/getInactive",
  //#swagger.tags = ['Inactive']
  //#swagger.parameters['body'] = {in:'body',schema:{ cursor:"ObjectId"}}
  controllerMember.getInactive,
);

routerMembers.post(
   "/markAsInActive",
   authClass.authMiddelware,
   //#swagger.tags = ['Members']
   //#swagger.parameters['body'] = {in:'body',schema:{  id:"Schema.Types.ObjectId",inactivId:"Schema.Types.ObjectId",otherInactiveReason:"string",inactive_date:123456789,inactive_description:"String"}}
   controllerMember.markAsInActive

)

routerMembers.post(
   "/getInactiveById",
   //#swagger.tags = ['Members']
   //#swagger.parameters['body'] = {in:'body',schema:{  id:"Schema.Types.ObjectId"}}
   controllerMember.getInactiveById

)
routerMembers.post(
   "/getLast10DaysActivity",
   //#swagger.tags = ['Members']
   authClass.authMiddelware,
   controllerMember.getLast10DaysActivity

)


routerMembers.post(
  "/member-activity",
  /* #swagger.tags = ['Members']
  #swagger.parameters['body'] = {
    in: 'body',
    schema: {
      page: 1,
      limit: 10
    }
}*/
authClass.authMiddelware,
  controllerMember.getMemberActivity
);


export default routerMembers;
