import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingNireeka from "../../components/Atoms/LoadingNireeka";
import { useRouter } from "next/router";
import AuthPageLayout from "../../components/Login/AuthPageLayout";
import CallToRegisterFooter from "../../components/Login/CallToRegisterFooter";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../components/common/Input";
import OrangeButton from "../../components/Atoms/buttons/OrangeButton";
import { sendForgottenPasswordRequest } from "../../app/api/auth";
import { toast } from "react-toastify";
import Head from "next/head";

export default function ForgetPasswordPage() {
  const router = useRouter();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [requestResponse, setRequestResponse] = useState(null);
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

  const formikValidationSchema = Yup.object({
    email: Yup.string().required("Enter your email.").email("Enter a valid email address."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => values,
    validationSchema: formikValidationSchema,
  });

  const handleFormSubmit = async () => {
    const formikValues = await formik.submitForm();
    if (!formikValues) return;

    setRequestResponse(null);
    try {
      setIsSubmitLoading(true);
      const response = await sendForgottenPasswordRequest(formikValues.email);
      setRequestResponse(response);
      toast.success("Password reset link was sent to your email!");
    } catch (error) {
      const errorMessage = "Sorry, couldn't reach the servers. Try again later.";
      setRequestResponse(error?.response?.data ? error?.response?.data : { errorMessage });
    } finally {
      setIsSubmitLoading(false);
    }
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      router.push("/dashboard");
    } else {
      const initialEmailValue = router.query.email;
      if (!!initialEmailValue) formik.setFieldValue("email", initialEmailValue);
    }
  }, [isUserLoggedIn, router]); // Formik is not a dependency!

  return (
    <>
      <Head>
        <title>Forgot Password - Nireeka</title>
      </Head>
      <AuthPageLayout
        title="Reset Your Password"
        description="Enter your email to continue"
        footer={<CallToRegisterFooter />}
      >
        {!!requestResponse && !!requestResponse.success ? (
          <div className="flex flex-col items-center text-center">
            <span className="text-green-600 text-3xl mb-4">Success!</span>
            <span className="text-gray-700 font-light">A link was sent to your email.</span>
            <span className="text-gray-700 font-light">
              Check your email and reset your password by the provided link.
            </span>
            <span className="text-sm text-gray-500 mt-4 font-light">
              You can safely close this window.
            </span>
          </div>
        ) : (
          <form className="space-y-6">
            <Input type="text" formik={formik} label="Email" name="email" />

            <div>
              <OrangeButton disabled={isSubmitLoading || isUserLoggedIn} onClick={handleFormSubmit}>
                {!isSubmitLoading ? (
                  !isUserLoggedIn ? (
                    <span>Submit</span>
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

            {requestResponse?.status === 422 && (
              <div className="flex flex-col text-red-500 text-sm font-light ml-2 mt-0">
                {!!requestResponse?.data &&
                  requestResponse?.data.length > 0 &&
                  requestResponse?.data.map((error) => (
                    <span key={new Date().getTime()}>{error}</span>
                  ))}
              </div>
            )}
          </form>
        )}
      </AuthPageLayout>
    </>
  );
}
