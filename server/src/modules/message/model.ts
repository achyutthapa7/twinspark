import mongoose from "mongoose";
import { model, models } from "../../config/db";

const schema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversations",
    },
    message: { type: String, default: "" },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },

  { timestamps: true }
);

export const message = models.messages || model("messages", schema);
