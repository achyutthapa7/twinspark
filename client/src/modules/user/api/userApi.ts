import { api } from "@/lib/api/api";
import { API_ENDPOINTS } from "@/lib/api/apiEndpoints";

const {
  SIGNUP,
  VERIFICATION,
  REFRESH_TOKEN,
  LOGIN,
  LOGOUT,
  SEND_REQUEST,
  ACCEPT_REQUEST,
  REJECT_REQUEST,
  GET_SUGGESTIONS,
} = API_ENDPOINTS.USER;

export const userAPI = {
  signup: <T>(credentials: T) => api.post(SIGNUP, credentials),
  verification: <T>(payload: T) => api.post(VERIFICATION, payload),
  login: <T>(credentials: T) => api.post(LOGIN, credentials),
  refreshToken: <T>(payload: T) => api.post(REFRESH_TOKEN, payload),
  logout: () => api.post(LOGOUT),
  getSuggestion: () => api.get(GET_SUGGESTIONS),
  sendRequest: (receiverId: string) => api.post(SEND_REQUEST({ receiverId })),
  acceptRequest: (senderId: string, conversationId: string) =>
    api.post(ACCEPT_REQUEST({ senderId, conversationId })),
  rejectRequest: (senderId: string) => api.post(REJECT_REQUEST({ senderId })),
};
