import { useFormik } from "formik";
import Input from "../common/Input";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { registerPending } from "../../app/store/authSlice";
import PrimaryButton from "../Atoms/buttons/PrimaryButton";
import LoadingNireeka from "../Atoms/LoadingNireeka";

const RegisterGuest = () => {
  const dispatch = useDispatch();

  const [lastSubmittedEmail, setLastSubmittedEmail] = useState(null);
  // State to specify if the sagas are still in process or not
  const isAuthLoading = useSelector((state) => state.auth.isAuthLoading);
  // Error received from server on after calling register API
  const authenticationError = useSelector((state) => state.auth.authenticationError);
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

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

  return (
    <div>
      <form className="grid grid-cols-6 gap-x-5 gap-y-5" onSubmit={handleFormSubmit}>
        <div className="col-span-6 sm:col-span-3">
          <Input name="name" label="Name" type="text" formik={formik} />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <Input name="lastname" label="Last Name" type="text" formik={formik} />
        </div>

        <div className="col-span-6 sm:col-span-6">
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
        </div>

        <div className="col-span-6 sm:col-span-3">
          <Input
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            formik={formik}
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <Input
            name="password_confirmation"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            formik={formik}
          />
        </div>

        <div className="col-span-6 flex justify-end">
          <PrimaryButton
            onClick={handleFormSubmit}
            disabled={isAuthLoading || isUserLoggedIn}
            className="w-full md:w-36"
          >
            {!isAuthLoading ? (
              !isUserLoggedIn ? (
                <span>Register</span>
              ) : (
                <span className="flex justify-center items-center space-x-2">
                  <LoadingNireeka className="w-4 h-4 border-white" />
                  <span>Signing in...</span>
                </span>
              )
            ) : (
              <span className="flex justify-center items-center space-x-2">
                <LoadingNireeka className="w-4 h-4 border-white" />
                <span>Please wait...</span>
              </span>
            )}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default RegisterGuest;
