import mongoose from "mongoose";
import { model, models } from "../../config/db";

const schema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    answerBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    answeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const iceBreaker = models.icebreakers || model("icebreakers", schema);
