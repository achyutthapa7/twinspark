import { api } from "@/lib/api/api";
import { API_ENDPOINTS } from "@/lib/api/apiEndpoints";

const { REQUEST, ACCEPT, REJECT, GET_ALL } = API_ENDPOINTS.CONVERSATION;

export const conversationApi = {
  request: (id: string) => api.post(REQUEST({ id })),
  accpet: (id: string) => api.post(ACCEPT({ id })),
  reject: (id: string) => api.post(REJECT({ id })),
  getAll: () => api.get(GET_ALL),
};
