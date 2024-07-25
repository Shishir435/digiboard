"use client";
import ModalManager from "@/common/components/modal/components/ModalManager";
import { Toaster } from "@/common/components/ui/sonner";
import { RecoilRoot } from "recoil";

export default function RecoidContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <div id="portal"></div>
      <Toaster richColors />
      <ModalManager />
      {children}
    </RecoilRoot>
  );
}
