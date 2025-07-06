import { Response } from "express";
import { conversation } from "./model";
import { repository } from "./repository";
import { buildConvesationPipeline } from "../../utils/aggregationUtils";

export const service = {
  create: async (receiverId: string, senderId: string, res: Response) => {
    const participantsIds = [receiverId, senderId];
    const existed = await repository.findConversation(participantsIds);
    if (!existed) {
      await conversation.create({
        participants: participantsIds,
        initiateBy: senderId,
      });
      return res
        .status(201)
        .json({ message: "Spark sent. Waiting for response." });
    }
  },
  accept: async (receiverId: string, senderId: string, res: Response) => {
    const participantsIds = [receiverId, senderId];
    const existed = await repository.findConversation(participantsIds);
    if (!existed) return res.status(404).json({ error: "Spark not found" });
    if (existed.status === "pending") {
      existed.status = "icebreaker";
      await existed.save();
      return res
        .status(200)
        .json({ message: "Spark accepted. Icebreaker started." });
    }

    return res.status(200).json({ message: "Already accepted." });
  },
  reject: async (receiverId: string, senderId: string, res: Response) => {
    const participantsIds = [receiverId, senderId];
    const existed = await repository.findConversation(participantsIds);

    if (!existed) {
      return res.status(404).json({ error: "Spark not found" });
    }

    if (existed.status === "pending") {
      existed.status = "rejected";
      await existed.save();
      return res.status(200).json({ message: "Spark rejected successfully." });
    }

    return res.status(400).json({
      message: "Cannot reject. Spark already accepted or processed.",
    });
  },

  fetchConversations: async (id: string) => {
    const pipeline = buildConvesationPipeline(id);
    const conversations = await conversation.aggregate(pipeline);
    return { conversations };
  },
};
