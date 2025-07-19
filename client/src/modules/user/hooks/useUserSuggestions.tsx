import React from "react";
import { userAPI } from "../api/userApi";
import { useQuery } from "@tanstack/react-query";

const useUserSuggestions = () => {
  const { isError, isSuccess, isLoading, data, error } = useQuery({
    queryKey: ["user", "suggestions"],
    queryFn: userAPI.getSuggestion,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
  return {
    data,
    isLoading,
    isError,
    isSuccess,
    error,
  };
};

export default useUserSuggestions;
