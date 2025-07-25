import { userType } from "../../types";
import { validation } from "./validation";
import { createOtp } from "../../utils/otp";
import { hashPassword, verifyPassword } from "../../utils/bcrypt";
import { jwtSign, jwtVerify } from "../../utils/jwt";
import { userRepository } from "./repository";
import { interest } from "../interest/model";
import { buildSuggestionPipeline } from "../../utils/aggregationUtils";
import {
  hasReceivedFriendRequest,
  hasSentFriendRequest,
  isAlreadyFriends,
  removeRequest,
} from "../../utils/friendstatus";

export const service = {
  createUser: async (payload: userType.Iuser) => {
    const validatedData = validation.signUpValidationSchema().parse(payload);
    const existingUser = await userRepository.general.findByEmail(
      payload.email
    );
    const otp = createOtp();
    const OTP_EXPIRY_MINUTES = 5;
    const otpExpiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
    if (existingUser) throw new Error("User already existed");
    const hashedPassword = await hashPassword(validatedData.password);
    const newUser = await userRepository.general.create({
      ...validatedData,
      password: hashedPassword,
      otp,
      otpExpiresAt,
    });
    const { username, email, role, _id: id } = newUser;
    return { username, email, role, _id: id };
    //send the otp to emai sendMail(otp,email) later
  },
  verifyUser: async (payload: { email: string; input: number }) => {
    const { email, input } = payload;
    const registeredUser = await userRepository.general.findByEmail(email);
    const otp = registeredUser?.otp;
    const otpExpiresAt = registeredUser?.otpExpiresAt;
    if (registeredUser.otp === null)
      throw new Error("User is already Verified");
    if (input !== otp) throw new Error("Otp doesn't match, please try again");
    if (!otpExpiresAt || new Date() > otpExpiresAt)
      throw new Error("Otp is already expired");
    await userRepository.general.update(registeredUser?._id, {
      otp: null,
      otpUsed: true,
      isVerified: true,
    });
  },

  login: async (payload: { email: string; password: string }) => {
    const { email, password } = payload;
    const existingUser = await userRepository.general.findByEmail(email);
    if (!existingUser) throw new Error("Email doesn't exist");
    // if (existingUser?.isLoggedIn) throw new Error("You are already logged in");
    if (!existingUser.isVerified)
      throw new Error("Your Email is not verified, please verify first");
    const isPasswordValid = await verifyPassword(
      password,
      existingUser.password
    );
    if (!isPasswordValid)
      throw new Error("Password is incorrect, please try again");

    const updatedUser = await userRepository.incrementTokenVersion(
      existingUser._id
    );

    const jwtPayload = {
      role: updatedUser.role ?? "user",
      id: updatedUser._id.toString(),
      tokenVersion: updatedUser.tokenVersion ?? 0,
    };

    const accessToken = jwtSign(jwtPayload, "access");
    const refreshToken = jwtSign(jwtPayload, "refresh");

    await userRepository.general.update(updatedUser._id, {
      refreshToken,
      isLoggedIn: true,
    });

    return {
      userId: updatedUser._id,
      accessToken,
      refreshToken,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      gender: updatedUser.gender,
    };
  },

  refreshToken: async (token: string) => {
    const decoded = await jwtVerify(token, "refresh");
    const user = await userRepository.general.findById(decoded.id);
    if (!user || user.refreshToken !== token) throw new Error("Token Mismatch");
    const newAccessToken = jwtSign(
      { id: user._id, role: user.role, tokenVersion: user.tokenVersion ?? 0 },
      "access"
    );
    return { newAccessToken };
  },

  logout: async (user: any) => {
    const { id } = user;
    await userRepository.general.findById(id).then((user) => {
      if (!user.refreshToken) throw new Error("Already Logged out");
    });

    await userRepository.general.update(id, {
      refreshToken: null,
      isLoggedIn: false,
    });
  },

  getUserSuggestions: async (user: any) => {
    const { id: myId } = user;
    const { interests: myInterests = [] } = await userRepository.myInterests(
      myId
    );
    const limit = 5;
    console.log({ myId });
    const pipeline = buildSuggestionPipeline(myId, myInterests, limit);
    const suggestedUsers = await interest.aggregate(pipeline);
    return { suggestedUsers };
  },

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

    if (
      hasReceivedFriendRequest(receiver, me._id) ||
      hasSentFriendRequest(me, receiver._id)
    ) {
      throw new Error("You have already sent a friend request to this user.");
    }

    if (
      isAlreadyFriends(me, receiver._id) &&
      isAlreadyFriends(receiver, me._id)
    ) {
      throw new Error("You are already friends.");
    }

    receiver.receivedRequests.push(me._id);
    me.sentRequests.push(receiver._id);

    await me.save();
    await receiver.save();

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
