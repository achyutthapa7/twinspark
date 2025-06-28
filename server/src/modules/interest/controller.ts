import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { service } from "./service";

export const controller = {
  createInterest: catchAsync(async (req: Request, res: Response) => {
    const { interests, email } = req.body;
    const data = await service.create(interests, email);
    res.status(201).json({ message: "success", data });
  }),
};
