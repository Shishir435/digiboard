import ModalManager from "@/common/components/modal/components/ModalManager";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Head from "next/head";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Digiboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecoilRoot>
        <ToastContainer />
        <ModalManager />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}
