import { useSelector, useDispatch } from "react-redux";
import {
  loginPending,
  loginSuccess,
  resetAuthSideEffects,
  userDataPending,
} from "../../app/store/authSlice";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import LoadingNireeka from "../../components/Atoms/LoadingNireeka";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../components/common/Input";
import AuthPageLayout from "../../components/Login/AuthPageLayout";
import CallToRegisterFooter from "../../components/Login/CallToRegisterFooter";
import OrangeButton from "../../components/Atoms/buttons/OrangeButton";
import Head from "next/head";
import CustomHead from "@/components/seo/CustomHead";
// import SocialMediaAuthBox from "@/components/Login/SocialMedia/SocialMediaAuthBox";
// import { getSocialMediaAuthOptions, postSocialMediaAuthInfo } from "app/api/auth";
// import { toast } from "react-toastify";
// import { handleLoginByGoogleSuccess } from "services/AuthService";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  // State to specify if the sagas are still in process or not
  const isAuthLoading = useSelector((state) => state.auth.isAuthLoading);
  // Error received from server on after calling login API
  const authenticationError = useSelector(
    (state) => state.auth.authenticationError
  );
  // State to control showing a loader when the social media login options are being fetched from the server
  // const [isSocialMediaListLoading, setIsSocialMediaLinksLoading] = useState(true);
  // State to hold fetched social media login options
  // const [socialMediaAuthList, setSocialMediaAuthList] = useState(null);

  const [isRememberMeChecked, setIsRememberMeChecked] = useState(true);

  const formValidationSchema = Yup.object({
    email: Yup.string()
      .required("Enter your email.")
      .trim()
      .email("Enter a valid email address."),
    password: Yup.string().required("Enter your password."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => values,
  });

  const transformFormikValues = async (formik) => {
    await formik.setFieldValue(
      "email",
      formik.values.email.trim().toLowerCase()
    );
  };

  const handleSubmitForm = async () => {
    await transformFormikValues(formik);

    const credentials = await formik.submitForm();

    if (!credentials) return;

    formik.setTouched("email", false, false);
    formik.setTouched("password", false, false);

    dispatch(
      loginPending({
        email: credentials.email,
        password: credentials.password,
        shouldRemember: isRememberMeChecked,
      })
    );
  };

  const handleRememberMeClick = () => {
    setIsRememberMeChecked((prevValue) => !prevValue);
  };

  // const getSocialMediaOptions = useCallback(async () => {
  //   try {
  //     setIsSocialMediaLinksLoading(true);
  //     const response = await getSocialMediaAuthOptions();
  //     setSocialMediaAuthList(response.data);
  //   } catch (error) {
  //     setSocialMediaAuthList(null);
  //   } finally {
  //     setIsSocialMediaLinksLoading(false);
  //   }
  // }, []);

  // const handleSocialMediaCallBack = useCallback(
  //   async ({ state, accessToken }) => {
  //     switch (state) {
  //       case "google":
  //         try {
  //           const response = await postSocialMediaAuthInfo({ state, accessToken });

  //           if (response.data.token) {
  //             await handleLoginByGoogleSuccess(response.data.token);

  //             dispatch(loginSuccess());
  //             dispatch(userDataPending());
  //           }
  //         } catch (error) {
  //           console.log("Error calling post social auth:", error, error.response);
  //           toast.error(
  //             "Couldn't handle your request. Try logging in with your email and password."
  //           );
  //         }
  //     }
  //   },
  //   [dispatch]
  // );

  // useEffect that checks wether it's a social media callback or not
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(
  //     window.location.hash.substring(1) // skip the first char (#)
  //   );
  //   const state = urlParams.get("state");
  //   const token = urlParams.get("access_token");
  //   if (state && token) handleSocialMediaCallBack({ state, accessToken: token });

  //   getSocialMediaOptions();
  // }, [getSocialMediaOptions, handleSocialMediaCallBack]);

  // useEffect that runs after form submit
  useEffect(() => {
    const { nireekaContinue } = router.query;
    if (!authenticationError && isUserLoggedIn && userData) {
      if (nireekaContinue) router.push(nireekaContinue);

      router.push("/dashboard");
    }
  }, [dispatch, isUserLoggedIn, router, userData, authenticationError]);

  useEffect(() => {
    return () => {
      dispatch(resetAuthSideEffects());
    };
  }, [dispatch]);

  let serverErrorMessageToRender = "";
  if (+authenticationError?.statusCode === 401)
    serverErrorMessageToRender = "E-mail or password is incorrect.";
  else if (+authenticationError?.statusCode === 500)
    serverErrorMessageToRender =
      "Sorry, the server is currently unavailable. Try again later.";
  else if (!!authenticationError?.message)
    serverErrorMessageToRender = authenticationError.message;
  else
    serverErrorMessageToRender = "Check your network connection and try again.";

  return (
    <>
      <CustomHead
        name="Login"
        description="Login to your Nireeka account and access your profile, orders, and more."
        keywords={["Nireeka", "login", "account", "profile", "orders"]}
        available
        selfTitle

      />
      <AuthPageLayout
        title="Nireeka Login"
        description="Please sign in to continue"
        footer={<CallToRegisterFooter />}
      >
        {/* {!isSocialMediaListLoading ? (
          !!socialMediaAuthList && socialMediaAuthList?.length !== 0 ? (
            <div>
              <SocialMediaAuthBox socialMediaAuthList={socialMediaAuthList} className="mb-8" />
              <div className="relative">
                <span className="absolute text-sm px-3 text-gray-700 bg-white top-500 left-500 -translate-x-500 -translate-y-500">
                  Or
                </span>
                <div className="h-[1px] w-full bg-gray-300"></div>
              </div>
            </div>
          ) : null
        ) : (
          <div className="flex justify-center">
            <LoadingNireeka className="w-6 h-6 border-gray-800" />
          </div>
        )} */}
        <form className="space-y-6 font-light">
          <Input formik={formik} label="Email:" name="email" />

          <Input
            formik={formik}
            label="Password:"
            name="password"
            type={"password"}
            autoComplete="current-password"
            inputClassName="pr-10"
          />

          <div className="flex items-center justify-between">
            <div>
              <label
                htmlFor="remember-me"
                className="flex items-center ml-2 text-sm font-light text-gray-900 font-exo"
              >
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded font-exo focus:ring-indigo-500"
                  checked={isRememberMeChecked}
                  onChange={handleRememberMeClick}
                />
                <span className="ml-2">Remember me</span>
              </label>
            </div>

            <div className="text-sm font-light font-exo text-nireekaOrange hover:text-gray-700">
              <Link
                href={{
                  pathname: "/login/forgotten",
                  query: {
                    email: formik?.values?.email ? formik?.values?.email : "",
                  },
                }}
                passHref
              >
                <a>Forgot your password?</a>
              </Link>
            </div>
          </div>

          <div>
            <OrangeButton
              disabled={isAuthLoading || isUserLoggedIn}
              onClick={handleSubmitForm}
            >
              {!isAuthLoading ? (
                !isUserLoggedIn ? (
                  <span>Sign in</span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <LoadingNireeka className="w-4 h-4 border-" />
                    <span>Signing in...</span>
                  </span>
                )
              ) : (
                <span className="flex items-center space-x-2">
                  <LoadingNireeka className="w-4 h-4 border-" />
                  <span>Please wait...</span>
                </span>
              )}
            </OrangeButton>
          </div>

          {!!authenticationError && !!serverErrorMessageToRender && (
            <div>
              <span className="font-light text-red-500 text-sm">
                {serverErrorMessageToRender}
              </span>
            </div>
          )}
        </form>
      </AuthPageLayout>
    </>
  );
}
