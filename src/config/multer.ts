import multer, {type StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import type{ Request } from "express";


const ensureDirExists = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const uploadPath = "./uploads/photo";
ensureDirExists(uploadPath);

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request,file: Express.Multer.File,cb: (error: Error | null, destination: string) => void): void => {
    cb(null, uploadPath);
  },
  filename: (req: Request,file: Express.Multer.File,cb: (error: Error | null, filename: string) => void): void => {
    const ext = path.extname(file.originalname);
    const uniqueName =  Math.round(Math.random() * 1e9) + ext;

    cb(null, uniqueName);
  },
});


export const uploadUserImage = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
}).fields([
  { name: "userImage", maxCount: 1 },
]);