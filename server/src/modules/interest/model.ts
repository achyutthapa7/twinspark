import { model, models, Schema } from "../../config/db";
import { Iinterest } from "./types";

const schema = new Schema<Iinterest>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
    interests: {
      type: [String],
      default: [],
      trim: true,
    },
  },
  { timestamps: true }
);

export const interest =
  models.interests || model<Iinterest>("interests", schema);
