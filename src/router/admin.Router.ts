import express from "express";
import { AdminController } from "../controller/admin.controller.js";
import { AuthClass } from "../middleware/auth.middleware.js";
import { uploadCasteFile } from "../config/casteUpload.js";
import type { RequestHandler } from "express";

const routerAdmin = express.Router();

const controllerAdmin = new AdminController();


const authClass = new AuthClass();
const requireAdmin: RequestHandler = (req, res, next) => {
    if (req.user?.role !== "Admin") {
        return res.status(403).json({
            status: 0,
            message: "Admin access is required",
            data: [],
        });
    }
    next();
};


// =====================================================
// District
// =====================================================
routerAdmin.post(
    "/getAllDistrict",

    //#swagger.tags = ['Admin']

    //#swagger.parameters['body'] = {  in: 'body',  required: false,  schema: {      search: "chennai",      limit: 10,     offset: 0  }}
    controllerAdmin.getAllDistrict
);


// =====================================================
// Constituency
// =====================================================
routerAdmin.post(
    "/getAllConstituency",

    //#swagger.tags = ['Admin']

    //#swagger.parameters['body'] = {  in: 'body',  required: false,  schema: {      districtId: "string",search: "chennai",limit: 10,offset: 0  }}

    controllerAdmin.getAllConstituency
);


// =====================================================
// Panjayath
// =====================================================
routerAdmin.post(
    "/getAllPanjayth",

    //#swagger.tags = ['Admin']

    //#swagger.parameters['body'] = {  in: 'body',required: false,schema: {constituencyId: "string",search: "chennai",limit: 10,offset: 0}}

    controllerAdmin.getAllPanjayth
);


// =====================================================
// Village
// =====================================================
routerAdmin.post(
    "/getAllVillage",

    //#swagger.tags = ['Admin']

    //#swagger.parameters['body'] = {in: 'body',required: false,schema: {panjaythId: "string",search: "chennai",limit: 10,offset: 0 }}

    controllerAdmin.getAllVillage
);


// =====================================================
// Member
// =====================================================
routerAdmin.post(
    "/getAllMember",

    //#swagger.tags = ['Admin']

    //#swagger.parameters['body'] = {in: 'body',required: false,schema: {limit: 10,offset: 0}}

    controllerAdmin.getAllMember
);


// =====================================================
// Ward
// =====================================================
routerAdmin.post(
    "/getAllWard",

    //#swagger.tags = ['Admin']

    //#swagger.parameters['body'] = {in: 'body',required: false,schema: {villageId: "string",search: "1",limit: 10,offset: 0}}

    controllerAdmin.getAllWard
);


// =====================================================
// Booth
// =====================================================
routerAdmin.post(
    "/getAllBooth",

    //#swagger.tags = ['Admin']

    //#swagger.parameters['body'] = {in: 'body',required: false,schema: {wardId: "string",search: "1",limit: 10,offset: 0}}

    controllerAdmin.getAllBooth
);


// =====================================================
// Education
// =====================================================
routerAdmin.post(
    "/getAllEducation",

    //#swagger.tags = ['Admin']

    //#swagger.parameters['body'] = {in: 'body',required: false,schema: {search: "Engineering",limit: 10,offset: 0 }}

    controllerAdmin.getAllEducation
);


// =====================================================
// Work
// =====================================================
routerAdmin.post(
    "/getAllWork",

    //#swagger.tags = ['Admin']

    //#swagger.parameters['body'] = {in: 'body',required: false,schema: {search: "Teacher",limit: 10,offset: 0}}

    controllerAdmin.getAllWork
);


// =====================================================
// Religion
// =====================================================
routerAdmin.post(
    "/getAllReligion",

    //#swagger.tags = ['Admin']

    //#swagger.parameters['body'] = {in: 'body',required: false,schema: {search: "Hindu",limit: 10,offset: 0 }}

    controllerAdmin.getAllReligion
);


// =====================================================
// Caste
// =====================================================
routerAdmin.post(
    "/getAllCaste",

    //#swagger.tags = ['Admin']

    //#swagger.parameters['body'] = {in: 'body',required: false,schema: {search: "BC",searchTerm: "Mannan",limit: 10,offset: 0,cursor: null}}

    controllerAdmin.getAllCaste
);

// =====================================================
// Caste Bulk Upload - Admin
// =====================================================

routerAdmin.get(
    "/downloadCasteTemplate",

    //#swagger.tags = ['Admin']
    //#swagger.description = 'Download the caste CSV upload template'

    authClass.authMiddelware,
    requireAdmin,
    controllerAdmin.downloadCasteTemplate
);

routerAdmin.post(
    "/bulkUploadCaste",

    //#swagger.tags = ['Admin']
    //#swagger.description = 'Bulk upload caste records'

    authClass.authMiddelware,
    requireAdmin,
    uploadCasteFile,
    controllerAdmin.bulkUploadCaste
);


// =====================================================
// Inactive
// =====================================================
routerAdmin.post(
    "/getAllInactive",

    //#swagger.tags = ['Admin']

    //#swagger.parameters['body'] = {in: 'body',required: false,schema: {search: "reason",limit: 10,offset: 0}}

    controllerAdmin.getAllInactive
);

// =====================================================
// Users
// =====================================================
routerAdmin.post(
    "/getAllUsers",

    //#swagger.tags = ['Admin']

    //#swagger.parameters['body'] = {in: 'body',required: false,schema: {search: "name",role:"Admin",limit: 10,offset: 0}}

    controllerAdmin.getAllUsers
);

export default routerAdmin;