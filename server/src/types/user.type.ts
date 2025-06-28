import { Document } from "mongoose";

type Gender = "male" | "female" | "others";
type Mood = "😊" | "😢" | "😡" | "😍" | "🤔" | "😴" | "😎" | "😇" | "🥳" | "😕";
export type Role = "admin" | "user" | "moderator";
export interface Iuser extends Document {
  username: string;
  email: string;
  password: string;
  gender: Gender;
  mood?: Mood;
  otp?: number | null;
  otpCreatedAt?: Date;
  otpExpiresAt?: Date;
  otpUsed?: boolean;
  role?: Role;
  isVerified?: boolean;
  refreshToken?: string | null;
  tokenVersion?: number;
  isLoggedIn?: boolean;
}
