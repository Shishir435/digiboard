import { Metadata } from "next";
import React from "react";
import "../styles/globals.css";
import RecoilContextProvider from "@/modules/room/context/recoil.contextProvider";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/modules/room/context/app.themeProvider";
export const metadata: Metadata = {
  title: "digiboard",
  description: "Next.js whiteboard application",
};
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["italic", "normal"],
  preload: false
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RecoilContextProvider>{children}</RecoilContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
