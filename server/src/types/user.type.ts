import { Document } from "mongoose";

type Gender = "male" | "female" | "others";
type Mood = "😊" | "😢" | "😡" | "😍" | "🤔" | "😴" | "😎" | "😇" | "🥳" | "😕";

export interface Iuser extends Document {
  username: string;
  email: string;
  password: string;
  gender: Gender;
  mood: Mood;
  otp: number;
  otpCreatedAt: Date;
  otpUsed: boolean;
}
