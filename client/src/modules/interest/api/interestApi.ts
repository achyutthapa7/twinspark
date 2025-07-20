import { api } from "@/lib/api/api";
import { API_ENDPOINTS } from "@/lib/api/apiEndpoints";
import { userAPI } from "@/modules/user/api/userApi";

const { CREATE } = API_ENDPOINTS.INTEREST;

export const interestAPI = {
  create: <T>(payload: T) => api.post(CREATE, payload),
};
