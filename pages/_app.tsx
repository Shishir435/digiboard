import ModalManager from "@/common/components/modal/components/ModalManager";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ModalManager/>
      <Component {...pageProps} />
    </RecoilRoot>
  )}
