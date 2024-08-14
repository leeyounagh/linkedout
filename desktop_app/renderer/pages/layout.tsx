"use client";
import StyledComponentsRegistry from "./registry";
import React, { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "@/shared/styles";
import { ThemeProvider } from "styled-components";
import { useTheme } from "@/shared/lib/theme";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";

const defaultValue = {
  theme: "dark",
  onChangeTheme: () => {},
};

export const CustomThemeContext = React.createContext(defaultValue);

const Pretendard = localFont({
  src: [
    {
      path: "./fonts/PretendardWoff2/Pretendard-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/PretendardWoff/Pretendard-Black.woff",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/PretendardWoff2/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/PretendardWoff/Pretendard-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/PretendardWoff2/Pretendard-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/PretendardWoff/Pretendard-ExtraBold.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/PretendardWoff2/Pretendard-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/PretendardWoff/Pretendard-ExtraLight.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/PretendardWoff2/Pretendard-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/PretendardWoff/Pretendard-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/PretendardWoff2/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/PretendardWoff/Pretendard-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/PretendardWoff2/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PretendardWoff/Pretendard-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PretendardWoff2/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/PretendardWoff/Pretendard-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/PretendardWoff2/Pretendard-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/PretendardWoff/Pretendard-Thin.woff",
      weight: "100",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeProps = useTheme();
  const pathname = usePathname();

  return (
    <CustomThemeContext.Provider value={themeProps}>
      <ThemeProvider
        theme={themeProps.theme === "light" ? lightTheme : darkTheme}
      >
        <StyledComponentsRegistry>
          <div
            className={`container  ${Pretendard.className} ${
              pathname?.includes("/web/login") ? "slide-up" : ""
            }`}
          >
            {children}
          </div>
        </StyledComponentsRegistry>
      </ThemeProvider>
    </CustomThemeContext.Provider>
  );
}
