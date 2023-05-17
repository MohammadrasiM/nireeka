import { useFormik } from "formik";
import Input from "../common/Input";
import RadioGroupInput from "../common/RadioGroupInput";
import AuthPageLayout from "./AuthPageLayout";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import NireekaCombobox from "../Atoms/inputs/NireekaCombobox";
import OrangeButton from "../Atoms/buttons/OrangeButton";
import Link from "next/link";
import { getAllCountries } from "../../app/api/general";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { userDataPending } from "../../app/store/authSlice";
import { updateUserProfileData } from "../../app/api/user/profile";

const genderRadioOptions = [
  {
    id: "male",
    value: "male",
    name: "Male",
  },
  {
    id: "female",
    value: "female",
    name: "Female",
  },
];

export default function RegisterProfileForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const selectedUnit = 0;

  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  const formValidationSchema = Yup.object({
    birth_date: Yup.date()
      .required("Select your birthdate")
      .min("1700-01-01", "This date is too old")
      .max(new Date(), "Birth date must be earlier than today"),
    height: Yup.number("This field should only contain digits")
      .required("This field is required")
      .min(0, "This field cannot be negative")
      .max(selectedUnit === 0 ? 400 : 160, "Field value is too large"),
    weight: Yup.number("This field should only contain digits")
      .required("This field is required")
      .min(0, "This field cannot be negative")
      .max(selectedUnit === 0 ? 600 : 1400, "Field value is too large"),
    // inseam: Yup.number("This field should only contain digits")
    //   .required("This field is required")
    //   .min(0, "This field cannot be negative")
    //   .max(selectedUnit === 0 ? 400 : 160, "Field value is too large"),
    country_id: Yup.object().shape({
      title: Yup.string(),
      id: Yup.number("Select your country from the list").min(0, "Select your country."),
    }),
    gender: Yup.string().required("Select one of the options"),
  });

  const formik = useFormik({
    initialValues: {
      birth_date: "",
      country_id: { title: "", id: -1 },
      gender: "",
      height: "",
      // inseam: "",
      weight: "",
    },
    onSubmit: (values) => values,
    validationSchema: formValidationSchema,
  });

  const getCountries = async () => {
    const res = await getAllCountries();
    setCountries(res.data);
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);

    const formValues = await formik.submitForm();

    if (!formValues) {
      setIsLoading(false);
      return;
    }

    const formToPost = { ...formValues };

    // Date is but should not be in dd-mm-yyyy form, server accepts dd/mm/yyyy format
    formToPost.birth_date = formToPost.birth_date
      ? formToPost.birth_date.replaceAll("-", "/")
      : null;

    if (!formToPost.country_id) formToPost.country_id = null;
    else formToPost.country_id = formToPost.country_id.id;

    // If values were in imperial, we convert them to metric and send them to server
    for (let field of Object.keys(formToPost)) {
      if (!isNaN(+formToPost[field])) formToPost[field] = +formToPost[field];

      if (selectedUnit === 1) {
        if (field === "height" || field === "inseam") {
          formToPost[field] = convertImperialToMetic.ft2cm(formToPost[field]);
        } else if (field === "weight") {
          formToPost[field] = convertImperialToMetic.lb2kg(formToPost[field]);
        }
      }
    }

    try {
      const res = await updateUserProfileData(formToPost);
      toast.success("Your registration has been completed successfully!");
      dispatch(userDataPending());
      router.push("/dashboard");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Sorry, we couldn't check. Try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [selectedUnit, dispatch]); // formik is not a dependency

  return (
    <AuthPageLayout
      title="One Last Step"
      description="Please complete your profile to continue. You can change them anytime from your dashboard."
    >
      <form className="space-y-6">
        <Input formik={formik} name="birth_date" label="Birth Date" type="date" />

        <NireekaCombobox
          formik={formik}
          name="country_id"
          label="Country"
          list={countries}
          defaultSelected={formik.initialValues.country_id}
        />

        <RadioGroupInput
          formik={formik}
          label="Gender"
          name="gender"
          radioOptions={genderRadioOptions}
          inlineOptions
        />

        <Input
          formik={formik}
          name="height"
          type="number"
          label={`Height ${selectedUnit === 0 ? "(cm)" : "(ft)"}`}
        />

        <Input
          formik={formik}
          name="weight"
          type="number"
          label={`Weight ${selectedUnit === 0 ? "(kg)" : "(lbs)"}`}
        />

        {/* <Input
          formik={formik}
          name="inseam"
          type="number"
          label={`Inseam ${selectedUnit === 0 ? "(cm)" : "(ft)"}`}
        /> */}

        <div className="flex flex-col items-center space-y-3">
          <span
            onClick={handleSubmit}
            className="font-light text-sm text-blue-600 whitespace-nowrap cursor-pointer"
          >
            Register
          </span>

          <OrangeButton href="/dashboard">Skip</OrangeButton>
        </div>
      </form>
    </AuthPageLayout>
  );
}
