export type FriendRequestParams = { receiverId: string };
export type AcceptRequestParams = { senderId: string; conversationId: string };
export type RejectRequestParams = { senderId: string };
export type CreateMessageParams = { conversationId: string };
export type RemoveMessageParams = { messageId: string; conversationId: string };
export type IceBreakerParams = { conversationId: string };
export type ConversationParams = { id: string };
