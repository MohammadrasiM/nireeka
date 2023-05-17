import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getAllCountries } from "../../../app/api/general";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  editShippingAddress,
  getShippingAddressDetails,
} from "../../../app/api/user/profile";
import PrimaryButton from "../../Atoms/buttons/PrimaryButton";
import WhiteButton from "../../Atoms/buttons/WhiteButton";
import WhiteShadowCard from "../../Atoms/cards/WhiteShadowCard";
import LoadingNireeka from "../../Atoms/LoadingNireeka";
import AddressForm from "../../CheckOut/AddressForm";

const EditAddressModal = (props) => {
  // State to show loading while the data is being fetched
  const [isLoading, setIsLoading] = useState(true);
  // State to show loading for buttons after submit is clicked
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  // countries fetched from server
  const [countries, setCountries] = useState(null);

  /* Formik Validation Object */
  const validationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string()
          .required("Name is required")
          .min(2, "Name is too short"),
        lastname: Yup.string()
          .required("Last Name is required")
          .min(3, "Last Name is too short"),
        phone: Yup.string()
          // .matches(/^[0-9]+$/, "Must contain only digits")
          // .matches(/^[0-9]+$/, "Must contain only digits")
          .min(5, "Phone number is too short")
          .required("A phone number is required"),
        address: Yup.string()
          .required("Address is required")
          .min(4, "Address is too short"),
        unit: Yup.string(),
        country: Yup.object()
          .shape({
            title: Yup.string().min(0, "Country is required"),
            id: Yup.number().min(0, "Country is required"), // id of the selected country in AddressForm has been initialized to -1
            code: Yup.string()
              .min(2, "Country is required")
              .max(2, "Country is required"),
          })
          .nullable()
          .required("Country is required"),
        city: Yup.string()
          .required("City is required")
          .min(1, "City is too short"),
        state: Yup.string()
          .required("State is required")
          .min(1, "State is too short"),
        zipcode: Yup.string()
          .required("Zip Code is required")
          .min(1, "Zip Code is too short"),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      phone: "",
      country: { title: "", id: -1 },
      address: "",
      unit: "",
      city: "",
      state: "",
      zipcode: "",
    },
    onSubmit: (values) => values,
    validateOnBlur: false,
    validationSchema: validationSchema,
  });

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const requestResponses = await Promise.all([
        getShippingAddressDetails(props.addressId),
        getAllCountries(),
      ]);

      const addressRes = requestResponses[0];
      const countryRes = requestResponses[1];

      setCountries(countryRes.data);

      formik.setFieldValue(
        "name",
        addressRes.data.name ? addressRes.data.name : ""
      );
      formik.setFieldValue(
        "lastname",
        addressRes.data.last_name ? addressRes.data.last_name : ""
      );
      formik.setFieldValue(
        "phone",
        addressRes.data.phone ? addressRes.data.phone : ""
      );
      formik.setFieldValue(
        "address",
        addressRes.data.address ? addressRes.data.address : ""
      );
      formik.setFieldValue(
        "address2",
        addressRes.data.address2 ? addressRes.data.address2 : ""
      );
      formik.setFieldValue(
        "unit",
        addressRes.data.unit ? addressRes.data.unit : ""
      );
      formik.setFieldValue(
        "city",
        addressRes.data.city ? addressRes.data.city : ""
      );
      formik.setFieldValue(
        "state",
        addressRes.data.state ? addressRes.data.state : ""
      );
      formik.setFieldValue(
        "zipcode",
        addressRes.data.zipcode ? addressRes.data.zipcode : ""
      );

      for (let country of countryRes.data) {
        if (country.id == addressRes.data.country_id) {
          formik.setFieldValue("country", country);
          break;
        }
      }
    } catch (error) {
      console.log("Error in message field:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        toast.error(error.response.data.message);
        props.onClose();
      } else {
        toast.error(
          "Sorry, we couldn't process your request. Try again later."
        );
        console.log("Error fetching address data to edit:", error);
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        props.onClose();
      }
      setShippingCostResult(null);
    } finally {
      setIsLoading(false);
    }
  }, [props.addressId]); // formik is not a dependency

  useEffect(() => {
    getData();
  }, [getData]);

  const handleSubmit = useCallback(async () => {
    const formValues = await formik.submitForm();

    if (!formValues) return;

    const dataToSend = { ...formValues };

    try {
      dataToSend.country = dataToSend.country.id;
      setIsSubmitLoading(true);
      const res = await editShippingAddress(props.addressId, dataToSend);

      toast.success("Address updated successfully");

      document.getElementsByTagName("body")[0].style.overflow = "auto";
      props.onClose();
      if (props.onSuccess) props.onSuccess(formValues);
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <WhiteShadowCard className="flex justify-center">
        <LoadingNireeka className="w-10 h-10 border-gray-700" />
      </WhiteShadowCard>
    );
  }

  return (
    <WhiteShadowCard>
      <AddressForm formik={formik} countries={countries} />
      <div className="flex mt-6 space-x-3 justify-end">
        <WhiteButton
          onClick={() => {
            document.getElementsByTagName("body")[0].style.overflow = "auto";
            props.onClose();
          }}
          disabled={isSubmitLoading}
        >
          Cancel
        </WhiteButton>
        <PrimaryButton
          onClick={handleSubmit}
          disabled={isSubmitLoading}
          className="space-x-3"
        >
          {isSubmitLoading && <LoadingNireeka className="w-4 h-4" />}
          <span>{isSubmitLoading ? "Updating..." : "Edit"}</span>
        </PrimaryButton>
      </div>
    </WhiteShadowCard>
  );
};

export default EditAddressModal;
