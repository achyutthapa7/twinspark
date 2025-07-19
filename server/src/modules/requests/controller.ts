import { Response } from "express";
import { AuthenticatedRequest } from "../../types";
import catchAsync from "../../utils/catchAsync";
import { service } from "./service";

export const controller = {
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
