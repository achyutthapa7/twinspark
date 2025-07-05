import mongoose from "mongoose";
import { model, models, Schema } from "../../config/db";
import { boolean } from "zod";

const schema = new Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    status: {
      type: String,
      enum: ["pending", "icebreaker", "unlocked", "rejected"],
      default: "pending",
    },
    initiateBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "icebreakers",
      },
    ],
    type: {
      type: String,
      enum: ["permanent", "temporary"],
      default: "temporary",
    },
    convesationExpires: {
      type: boolean,
      default: false,
    },
    mesages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "messages", default: [] },
    ],
  },
  { timestamps: true }
);

export const conversation =
  mongoose.models.conversations || mongoose.model("conversations", schema);
