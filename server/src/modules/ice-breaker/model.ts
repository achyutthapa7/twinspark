import mongoose from "mongoose";
import { model, models } from "../../config/db";

const schema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversations",
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

export const iceBreaker =
  mongoose.models.icebreakers || mongoose.model("icebreakers", schema);
