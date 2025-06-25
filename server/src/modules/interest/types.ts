import { Document } from "mongoose";
import { Types } from "../../config/db";

export interface Iinterest extends Document {
  user: Types.ObjectId;
  interests: string[];
}
