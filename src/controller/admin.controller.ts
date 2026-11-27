
import type { RequestHandler } from "express";
import { AdminService } from "../service/Admin.service.js";
import { ResponseBuilder } from "../helper/ResponseFormate.js";
import { CasteBulkUploadService } from "../service/casteBulkUpload.service.js";

export class AdminController {

    private adminService = new AdminService();
    private casteBulkUploadService = new CasteBulkUploadService();


    // District
    getAllDistrict: RequestHandler = async (req, res) => {
        try {
            const {
                search,
                limit = 10,
                offset = 0
            } = req.body;

            const data = await this.adminService.dristricList(
                search,
                Number(limit),
                Number(offset)
            );

            return res.status(200).json(data);

        } catch (error: any) {
            return res.status(400).json(
                ResponseBuilder.Failure(
                    0,
                    "Internal Server Error",
                    [error.message]
                )
            );
        }
    };


    // Constituency
    getAllConstituency: RequestHandler = async (req, res) => {
        try {
            const {
                districtId,
                search,
                limit = 10,
                offset = 0
            } = req.body;

            const data = await this.adminService.constituencyList(
                districtId,
                search,
                Number(limit),
                Number(offset)
            );

            return res.status(200).json(data);

        } catch (error: any) {
            return res.status(400).json(
                ResponseBuilder.Failure(
                    0,
                    "Internal Server Error",
                    [error.message]
                )
            );
        }
    };


    // Panjayath
    getAllPanjayth: RequestHandler = async (req, res) => {
        try {
            const {
                constituencyId,
                search,
                limit = 10,
                offset = 0
            } = req.body;

            const data = await this.adminService.panjaythList(
                constituencyId,
                search,
                Number(limit),
                Number(offset)
            );

            return res.status(200).json(data);

        } catch (error: any) {
            return res.status(400).json(
                ResponseBuilder.Failure(
                    0,
                    "Internal Server Error",
                    [error.message]
                )
            );
        }
    };


    // Village
    getAllVillage: RequestHandler = async (req, res) => {
        try {
            const {
                panjaythId,
                search,
                limit = 10,
                offset = 0
            } = req.body;

            const data = await this.adminService.villageList(
                panjaythId,
                search,
                Number(limit),
                Number(offset)
            );

            return res.status(200).json(data);

        } catch (error: any) {
            return res.status(400).json(
                ResponseBuilder.Failure(
                    0,
                    "Internal Server Error",
                    [error.message]
                )
            );
        }
    };


    // Member
    getAllMember: RequestHandler = async (req, res) => {
        try {
            const {
                search,
                limit = 10,
                offset = 0
            } = req.body;

            const data = await this.adminService.memberList(
                Number(limit),
                Number(offset)
            );

            return res.status(200).json(data);

        } catch (error: any) {
            return res.status(400).json(
                ResponseBuilder.Failure(
                    0,
                    "Internal Server Error",
                    [error.message]
                )
            );
        }
    };


    // Ward
    getAllWard: RequestHandler = async (req, res) => {
        try {
            const {
                villageId,
                search,
                limit = 10,
                offset = 0
            } = req.body;

            const data = await this.adminService.wardList(
                villageId,
                search,
                Number(limit),
                Number(offset)
            );

            return res.status(200).json(data);

        } catch (error: any) {
            return res.status(400).json(
                ResponseBuilder.Failure(
                    0,
                    "Internal Server Error",
                    [error.message]
                )
            );
        }
    };


    // Booth
    getAllBooth: RequestHandler = async (req, res) => {
        try {
            const {
                wardId,
                search,
                limit = 10,
                offset = 0
            } = req.body;

            const data = await this.adminService.boothList(
                wardId,
                search,
                Number(limit),
                Number(offset)
            );

            return res.status(200).json(data);

        } catch (error: any) {
            return res.status(400).json(
                ResponseBuilder.Failure(
                    0,
                    "Internal Server Error",
                    [error.message]
                )
            );
        }
    };


    // Education
    getAllEducation: RequestHandler = async (req, res) => {
        try {
            const {
                search,
                limit = 10,
                offset = 0
            } = req.body;

            const data = await this.adminService.educationList(
                search,
                Number(limit),
                Number(offset)
            );

            return res.status(200).json(data);

        } catch (error: any) {
            return res.status(400).json(
                ResponseBuilder.Failure(
                    0,
                    "Internal Server Error",
                    [error.message]
                )
            );
        }
    };


    // Work
    getAllWork: RequestHandler = async (req, res) => {
        try {
            const {
                search,
                limit = 10,
                offset = 0
            } = req.body;

            const data = await this.adminService.workList(
                search,
                Number(limit),
                Number(offset)
            );

            return res.status(200).json(data);

        } catch (error: any) {
            return res.status(400).json(
                ResponseBuilder.Failure(
                    0,
                    "Internal Server Error",
                    [error.message]
                )
            );
        }
    };


    // Religion
    getAllReligion: RequestHandler = async (req, res) => {
        try {
            const {
                search,
                limit = 10,
                offset = 0
            } = req.body;

            const data = await this.adminService.religionList(
                search,
                Number(limit),
                Number(offset)
            );

            return res.status(200).json(data);

        } catch (error: any) {
            return res.status(400).json(
                ResponseBuilder.Failure(
                    0,
                    "Internal Server Error",
                    [error.message]
                )
            );
        }
    };


    // Caste
    getAllCaste: RequestHandler = async (req, res) => {
        try {
            const {
                search,
                searchTerm,
                cursor,
                limit = 10,
                offset = 0,
            } = req.body;

            // Add/Edit Member dropdown uses server-side search + cursor pagination.
            // The Caste management table continues using its existing offset pagination.
            const usesCursorPagination =
                Object.prototype.hasOwnProperty.call(req.body, "searchTerm") ||
                Object.prototype.hasOwnProperty.call(req.body, "cursor");

            const data = usesCursorPagination
                ? await this.adminService.castCursorList(
                    String(searchTerm ?? ""),
                    cursor ? String(cursor) : undefined,
                    Number(limit),
                )
                : await this.adminService.castList(
                    search,
                    Number(limit),
                    Number(offset),
                );

            return res.status(200).json(data);

        } catch (error: any) {
            return res.status(400).json(
                ResponseBuilder.Failure(
                    0,
                    "Internal Server Error",
                    [error.message]
                )
            );
        }
    };



    downloadCasteTemplate: RequestHandler = async (_req, res) => {
        const template = "referenceId,casteName\r\n";
        res.setHeader("Content-Type", "text/csv; charset=utf-8");
        res.setHeader("Content-Disposition", 'attachment; filename="caste_upload_template.csv"');
        return res.status(200).send(`\uFEFF${template}`);
    };

    bulkUploadCaste: RequestHandler = async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json(
                    ResponseBuilder.Failure(0, "Please upload a CSV or Excel file", [])
                );
            }

            const result = await this.casteBulkUploadService.bulkUpload(
                req.file.buffer,
                req.file.originalname
            );

            return res.status(result.status === 1 ? 200 : 400).json(result);
        } catch (error: any) {
            return res.status(500).json(
                ResponseBuilder.Failure(0, "Caste bulk upload failed", [error.message])
            );
        }
    };

    // Inactive
    getAllInactive: RequestHandler = async (req, res) => {
        try {
            const {
                search,
                limit = 10,
                offset = 0
            } = req.body;

            const data = await this.adminService.inactiveList(
                search,
                Number(limit),
                Number(offset)
            );

            return res.status(200).json(data);

        } catch (error: any) {
            return res.status(400).json(
                ResponseBuilder.Failure(
                    0,
                    "Internal Server Error",
                    [error.message]
                )
            );
        }
    };

    // Users
getAllUsers: RequestHandler = async (req, res) => {
    try {
        const {
            search,
            role,
            limit = 10,
            offset = 0,
        } = req.body;

        const data = await this.adminService.getUser(
            search,
            role,
            Number(limit),
            Number(offset)
        );

        return res.status(200).json(data);

    } catch (error: any) {
        return res.status(400).json(
            ResponseBuilder.Failure(
                0,
                "Internal Server Error",
                [error.message]
            )
        );
    }
};
}

