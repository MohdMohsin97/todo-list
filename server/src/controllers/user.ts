import { Request, Response } from "express";
import prisma from "../db";
import { asyncHandler } from "../utils/asyncHandler";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Fill all credentials");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    res.status(400);
    throw new Error("User Exists");
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      password,
    },
  });
  res.status(200).json(newUser);
});

export const signIn = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Fill all credentials");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
      password,
    },
  });

  if (!user) {
    res.status(400);
    throw new Error("Wrong email or password");
  }

  res.status(200).json({
    id: user.id,
    email: user.email,
    token: generateToken(user.id)
  });
});

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};
