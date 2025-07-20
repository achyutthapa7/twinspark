import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";
import { conversationApi } from "../api/conversationApi";
import toast from "react-hot-toast";
import { Helper } from "@/utils/helper";

const useConversationRequest = () => {
  const { mutateAsync, isError, isPending, isSuccess } = useMutation<
    AxiosResponse,
    Error,
    string
  >({
    mutationFn: (id: string) => conversationApi.request(id),
    onSuccess: () => {
      toast.success("Request sent successfully");
    },
    onError: Helper.handleMutationError,
  });
  return {
    request: mutateAsync,
    isError,
    isPending,
    isSuccess,
  };
};

export default useConversationRequest;
