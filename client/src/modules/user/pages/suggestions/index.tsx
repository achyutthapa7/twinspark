"use client";
import React from "react";
import useUserSuggestions from "../../hooks/useUserSuggestions";

const Suggesstions = () => {
  const { data, error, isLoading, isSuccess } = useUserSuggestions();
  console.log(data);
  return <div>Suggesstions</div>;
};

export default Suggesstions;
