import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../db";
import dotenv from "dotenv";
import { CustomRequest, Jwt_Paylaod } from "../types";
import { asyncHandler } from "../utils/asyncHandler";

dotenv.config();

export const authenticateToken = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, No token");
    }
    try {
      const decode = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as Jwt_Paylaod;
      req.user = await prisma.user.findUnique({
        where: {
          id: decode.id,
        },
        select: {
          id: true,
          email: true,
        },
      });
      next();
    } catch (error) {
      console.log(error);
      res.status(403);
      throw new Error("Token Expired");
    }
  }
);
