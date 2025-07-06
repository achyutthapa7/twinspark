import { removeTemporaryConversation } from "./conversationJob";
import { removeUnverifiedUser } from "./userJob";

export const registerCrons = async () => {
  await removeTemporaryConversation();
  await removeUnverifiedUser();
};
