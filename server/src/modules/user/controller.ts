import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catchAsync";
import { validation } from "./validation";
import { service } from "./service";
import { AuthenticatedRequest } from "../../types";

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
    const { refreshToken, accessToken, username, email, role } =
      await service.login(req.body);
    res.status(200).json({
      message: "Login success!",
      data: { refreshToken, accessToken, username, email, role },
    });
  }),
  refreshToken: catchAsync(async (req: Request, res: Response) => {
    const { newAccessToken } = await service.refreshToken(req.body);
    res
      .status(200)
      .json({ message: "New Access Token Created", data: newAccessToken });
  }),
  logout: catchAsync(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      await service.logout(req?.user);
      res.status(200).json({ message: "Login success!" });
    }
  ),
};

export { controller };
