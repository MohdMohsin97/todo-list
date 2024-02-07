import { Request } from "express";

export type UserType = {
  id: string;
  email: string;
  password?: string;
  Todo?: TodoType[];
};
export type TodoType = {
  id: string;
  createAt: Date;
  title: string;
  description?: string;
  User: UserType;
};

export type CustomRequest = Request & {
  user?: UserType | null;
};

export type Jwt_Paylaod = {
  id: string;
};
