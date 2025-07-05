import { removeTemporaryConversation } from "./conversationJob";

export const registerCrons = async () => {
  await removeTemporaryConversation();
};
