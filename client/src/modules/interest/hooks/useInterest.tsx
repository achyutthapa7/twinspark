import { useMutation } from "@tanstack/react-query";
import React from "react";
import { interestAPI } from "../api/interestApi";
import { Helper } from "@/utils/helper";
import toast from "react-hot-toast";
import { useRedux } from "@/shared/hooks/useRedux";
import { setInterests } from "../store/interestSlice";
import { AxiosResponse } from "axios";

const useInterest = () => {
  const { dispatch } = useRedux();
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation<
    AxiosResponse,
    Error
  >({
    mutationFn: interestAPI.create,
    onSuccess: ({ data }) => {
      dispatch(setInterests(data?.data));
      toast.success("Interest created successfully");
    },
    onError: Helper.handleMutationError,
  });
  return {
    createInterest: mutateAsync,
    isLoading: isPending,
    isError,
    error,
    isSuccess,
  };
};

export default useInterest;
