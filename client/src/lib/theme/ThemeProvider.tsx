"use client";
import theme from "@/utils/theme";
import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
