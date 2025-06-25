import { model, models, Schema } from "../../config/db";
import { userType } from "../../types";

const schema = new Schema<userType.Iuser>(
  {
    username: {
      trim: true,
      type: String,
      required: true,
      unique: true,
      minLength: [3, { message: "username cannot be less than 3 character" }],
      maxLength: [
        20,
        { message: "username cannot be greater than 20 character" },
      ],
    },
    email: {
      trim: true,
      type: String,
      required: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "others"],
    },
    mood: {
      type: String,
      enum: ["😊", "😢", "😡", "😍", "🤔", "😴", "😎", "😇", "🥳", "😕"],
      default: "😊",
    },
    otp: {
      type: Number,
      trim: true,
    },
    otpUsed: {
      type: Boolean,
      default: false,
    },
    otpCreatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
export const user = models.users || model<userType.Iuser>("users", schema);
