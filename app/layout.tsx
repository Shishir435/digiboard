import { Metadata } from "next";
import React from "react";
import "../styles/globals.css";
import RecoidContextProvider from "@/modules/room/context/recoil.contextProvider";
import {Poppins} from "next/font/google"
export const metadata: Metadata = {
  title: "digiboard",
  description: "Next.js whiteboard application",
};
const poppins=Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100','200','300','400','500','600','700','800','900']
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <RecoidContextProvider>{children}</RecoidContextProvider>
      </body>
    </html>
  );
}
