"use client";
import { useRedux } from "@/hooks/useRedux";
import { RootState } from "@/lib/store/store";
import Loader from "@/shared/loader";
import { useRouter } from "next/navigation";
import React, { Fragment, ReactNode, useEffect } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { useAppSelector } = useRedux();
  const { user } = useAppSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!user) router.replace("/login");
  }, [router]);
  if (!user) return <Loader />;
  return <Fragment>{children}</Fragment>;
};

export default layout;
