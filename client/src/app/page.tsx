"use client";
import React from "react";
import LandingPage from "./(routes)/(public)/landing/page/landing";
import { env } from "@/utils/env";

const Home = () => {
  console.log(env.BASE_URL, "URL");
  return (
    <>
      <LandingPage />
    </>
  );
};

export default Home;
