import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catchAsync";
import { validation } from "./validation";
import { service } from "./service";
import { AuthenticatedRequest } from "../../types";

const controller = {
  signUp: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        username,
        email,
        role,
        _id: id,
      } = await service.createUser(req.body);
      res.status(201).json({
        message: "Signup success!",
        data: { username, email, role, _id: id },
      });
    }
  ),

  verification: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await service.verifyUser(req.body);
      res.status(200).json({ message: "Verification success!" });
    }
  ),

  login: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken, accessToken, username, email, role, userId } =
      await service.login(req.body);
    res.status(200).json({
      message: "Login success!",
      data: { userId, refreshToken, accessToken, username, email, role },
    });
  }),
  refreshToken: catchAsync(async (req: Request, res: Response) => {
    const { token } = req.body;
    if (!token || typeof token !== "string") {
      return res
        .status(400)
        .json({ message: "Refresh token must be provided" });
    }
    const { newAccessToken } = await service.refreshToken(token);
    res
      .status(200)
      .json({ message: "New Access Token Created", newAccessToken });
  }),

  logout: catchAsync(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      await service.logout(req?.user);
      res.status(200).json({ message: "logout success!" });
    }
  ),

  getSuggestions: catchAsync(
    async (req: AuthenticatedRequest, res: Response) => {
      const { suggestedUsers } = await service.getUserSuggestions(req?.user);
      res.status(200).json({ message: "success", suggestedUsers });
    }
  ),

  sendRequest: catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const { receiverId } = req.params;
    const { id: senderId } = req.user!;
    const data = await service.sendFriendRequest({ senderId, receiverId });
    res.status(200).json({ message: "suceess", data });
  }),

  acceptRequest: catchAsync(
    async (req: AuthenticatedRequest, res: Response) => {
      const { id: receiverId } = req.user!;
      const { senderId, conversationId } = req.params;
      const data = await service.acceptFriendRequest({
        senderId,
        receiverId,
        conversationId,
      });
      res.status(200).json({ message: "suceess", data });
    }
  ),

  rejectRequest: catchAsync(
    async (req: AuthenticatedRequest, res: Response) => {
      const { id: receiverId } = req.user!;
      const { senderId } = req.params;
      const data = await service.rejectFriendRequest({ senderId, receiverId });
      res.status(200).json({ message: "suceess", data });
    }
  ),
};

export { controller };
