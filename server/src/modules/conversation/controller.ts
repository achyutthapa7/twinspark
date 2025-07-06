import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { service } from "./service";
import { AuthenticatedRequest } from "../../types";

export const controller = {
  createRequest: catchAsync(
    async (req: AuthenticatedRequest, res: Response) => {
      const { id: receiverId } = req.params;
      const { id: senderId } = req?.user!;
      await service.create(receiverId, senderId, res);
    }
  ),
  acceptRequest: catchAsync(
    async (req: AuthenticatedRequest, res: Response) => {
      const { id: senderId } = req.params;
      const { id: receiverId } = req?.user!;
      await service.accept(receiverId, senderId, res);
    }
  ),
  rejectRequest: catchAsync(
    async (req: AuthenticatedRequest, res: Response) => {
      const { id: senderId } = req.params;
      const { id: receiverId } = req?.user!;
      await service.reject(receiverId, senderId, res);
    }
  ),

  getConversations: catchAsync(
    async (req: AuthenticatedRequest, res: Response) => {
      const { id } = req.user!;
      const { conversations } = await service.fetchConversations(id);
      return res.status(200).json({ message: "success", data: conversations });
    }
  ),
};
