import {
  AcceptRequestParams,
  ConversationParams,
  CreateMessageParams,
  FriendRequestParams,
  IceBreakerParams,
  RejectRequestParams,
  RemoveMessageParams,
} from "./type";

export const API_ENDPOINTS = {
  USER: {
    SIGNUP: "users/sign-up",
    VERIFICATION: "users/verification",
    LOGIN: "users/login",

    REFRESH_TOKEN: "users/refresh-token",
    LOGOUT: "users/logout",
    GET_SUGGESTIONS: "users/get-suggestions",

    SEND_REQUEST: ({ receiverId }: FriendRequestParams) =>
      `users/${receiverId}/friend-request`,

    ACCEPT_REQUEST: ({ senderId, conversationId }: AcceptRequestParams) =>
      `users/${senderId}/${conversationId}/friend-accept`,

    REJECT_REQUEST: ({ senderId }: RejectRequestParams) =>
      `users/${senderId}/friend-reject`,
  },

  INTEREST: {
    CREATE: "users/interest/create",
  },

  MESSAGE: {
    CREATE: ({ conversationId }: CreateMessageParams) =>
      `messages/${conversationId}/create`,

    REMOVE: ({ messageId, conversationId }: RemoveMessageParams) =>
      `messages/${messageId}/${conversationId}/remove`,
  },

  ICEBREAKER: {
    BREAK_ICE: ({ conversationId }: IceBreakerParams) =>
      `icebreaker/${conversationId}/break-ice`,
  },

  CONVERSATION: {
    REQUEST: ({ id }: ConversationParams) =>
      `conversation/${id}/conversation-request`,

    ACCEPT: ({ id }: ConversationParams) =>
      `conversation/${id}/conversation-accept`,

    REJECT: ({ id }: ConversationParams) =>
      `conversation/${id}/conversation-reject`,

    GET_ALL: "conversation/get",
  },
};
