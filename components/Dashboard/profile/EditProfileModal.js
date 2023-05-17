import { useDispatch, useSelector } from "react-redux";
import WhiteShadowCard from "../../Atoms/cards/WhiteShadowCard";
import WhiteButton from "../../Atoms/buttons/WhiteButton";
import PrimaryButton from "../../Atoms/buttons/PrimaryButton";
import { useCallback, useEffect, useMemo, useState } from "react";
import { updateUserProfileData } from "../../../app/api/user/profile";
import NireekaCombobox from "../../Atoms/inputs/NireekaCombobox";
import { getAllCountries } from "../../../app/api/general";
import { toast } from "react-toastify";
import { userDataPending } from "../../../app/store/authSlice";
import LoadingNireeka from "../../Atoms/LoadingNireeka";
import { dashboard } from "../../../app/constants/localStorageKeys";
import { getBikeSettingsByMac, setBikeSettingsByMac } from "../../../app/api/nsd";
import { setBikeSettings } from "../../../app/store/dashboardSlice";
import {
  convertImperialToMetic,
  convertMetricToImperial,
  deepCopy,
} from "../../../functions/convertors";
import { useFormik } from "formik";
import Input from "../../common/Input";
import RadioGroupInput from "../../common/RadioGroupInput";
import * as Yup from "yup";
import { toggleUserPreferredUnitSystem } from "app/api/user";
import { METRIC_SYSTEM } from "app/constants/units";

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

const EditProfileModal = (props) => {
  const dispatch = useDispatch();

  // User selected bike's MAC ID
  const macId = localStorage.getItem(dashboard.SELECTED_BIKE_MAC_ID);

  const userData = useSelector((state) => state.auth.userData);
  // 0 => metric, 1 => imperial
  const userUnitSystem = userData?.unit || 0;

  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUnitChangeLoading, setIsUnitChangeLoading] = useState(false);

  const formValidationSchema = Yup.object({
    name: Yup.string().required("This field can't be empty"),
    lastname: Yup.string().required("This field can't be empty"),
    gender: Yup.string().nullable(),
    birth_date: Yup.date()
      .min("1700-01-01", "This date is too old")
      .max(new Date(), "Birth date must be earlier than today")
      .nullable(),
    height: Yup.number("This field should only contain digits")
      .min(0, "This field cannot be negative")
      .max(userUnitSystem === METRIC_SYSTEM ? 400 : 160, "Field value is too large")
      .nullable(),
    weight: Yup.number("This field should only contain digits")
      .min(0, "This field cannot be negative")
      .max(userUnitSystem === METRIC_SYSTEM ? 600 : 1400, "Field value is too large")
      .nullable(),
    inseam: Yup.number("This field should only contain digits")
      .min(0, "This field cannot be negative")
      .max(userUnitSystem === METRIC_SYSTEM ? 400 : 160, "Field value is too large")
      .nullable(),
  });

  const formik = useFormik({
    initialValues: {
      name: userData.name,
      lastname: userData.last_name,
      country_id: !!userData.country ? userData.country : { name: "", id: null },
      gender: !!userData?.gender ? userData.gender : "male",
      birth_date: userData.birth_date
        ? userData.birth_date.substring(0, userData.birth_date.indexOf(" "))
        : "",
      height: !!userData?.height
        ? userUnitSystem === METRIC_SYSTEM
          ? userData.height
          : convertMetricToImperial.cm2ft(userData.height)
        : "",
      inseam: !!userData?.inseam
        ? userUnitSystem === METRIC_SYSTEM
          ? userData.inseam
          : convertMetricToImperial.cm2ft(userData.inseam)
        : "",
      weight: !!userData?.weight
        ? userUnitSystem === METRIC_SYSTEM
          ? userData.weight
          : convertMetricToImperial.kg2lb(userData.weight)
        : "",
    },
    onSubmit: (values) => values,
    validationSchema: formValidationSchema,
  });

  // useCallback dependency
  const { onClose } = props;

  const getCountries = async () => {
    const res = await getAllCountries();
    setCountries(res.data);
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleUnitCheckboxChange = useCallback(
    async (e) => {
      if (macId) {
        setIsUnitChangeLoading(true);
        const res = await setBikeSettingsByMac(macId, { unit: +e.target.value });

        try {
          const bikeSettings = await getBikeSettingsByMac(macId);
          dispatch(setBikeSettings(bikeSettings.data.settings));
        } catch (error) {}

        if (res instanceof Error) {
          setIsUnitChangeLoading(false);
        }
      } else {
        try {
          setIsUnitChangeLoading(true);
          const res = await toggleUserPreferredUnitSystem();
          dispatch(userDataPending());
        } catch (error) {
          console.log(error)
        } finally {
          setIsUnitChangeLoading(false);
        }
      }
    },
    [dispatch, macId]
  );

  const transformFormikValues = async (formik) => {
    const latestValues = await formik.submitForm();

    if (!latestValues) return;

    await Promise.all([
      formik.setFieldValue("name", latestValues.name.trim()),
      formik.setFieldValue("lastname", latestValues.lastname.trim()),
    ]);
  };

  const handleSubmit = useCallback(async () => {
    await transformFormikValues(formik);

    const formValues = await formik.submitForm();
    if (!formValues) return;

    setIsLoading(true);
    const valuesToPost = deepCopy(formValues);

    // Date is but should not be in dd-mm-yyyy form, server accepts dd/mm/yyyy format
    valuesToPost.birth_date = valuesToPost.birth_date
      ? valuesToPost.birth_date.replaceAll("-", "/")
      : null;

    if (!valuesToPost.country_id || !valuesToPost.country_id.id) valuesToPost.country_id = null;
    else valuesToPost.country_id = valuesToPost.country_id.id;

    // If values were in imperial, we convert them to metric and send them to server
    for (let field of Object.keys(valuesToPost)) {
      if (userUnitSystem === 1) {
        if (field === "height" || field === "inseam") {
          valuesToPost[field] = convertImperialToMetic.ft2cm(+valuesToPost[field]);
        } else if (field === "weight") {
          valuesToPost[field] = convertImperialToMetic.lb2kg(+valuesToPost[field]);
        }
      }
    }

    // This tells the server that it's a profile edit, and not the second form in registration
    valuesToPost.type = "edit";

    try {
      const res = await updateUserProfileData(valuesToPost);
      toast.success("Your profile has been edited successfully!");
      dispatch(userDataPending());
    } catch (error) {
      if (error?.response?.status === 500)
        toast.error("Sorry, the server is currently unavailable. Try again later.");
      else if (error?.response?.status === 403)
        console.log(error)
      else toast.error("Check your network connection.");
    } finally {
      setIsLoading(false);

      // Closing the modal
      document.getElementsByTagName("body")[0].style.overflow = "auto";
      onClose();
    }
  }, [userUnitSystem, dispatch, onClose]); // formik is not a dependency

  return (
    <WhiteShadowCard className="rounded-lg">
      <form>
        <div className="grid sm:gap-x-20 gap-y-8 grid-cols-6">
          <div className="col-span-6 sm:col-span-3">
            <Input formik={formik} name="name" label="First Name" />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Input formik={formik} name="lastname" label="Last Name" />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Input formik={formik} name="birth_date" label="Birth Date" type="date" />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <NireekaCombobox
              formik={formik}
              name="country_id"
              label="Country"
              list={countries}
              defaultSelected={userData.country}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <RadioGroupInput
              formik={formik}
              label="Gender"
              name="gender"
              radioOptions={genderRadioOptions}
              inlineOptions
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Input
              formik={formik}
              name="height"
              type="number"
              label={`Height ${userUnitSystem === METRIC_SYSTEM ? "(cm)" : "(ft)"}`}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Input
              formik={formik}
              name="weight"
              type="number"
              label={`Weight ${userUnitSystem === METRIC_SYSTEM ? "(kg)" : "(lbs)"}`}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Input
              formik={formik}
              name="inseam"
              type="number"
              label={`Inseam ${userUnitSystem === METRIC_SYSTEM ? "(cm)" : "(ft)"}`}
            />
          </div>

          {/* Unit change */}

          <div className="col-span-6 sm:col-span-3">
            <div className="mt-1 text-sm text-gray-900">
              <label className="text-sm font-medium text-gray-700 mb-4 flex space-x-4 items-center">
                <span>Unit System</span>
                {isUnitChangeLoading && <LoadingNireeka className="w-4 h-4 border-gray-600" />}
              </label>
              <span className="inline-flex items-center mr-4 cursor-pointer">
                <input
                  id="metric-unit-checkbox"
                  type="radio"
                  value="0"
                  name="unit-checkbox"
                  className="cursor-pointer"
                  onChange={handleUnitCheckboxChange}
                  defaultChecked={userUnitSystem === METRIC_SYSTEM}
                />
                <label htmlFor="metric-unit-checkbox" className="ml-1 cursor-pointer">
                  Metric
                </label>
              </span>
              <span className="inline-flex items-center mr-4 cursor-pointer">
                <input
                  id="imperial-unit-checkbox"
                  type="radio"
                  value="1"
                  name="unit-checkbox"
                  className="cursor-pointer"
                  onChange={handleUnitCheckboxChange}
                  defaultChecked={userUnitSystem === 1}
                />
                <label htmlFor="imperial-unit-checkbox" className="ml-1 cursor-pointer">
                  Imperial
                </label>
              </span>
            </div>
          </div>
        </div>
      </form>
      <div className="flex mt-6 space-x-3 justify-end">
        <WhiteButton
          onClick={() => {
            document.getElementsByTagName("body")[0].style.overflow = "auto";
            onClose();
          }}
          disabled={isLoading}
        >
          Cancel
        </WhiteButton>
        <PrimaryButton onClick={handleSubmit} disabled={isLoading} className="space-x-3">
          {isLoading && <LoadingNireeka className="w-4 h-4" />}
          <span>{isLoading ? "Updating..." : "Edit"}</span>
        </PrimaryButton>
      </div>
    </WhiteShadowCard>
  );
};

export default EditProfileModal;
