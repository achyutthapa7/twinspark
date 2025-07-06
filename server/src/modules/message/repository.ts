import { conversation } from "../conversation/model";
import { createRepository } from "../shared/repositoryFactory";
import { message } from "./model";

export const repository = {
  general: createRepository(message),
  pushMessageToConversation: async ({
    conversationId,
    messageId,
  }: {
    conversationId: string;
    messageId: string;
  }) => {
    await conversation.findByIdAndUpdate(
      conversationId,
      {
        $push: { messages: messageId },
        $set: { lastMessageId: messageId },
      },
      { new: true }
    );
  },
  pullMessageFromConversation: async ({
    conversationId,
    messageId,
  }: {
    conversationId: string;
    messageId: string;
  }) =>
    await conversation.findByIdAndUpdate(
      conversationId,
      {
        $pull: { messages: messageId },
      },
      { new: true }
    ),
};
