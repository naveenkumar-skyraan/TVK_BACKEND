import bcrypt from "bcrypt";
import type { JwtPayload } from "../types/jwt.types.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type { RequestHandler } from "express";

dotenv.config();
export class AuthClass {
  async createBcrypt(pass: string): Promise<string> {
    const haspass = await bcrypt.hash(pass, 10);
    return haspass;
  }

  async checkPass(pass: string, dbPass: string) {
    const checkpas = await bcrypt.compare(pass, dbPass);
    return checkpas;
  }

  async generateJWT(payload: JwtPayload) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign(payload, secret);
  }

  async verifyToken(token: string) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }
    return jwt.verify(token, secret) as JwtPayload;
  }

  authMiddelware: RequestHandler = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(301).json({
          status: 0,
          message: "No JWT provided",
          data: [],
        });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(301).json({
          status: 0,
          message: "Invalid JWT provided",
          data: [],
        });
      }
      const decoced: any = await this.verifyToken(token);

      (req as any).user = decoced;
      next()
    } catch (error) {
      return res.status(401).json({
        status: 0,
        message: "Invalid or expired JWT",
        data: [],
      });
    }
  };
}
