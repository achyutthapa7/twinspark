"use client";
import { RootState } from "@/lib/store/store";
import { useMutation } from "@tanstack/react-query";

import { logout, setUser } from "../store/userSlice";
import { userAPI } from "../api/userApi";
import { AxiosResponse } from "axios";

import toast from "react-hot-toast";
import { LoginPayload, LoginResponse } from "../interfaces";
import { useRouter } from "next/navigation";
import { Helper } from "@/utils/helper";
import { useRedux } from "@/shared/hooks/useRedux";

export const useLogin = () => {
  const router = useRouter();
  const { dispatch, useAppSelector } = useRedux();
  const user = useAppSelector((state: RootState) => state.user.user);
  const { isPending, mutateAsync } = useMutation<
    AxiosResponse<LoginResponse>,
    Error,
    LoginPayload
  >({
    mutationFn: userAPI.login,
    onSuccess: ({ data }) => {
      Helper.setLocalStorage("authToken", data.data.accessToken);
      dispatch(setUser(data?.data));
      toast.success("logged in successfully");
      router.push("/dashboard");
    },
    onError: Helper.handleMutationError,
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("logged out successfully");
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated: !!user,
    login: mutateAsync,
    isLoading: isPending,
    logout: handleLogout,
  };
};
