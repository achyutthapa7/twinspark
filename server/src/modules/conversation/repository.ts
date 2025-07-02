import { createRepository } from "../shared/repositoryFactory";
import { conversation } from "./model";

export const repository = {
  general: createRepository(conversation),
  findConversation: async (participantsIds: string[]) =>
    await conversation.findOne({ participants: { $all: participantsIds } }),
};
