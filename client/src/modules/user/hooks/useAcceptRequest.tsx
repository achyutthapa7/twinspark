import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { userAPI } from "../api/userApi";
import toast from "react-hot-toast";
import { Helper } from "@/utils/helper";

const useAcceptRequest = () => {
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation<
    AxiosResponse,
    Error,
    string
  >({
    mutationFn: (senderId) => userAPI.sendRequest(senderId),
    onSuccess: () => {
      toast.success("Request accept successfully");
    },
    onError: Helper.handleMutationError,
  });

  return {
    sendRequest: mutateAsync,
    isLoading: isPending,
    isError,
    error,
    isSuccess,
  };
};

export default useAcceptRequest;
