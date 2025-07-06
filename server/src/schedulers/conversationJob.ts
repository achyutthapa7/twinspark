import cron from "node-cron";
import { conversation } from "../modules/conversation/model";

export const removeTemporaryConversation = async () => {
  cron.schedule("0 * * * *", async () => {
    try {
      const expiryThreshold = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const result = await conversation.updateMany(
        {
          type: "temporary",
          conversationExpired: false,
          createdAt: { $lt: expiryThreshold },
        },
        { $set: { conversationExpired: true } }
      );

      console.log(`Expired ${result.modifiedCount} temporary conversations.`);
    } catch (err) {
      console.error("Error expiring temporary conversations:", err);
    }
  });
};
