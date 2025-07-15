import { RootState } from "@/lib/store/store";
import { useMutation } from "@tanstack/react-query";

import { logout, setCredentials } from "../store/userSlice";
import { userAPI } from "../api/userApi";
import { AxiosResponse } from "axios";
import { useRedux } from "@/hooks/useRedux";
import toast from "react-hot-toast";

export const useAuth = () => {
  type LoginPayload = {
    email: string;
    password: string;
  };

  type LoginResponse = {
    token: string;
    data: any;
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
      localStorage.setItem("authToken", JSON.stringify(data.data));
      dispatch(setCredentials(data?.data));
      toast.success("logged in successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err.message);
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("logged out successfully");
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated: !!user,
    login: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    logout: handleLogout,
  };
};
