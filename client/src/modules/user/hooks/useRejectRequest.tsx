import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { userAPI } from "../api/userApi"; // Adjust path as needed
import toast from "react-hot-toast";
import { Helper } from "@/utils/helper";

const useRejectRequest = () => {
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation<
    AxiosResponse,
    Error,
    string
  >({
    mutationFn: (senderId) => userAPI.rejectRequest(senderId),
    onSuccess: () => {
      toast.success("Request rejected successfully");
    },
    onError: Helper.handleMutationError,
  });

  return {
    rejectRequest: mutateAsync,
    isLoading: isPending,
    isError,
    error,
    isSuccess,
  };
};

export default useRejectRequest;
