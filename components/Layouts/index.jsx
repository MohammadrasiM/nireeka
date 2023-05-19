import { useField } from "formik";
import Head from "next/head";
import Script from "next/script";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshTokenPending, userDataPending } from "../../app/store/authSlice";

import Footer from "../Footer";
import MainHeader from "../Header";

function Layouts({ children }) {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(userDataPending());
    } else {
      // dispatch(refreshTokenPending());
    }
  }, [dispatch, isUserLoggedIn]);

  useEffect(() => {
    if (isUserLoggedIn && userData) {
      /* If the user is logged in, optionally identify them with the following method. */
      /* You can call Upscope('updateConnection', {}); at any time. */
      Upscope("updateConnection", {
        /* Set the user ID below. If you don't have one, set to undefined. */
        uniqueId: userData.id || undefined,

        /* Set the user name or email below (e.g. ["John Smith", "john.smith@acme.com"]). */
        identities: [userData.name + " " + userData.last_name, userData.email],
      });
    }
  }, [isUserLoggedIn, userData]);

  return (
    <>
      <MainHeader />
      {children}
      <Footer />
    </>
  );
}

export default Layouts;
