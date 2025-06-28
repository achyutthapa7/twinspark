import { NextFunction, Request, Response } from "express";
import { model, models, Schema } from "../../config/db";
import { userType } from "../../types";
import bcrypt from "bcrypt";
import { CallbackError } from "mongoose";
const schema = new Schema<userType.Iuser>(
  {
    username: {
      trim: true,
      type: String,
      required: true,
      unique: true,
      minLength: [3, "username cannot be less than 3 character"],
      maxLength: [20, "username cannot be greater than 20 character"],
    },
    email: {
      trim: true,
      type: String,
      required: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
      index: true,
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
    refreshToken: {
      type: String,
      default: null,
    },
    otp: {
      type: Number,
      trim: true,
      default: null,
    },
    otpUsed: {
      type: Boolean,
      default: false,
    },
    otpCreatedAt: {
      type: Date,
      default: Date.now,
    },
    otpExpiresAt: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      enum: ["admin", "user", "moderator"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const user = models.users || model<userType.Iuser>("users", schema);
