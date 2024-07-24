import { Metadata } from "next";
import React from "react";
import "../styles/globals.css";
import RecoidContextProvider from "@/modules/room/context/recoil.contextProvider";
export const metadata: Metadata = {
  title: "digiboard",
  description: "Welcome to Next.js",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RecoidContextProvider>{children}</RecoidContextProvider>
      </body>
    </html>
  );
}
