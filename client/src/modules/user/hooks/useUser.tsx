import { RootState } from "@/lib/store/store";
import { useMutation } from "@tanstack/react-query";

import { logout, setCredentials } from "../store/userSlice";
import { userAPI } from "../api/userApi";
import { AxiosResponse } from "axios";
import { useRedux } from "@/hooks/useRedux";

export const useAuth = () => {
  type LoginPayload = {
    email: string;
    password: string;
  };

  type LoginResponse = {
    token: string;
    user: any;
  };
  const { dispatch, useAppSelector } = useRedux();
  const user = useAppSelector((state: RootState) => state.user.user);
  const loginMutation = useMutation<
    AxiosResponse<LoginResponse>,
    Error,
    LoginPayload
  >({
    mutationFn: userAPI.login,
    onSuccess: ({ data }) => {
      localStorage.setItem("authToken", data.token);
      dispatch(setCredentials(data.user));
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated: !!user,
    login: loginMutation.mutateAsync,
    isLoading: loginMutation,
    logout: handleLogout,
  };
};
