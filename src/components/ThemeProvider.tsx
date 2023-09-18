"use client";

import { ThemeProvider } from "next-themes";

const TheThemeProvider = ({ children }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default TheThemeProvider;
