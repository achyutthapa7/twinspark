import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { service } from "./service";
import { AuthenticatedRequest } from "../../types";

export const controller = {
  create: catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const { answer } = req.body;
    const { id } = req.user!;
    const { conversationId } = req.params!;
    const { data } = await service.create(answer, id, conversationId);

    return res.status(201).json({ message: "success", data });
  }),
};
