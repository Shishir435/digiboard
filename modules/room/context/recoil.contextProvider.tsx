"use client";
import ModalManager from "@/common/components/modal/components/ModalManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { RecoilRoot } from "recoil";

export default function RecoidContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <div id="portal"></div>
      <ToastContainer />
      <ModalManager />
      {children}
    </RecoilRoot>
  );
}
