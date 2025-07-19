import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";
import { userAPI } from "../api/userApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Helper } from "@/utils/helper";

const useVerify = () => {
  const router = useRouter();
  const { isPending, mutateAsync } = useMutation<AxiosResponse, Error>({
    mutationFn: userAPI.verification,
    onSuccess: ({ data }) => {
      toast.success("Verification Successfull");
      router.push("/dashboard");
      Helper.removeLocalStorage("email");
    },
    onError: Helper.handleMutationError,
  });
  return {
    isLoading: isPending,
    verify: mutateAsync,
  };
};

export default useVerify;
