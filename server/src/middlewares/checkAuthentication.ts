import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "../utils/jwt";
import { user } from "../modules/user/model";

type Role = "user" | "moderator" | "admin";

const checkAuthentication =
  (allowedRoles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: "Unauthorized: No token provided" });
      }

      const { role, id, tokenVersion } = jwtVerify(token, "access");

      const existingUser = await user.findById(id);
      if (!existingUser || existingUser.tokenVersion !== tokenVersion) {
        return res
          .status(401)
          .json({ message: "Token invalidated. Please login again." });
      }

      if (!allowedRoles.includes(role as Role)) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient role" });
      }

      (req as any).user = { role, id };
      next();
    } catch (error) {
      console.error("Auth error:", error);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };

export default checkAuthentication;
