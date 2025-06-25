import { Request, Response, NextFunction } from "express";
import catchAsync from "../../helper/catchAsync";
import { validation } from "./validation";
import { service } from "./service";

const controller = {
  signUp: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await service.createUser(req.body);
      res.status(201).json({ message: "Signup success!", data: user });
    }
  ),

  verification: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await service.verifyUser(req.body);
      res.status(200).json({ message: "Verification success!" });
    }
  ),

  login: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { token, existingUser } = await service.login(req.body);
    res
      .status(200)
      .json({ message: "Login success!", data: { token, existingUser } });
  }),

  logout: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json({ message: "Login success!" });
    }
  ),
};

export { controller };
