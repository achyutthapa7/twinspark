import { user } from "../modules/user/model";
import cron from "node-cron";
export const removeUnverifiedUser = async () => {
  cron.schedule("*/5 * * * *", async () => {
    try {
      const result = await user.deleteMany({
        isVerified: false,
        otpExpiresAt: { $lt: new Date() },
      });
      console.log(`🗑️ Removed ${result.deletedCount} unverified users`);
    } catch (error) {
      console.error("❌ Error removing unverified users:", error);
    }
  });
};
