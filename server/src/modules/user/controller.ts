import { Request, Response, NextFunction } from "express";
import catchAsync from "../../helper/catchAsync";

const controller = {
  signUp: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json({ message: "Signup success!" });
    }
  ),

  verification: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json({ message: "Verification success!" });
    }
  ),

  login: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "Login success!" });
  }),

  logout: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json({ message: "Login success!" });
    }
  ),
};

export { controller };
