import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { userAPI } from "../api/userApi";
import toast from "react-hot-toast";
import { Helper } from "@/utils/helper";

const useSendRequest = () => {
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation<
    AxiosResponse,
    Error,
    string
  >({
    mutationFn: (receiverId) => userAPI.sendRequest(receiverId),
    onSuccess: () => {
      toast.success("Request sent successfully");
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

export default useSendRequest;
