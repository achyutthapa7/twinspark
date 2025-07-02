import { Request } from "express";
import catchAsync from "../../utils/catchAsync";
import { service } from "./service";
import { AuthenticatedRequest } from "../../types";

export const controller = {
  create: catchAsync(async (req: AuthenticatedRequest) => {
    const answer = req.body;
    const { id } = req.user!;
    const { conversationId } = req.params!;
    await service.create(answer, id, conversationId);
  }),
};
