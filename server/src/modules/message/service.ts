import { conversation } from "../conversation/model";
import { repository } from "./repository";

export const service = {
  create: async ({
    conversationId,
    message,
    myId,
  }: {
    conversationId: string;
    message: string;
    myId: string;
  }) => {
    const convo = await conversation.findById(conversationId);
    if (convo.status != "unlocker")
      throw new Error("conversation is not unlocked");
    const payload = {
      conversationId,
      message,
      senderId: myId,
    };
    const newMessage = await repository.general.create(payload);
    await repository.pushMessageToConversation({
      conversationId,
      messageId: newMessage,
    });
    return { newMessage };
  },
};
