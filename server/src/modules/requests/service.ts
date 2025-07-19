import {
  hasReceivedFriendRequest,
  hasSentFriendRequest,
  isAlreadyFriends,
  removeRequest,
} from "../../utils/friendstatus";
import { userRepository } from "../user/repository";
import { requests } from "./model";

export const service = {
  sendFriendRequest: async ({
    senderId,
    receiverId,
  }: {
    senderId: string;
    receiverId: string;
  }) => {
    const me = await userRepository.general.findById(senderId);
    const receiver = await userRepository.general.findById(receiverId);
    if (!me || !receiver) throw new Error("User not found.");

    const senderRequest =
      (await requests.findOne({ userId: senderId })) ||
      (await requests.create({ userId: senderId }));

    const receiverRequest =
      (await requests.findOne({ userId: receiverId })) ||
      (await requests.create({ userId: receiverId }));

    if (
      senderRequest.sentRequests.includes(receiverId) ||
      receiverRequest.receivedRequests.includes(senderId)
    ) {
      throw new Error("Friend request already sent.");
    }

    senderRequest.sentRequests.push(receiverId);
    receiverRequest.receivedRequests.push(senderId);

    await senderRequest.save();
    await receiverRequest.save();

    return {
      message: `${me.username} sent a request to become permanent with ${receiver.username}`,
    };
  },

  acceptFriendRequest: async ({
    senderId,
    receiverId,
    conversationId,
  }: {
    senderId: string;
    receiverId: string;
    conversationId: string;
  }) => {
    const conversation = await userRepository.conversation.findById(
      conversationId
    );
    const sender = await userRepository.general.findById(senderId);
    const receiver = await userRepository.general.findById(receiverId);

    if (!sender || !receiver || !conversation)
      throw new Error("Required data not found.");

    if (!hasReceivedFriendRequest(receiver, sender._id)) {
      throw new Error("No pending friend request from this user.");
    }

    if (isAlreadyFriends(receiver, sender._id)) {
      throw new Error("You are already friends.");
    }

    receiver.receivedRequests = removeRequest(
      receiver.receivedRequests,
      sender._id
    );
    sender.sentRequests = removeRequest(sender.sentRequests, receiver._id);
    receiver.acceptedRequests.push(sender._id);
    sender.acceptedRequests.push(receiver._id);
    conversation.type = "permanent";
    await receiver.save();
    await sender.save();
    await conversation.save();
    return {
      message: `${receiver.username} accepted the friend request from ${sender.username}`,
    };
  },
  rejectFriendRequest: async ({
    senderId,
    receiverId,
  }: {
    senderId: string;
    receiverId: string;
  }) => {
    const sender = await userRepository.general.findById(senderId);
    const receiver = await userRepository.general.findById(receiverId);

    if (!sender || !receiver) throw new Error("User not found.");

    if (!hasReceivedFriendRequest(receiver, sender._id)) {
      throw new Error("No pending friend request from this user.");
    }

    receiver.receivedRequests = removeRequest(
      receiver.receivedRequests,
      sender._id
    );
    sender.sentRequests = removeRequest(sender.sentRequests, receiver._id);
    await receiver.save();
    await sender.save();
    return {
      message: `${receiver.username} rejected the friend request from ${sender.username}`,
    };
  },
};
