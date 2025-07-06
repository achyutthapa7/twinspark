import { Types } from "mongoose";
import { userType } from "../types";

export const isAlreadyFriends = (
  me: userType.Iuser,
  other: Types.ObjectId
): boolean | undefined => {
  return me?.acceptedRequests?.some((id) => id.equals(other));
};

export const hasSentFriendRequest = (
  me: userType.Iuser,
  other: Types.ObjectId
): boolean | undefined => {
  return me.sentRequests?.some((id) => id.equals(other));
};

export const hasReceivedFriendRequest = (
  me: userType.Iuser,
  other: Types.ObjectId
): boolean | undefined => {
  return me.receivedRequests?.some((id) => id.equals(other));
};

export const removeRequest = (
  arr: Types.ObjectId[],
  target: Types.ObjectId
): Types.ObjectId[] => {
  return arr.filter((id) => !id.equals(target));
};
