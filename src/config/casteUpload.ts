import multer from "multer";
import type { RequestHandler } from "express";
import path from "node:path";

const supportedExtensions = new Set([".csv", ".xlsx", ".xls"]);

const casteUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 1,
  },
  fileFilter: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if (!supportedExtensions.has(extension)) {
      callback(new Error("Only CSV, XLSX and XLS files are supported"));
      return;
    }
    callback(null, true);
  },
});

export const uploadCasteFile: RequestHandler = (req, res, next) => {
  casteUpload.single("file")(req, res, (error: any) => {
    if (error) {
      const message = error.code === "LIMIT_FILE_SIZE"
        ? "File size must not exceed 10 MB"
        : error.message || "Unable to upload file";
      return res.status(400).json({
        status: 0,
        message,
        data: [],
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: 0,
        message: "Please upload a file using the file field",
        data: [],
      });
    }

    next();
  });
};
