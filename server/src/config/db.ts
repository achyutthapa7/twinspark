import mongoose, { Schema, model, Types, models } from "mongoose";
import { env } from "./env";

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI as string);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
};

export { mongoose, Schema, model, models, Types, connectDB };
