import React from "react";
import { Provider } from "react-redux";
import store from "../app/store/store";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Layouts from "@/components/Layouts";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalProvider from "@/components/Atoms/modals/ModalProvider";
import CustomScript from "@/components/seo/CustomScript";
import MetaHead from "@/components/seo/MetaHead";

//notification cart shop
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CustomScript />
      <MetaHead />
        <Provider store={store}>
            <ModalProvider>
                <ToastContainer />
                <Layouts>
                    <Component {...pageProps} />
                </Layouts>
            </ModalProvider>
        </Provider>
    </>
  );
}

export default MyApp;
