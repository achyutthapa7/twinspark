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
