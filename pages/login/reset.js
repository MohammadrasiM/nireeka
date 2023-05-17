import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import AuthPageLayout from "../../components/Login/AuthPageLayout";
import { useRouter } from "next/router";
import CallToRegisterFooter from "../../components/Login/CallToRegisterFooter";
import Input from "../../components/common/Input";
import OrangeButton from "../../components/Atoms/buttons/OrangeButton";
import * as Yup from "yup";
import { postPasswordResetData, validatePasswordResetTokenAndEmail } from "../../app/api/auth";
import { toast } from "react-toastify";
import LoadingNireeka from "../../components/Atoms/LoadingNireeka";
import Head from "next/head";

export default function ResetPasswordPage() {
  const router = useRouter();

  const passwordResetToken = router?.query?.token;
  const passwordResetEmail = router?.query?.email;

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isTokenValidationLoading, setIsTokenValidationLoading] = useState(true);
  const [isTokenAndEmailValid, setIsTokenAndEmailValid] = useState(false);
  const [passwordResetResponse, setPasswordResetResponse] = useState(null);
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

  const formValidationSchema = Yup.object({
    password: Yup.string()
      .required("Enter a new password.")
      .min(8, "Your password must be at least 8 characters."),
    password_confirmation: Yup.string()
      .required("Repeat your new password.")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => values,
  });

  const handleFormSubmit = async () => {
    const formValues = await formik.submitForm();
    if (!formValues) return;

    const dataToPostToServer = {
      email: passwordResetEmail,
      token: passwordResetToken,
      password: formValues.password,
      password_confirmation: formValues.password_confirmation,
    };

    setPasswordResetResponse(null);
    try {
      setIsSubmitLoading(true);
      const res = await postPasswordResetData(dataToPostToServer);
      setPasswordResetResponse(res);
      toast.success("Password was successfully reset.");
    } catch (error) {
      const errorMessage = "Sorry, we couldn't process your password reset request.";
      setPasswordResetResponse(
        error?.response?.data ? error.response.data : { message: errorMessage }
      );
      // 403 status is the validation error
      if (error?.response?.status !== 403) toast.error(errorMessage);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const checkToken = useCallback(async (email, token) => {
    try {
      setIsTokenValidationLoading(true);
      const res = await validatePasswordResetTokenAndEmail(email, token);
      if (res.data && res.data.success) setIsTokenValidationLoading(false);
      setIsTokenAndEmailValid(true);
    } catch (error) {
      setIsTokenAndEmailValid(false);
    } finally {
      setIsTokenValidationLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) router.push("/dashboard");
    else if (router.isReady) {
      if (!passwordResetEmail || !passwordResetToken) router.push("/login");
      else checkToken(passwordResetEmail, passwordResetToken);
    }
  }, [isUserLoggedIn, router, checkToken, passwordResetEmail, passwordResetToken]);

  // RENDERING
  let conditionalContent = null;
  if (isTokenValidationLoading)
    conditionalContent = (
      <div className="flex items-center justify-center">
        <LoadingNireeka className="w-10 h-10 border-gray-700" />
      </div>
    );
  else if (
    !isTokenAndEmailValid ||
    (!!passwordResetResponse &&
      !passwordResetResponse?.success &&
      passwordResetResponse?.status !== 403)
  )
    conditionalContent = (
      <div className="flex flex-col items-center justify-center text-center">
        <span className="text-gray-700 font-light">Couldn&apos;t proceed with your request.</span>
        <span className="text-gray-700 font-light">This link is either invalid or expired.</span>
        <span className="text-gray-700 mt-3 font-light">
          You can request another password reset:
        </span>
        <span className="mt-3">
          <OrangeButton
            href={{
              pathname: "/login/forgotten",
              query: { email: passwordResetEmail },
            }}
          >
            Reset Password
          </OrangeButton>
        </span>
      </div>
    );
  else if (!!passwordResetResponse && !!passwordResetResponse.success)
    conditionalContent = (
      <div className="flex flex-col items-center justify-center text-center">
        <span className="text-green-600 text-3xl mb-4">Success!</span>
        <span className="text-gray-700 font-light">Your password was reset successfully.</span>
        <span className="text-gray-700 font-light">
          You can login to your account with the new password now.
        </span>
        <span className="mt-3">
          <OrangeButton href="/login">Login</OrangeButton>
        </span>
      </div>
    );
  else
    conditionalContent = (
      <form className="space-y-6">
        <Input
          name="password"
          label="New Password"
          type="password"
          formik={formik}
          autoComplete="new-password"
        />
        <Input
          name="password_confirmation"
          label="Confirm New Password"
          type="password"
          autoComplete="new-password"
          formik={formik}
        />
        <OrangeButton onClick={handleFormSubmit} disabled={isSubmitLoading}>
          {!isSubmitLoading ? (
            <span>Reset Password</span>
          ) : (
            <span className="flex items-center space-x-2">
              <LoadingNireeka className="w-4 h-4 border-" />
              <span>Please wait...</span>
            </span>
          )}
        </OrangeButton>

        {/* Server email validation errors */}
        {!!passwordResetResponse &&
          !passwordResetResponse?.success &&
          passwordResetResponse?.status === 403 && (
            <div className="flex flex-col">
              {!!passwordResetResponse?.data?.email &&
                passwordResetResponse?.data?.email?.length > 0 &&
                passwordResetResponse.data.email.map((error) => (
                  <span key={new Date().getTime()} className="font-light text-red-500 text-sm">
                    {error}
                  </span>
                ))}
            </div>
          )}
        {/* Server password validation errors */}
        {!!passwordResetResponse &&
          !passwordResetResponse?.success &&
          passwordResetResponse?.status === 403 && (
            <div className="flex flex-col">
              {!!passwordResetResponse?.data?.password &&
                passwordResetResponse?.data?.password?.length > 0 &&
                passwordResetResponse.data.password.map((error) => (
                  <span key={new Date().getTime()} className="font-light text-red-500 text-sm">
                    {error}
                  </span>
                ))}
            </div>
          )}
      </form>
    );

  return (
    <>
      <Head>
        <title>Reset Password - Nireeka</title>
      </Head>
      <AuthPageLayout
        title="Reset Password"
        description="Enter a new password to continue"
        footer={<CallToRegisterFooter />}
      >
        {conditionalContent}
      </AuthPageLayout>
    </>
  );
}
