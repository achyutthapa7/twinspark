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
    if (convo.status != "unlocked")
      throw new Error("conversation is not unlocked");
    if (convo.convesationExpires) throw new Error("conversation is expired");
    const payload = {
      conversationId,
      message,
      senderId: myId,
    };
    const newMessage = await repository.general.create(payload);
    console.log("sfsfsdfsdf", newMessage?._id.toString());
    await repository.pushMessageToConversation({
      conversationId,
      messageId: newMessage._id.toString(),
    });
    return { newMessage };
  },

  remove: async (messageId: string, conversationId: string) => {
    const data = await repository.general.delete(messageId);
    await repository.pullMessageFromConversation({ conversationId, messageId });
    return { data };
  },
};
