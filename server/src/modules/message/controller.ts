import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import { AuthenticatedRequest } from "../../types";
import { service } from "./service";

export const controller = {
  create: catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const { conversationId } = req.params;
    const { message } = req.body;
    const { id: myId } = req.user!;
    if (!message) return res.status(401).json("cannot send empty message");
    const { newMessage } = await service.create({
      conversationId,
      message,
      myId,
    });
    return res
      .status(201)
      .json({ message: "message sent successfully", data: newMessage });
  }),

  remove: catchAsync(async (req: Request, res: Response) => {
    const { messageId, conversationId } = req.params;
    const { data } = await service.remove(messageId, conversationId);
    return res
      .status(200)
      .json({ message: "Message deleted successfully", data });
  }),
};
