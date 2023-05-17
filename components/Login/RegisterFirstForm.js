import { useFormik } from "formik";
import Input from "../common/Input";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import OrangeButton from "../Atoms/buttons/OrangeButton";
import LoadingNireeka from "../Atoms/LoadingNireeka";
import { registerPending } from "../../app/store/authSlice";
import { useCallback, useEffect, useState } from "react";
import AuthPageLayout from "./AuthPageLayout";
import CallToLoginFooter from "./CallToLoginFooter";
// import SocialMediaAuthBox from "./SocialMedia/SocialMediaAuthBox";
// import { getSocialMediaAuthOptions } from "app/api/auth";

export default function RegisterFirstForm() {
  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

  // State to specify if the sagas are still in process or not
  const isAuthLoading = useSelector((state) => state.auth.isAuthLoading);
  // Error received from server on after calling register API
  const authenticationError = useSelector((state) => state.auth.authenticationError);
  // State to control showing a loader when the social media login options are being fetched from the server
  // const [isSocialMediaListLoading, setIsSocialMediaLinksLoading] = useState(true);
  // State to hold fetched social media login options
  // const [socialMediaAuthList, setSocialMediaAuthList] = useState(null);

  const [lastSubmittedEmail, setLastSubmittedEmail] = useState(null);

  const formValidationSchema = Yup.object({
    name: Yup.string().required("This field can't be empty"),
    lastname: Yup.string().required("This field can't be empty"),
    email: Yup.string().required("Enter your email.").email("Enter a valid email address."),
    password: Yup.string()
      .required("Enter a password.")
      .min(8, "Your password must be at least 8 characters."),
    password_confirmation: Yup.string()
      .required("Repeat your password.")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    onSubmit: (values) => values,
    validationSchema: formValidationSchema,
  });

  const transformFormikValues = async (formik) => {
    await Promise.all([
      formik.setFieldValue("name", formik.values.name.trim()),
      formik.setFieldValue("lastname", formik.values.lastname.trim()),
      formik.setFieldValue("email", formik.values.email.trim().toLowerCase()),
    ]);
  };

  const handleFormSubmit = async () => {
    await transformFormikValues(formik);

    const formValues = await formik.submitForm();
    if (!formValues) return;

    setLastSubmittedEmail(formValues.email);
    dispatch(registerPending(formValues));
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

  // useEffect(() => {
  //   getSocialMediaOptions();
  // }, [getSocialMediaOptions]);

  return (
    <AuthPageLayout
      title="Join the Nireeka World!"
      description="Please register to continue"
      footer={<CallToLoginFooter />}
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

      <form className="space-y-6" onSubmit={handleFormSubmit}>
        <Input name="name" label="Name" type="text" formik={formik} />

        <Input name="lastname" label="Last Name" type="text" formik={formik} />

        <Input name="email" label="Email" autoComplete="email" type="text" formik={formik} />
        {!!authenticationError &&
          !authenticationError.success &&
          authenticationError?.status === 403 &&
          !!authenticationError?.data?.email &&
          lastSubmittedEmail === formik.values.email &&
          authenticationError?.data?.email.map((error) => (
            <span id="formError" key={error} className="mx-1 mt-0.5 text-sm font-light text-red-500">
              {error}
            </span>
          ))}

        <Input
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          formik={formik}
        />

        <Input
          name="password_confirmation"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          formik={formik}
        />
      </form>

      <div>
        <OrangeButton disabled={isAuthLoading || isUserLoggedIn} onClick={handleFormSubmit}>
          {!isAuthLoading ? (
            !isUserLoggedIn ? (
              <span>Register</span>
            ) : (
              <span className="flex items-center space-x-2">
                <LoadingNireeka className="w-4 h-4 border-white" />
                <span>Signing in...</span>
              </span>
            )
          ) : (
            <span className="flex items-center space-x-2">
              <LoadingNireeka className="w-4 h-4 border-white" />
              <span>Please wait...</span>
            </span>
          )}
        </OrangeButton>
      </div>

      <div className="flex flex-col">
        {!!authenticationError?.message && (
          <span id="formError" className="mx-1 mt-0.5 text-sm font-light text-red-500">
            {authenticationError.message}
          </span>
        )}
      </div>
    </AuthPageLayout>
  );
}
