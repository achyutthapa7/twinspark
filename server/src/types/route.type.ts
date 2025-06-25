import { RequestHandler } from "express";

export interface IAuthRequest extends Request {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    type: string;
  };
}

export interface IRoute {
  method: "get" | "post" | "put" | "delete" | "patch";
  path: string;
  controller: RequestHandler;
  authorization?: boolean;
  authCheckType?: string[];
}
