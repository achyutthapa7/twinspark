import { Request } from "express";
import * as userType from "./user.type";
import * as routeType from "./route.type";

// Custom interface extending Express Request
export interface AuthenticatedRequest extends Request {
  user?: {
    role: userType.Role;
    id: string;
  };
}

export { userType, routeType };
