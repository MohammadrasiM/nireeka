import { useEffect, useState } from "react";
import { getAddressAutoComplete, getAddressDetailsByPlaceId } from "../../app/api/checkout/address";
import classNames from "../../functions/classNames";
import NireekaCombobox from "../Atoms/inputs/NireekaCombobox";
import Input from "../common/Input";
import SelectOrInput from "../Atoms/inputs/SelectOrInput";
import { getStateCountryData } from "app/api/checkout/stateCountry";

export default function AddressFormGuest(props) {
  const [addressSuggestions, setAddressSuggestions] = useState(null);
  const [isAddressSuggestionsLoading, setAddressSuggestionsLoading] = useState(false);
  const [isAddressDetailsLoading, setAddressDetailsLoading] = useState(false);

  const { countries } = props;
  const { setStateCountrySelect } = props;

  const [filteredIdState, setFilteredIdState] = useState([]);
  //state
  const [selectedStateOption, setSelectedStateOption] = useState(null);

  const [itemState, setItemState] = useState(null);

  const getAddressSuggestions = async (searchQuery, countryCode) => {
    setAddressSuggestionsLoading(true);
    try {
      const suggestions = await getAddressAutoComplete(searchQuery, countryCode);
      setAddressSuggestions(suggestions.data);
    } catch (error) {
      setAddressSuggestions(null);
    } finally {
      setAddressSuggestionsLoading(false);
    }
  };

  useEffect(() => {
    if (!props.formik.values.address || props.formik.values.address.length < 2 || !props.formik.values.country?.code) {
      setAddressSuggestions(null);
      return;
    }

    const timeoutId = setTimeout(() => {
      getAddressSuggestions(props.formik.values.address, props.formik.values.country.code);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [props.formik.values.address, props.formik.values.country?.code]);

  const handleAddressSuggestionClick = async (selectedAddress) => {
    let addressDetailsResponse = null;
    try {
      setAddressDetailsLoading(true);
      addressDetailsResponse = await getAddressDetailsByPlaceId(selectedAddress.place_id);
    } catch (error) {
    } finally {
      setAddressSuggestions(null);
      props.formik.setFieldValue("city", "");
      props.formik.setFieldValue("state", "");
      props.formik.setFieldValue("zipcode", "");
      setAddressDetailsLoading(false);
    }

    if (addressDetailsResponse.data.city) {
      props.formik.setFieldValue("city", addressDetailsResponse.data.city);
      props.formik.setFieldTouched("state", false, false);
    } else if (addressDetailsResponse.data.town) {
      props.formik.setFieldValue("city", addressDetailsResponse.data.town);
      props.formik.setFieldTouched("state", false, false);
    } else if (addressDetailsResponse.data.village) {
      props.formik.setFieldValue("city", addressDetailsResponse.data.village);
      props.formik.setFieldTouched("state", false, false);
    }

    if (addressDetailsResponse.data.state) {
      props.formik.setFieldValue("state", addressDetailsResponse.data.state);
      props.formik.setFieldTouched("state", false, false);
    } else if (addressDetailsResponse.data.province) {
      props.formik.setFieldValue("state", addressDetailsResponse.data.province);
      props.formik.setFieldTouched("state", false, false);
    }

    if (addressDetailsResponse.data.postal_code) {
      props.formik.setFieldValue("zipcode", addressDetailsResponse.data.postal_code);
      props.formik.setFieldTouched("zipcode", false, false);
    }

    let addressFieldContent = "";
    if (addressDetailsResponse.data.street_number)
      addressFieldContent += addressDetailsResponse.data.street_number + " ";
    if (addressDetailsResponse.data.route) addressFieldContent += addressDetailsResponse.data.route;

    if (addressFieldContent === "") addressFieldContent = selectedAddress.full_name;

    props.formik.setFieldValue("address", addressFieldContent);
    props.formik.setFieldTouched("address", false, false);
  };

  useEffect(async () => {
    let response;
    if (props?.selectIdCountry?.id === 35 || props?.selectIdCountry?.id === 4) {
      console.log("props.selectIdCountry.id", props?.selectIdCountry?.id);

      response = await getStateCountryData(props?.selectIdCountry?.id);
      console.log(response.data);
      setFilteredIdState(response.data);
      setStateCountrySelect(response.data);
      debugger;
      setItemState(props?.selectIdCountry?.id);
      props.formik.setFieldValue("state", "");
    } else {
      setItemState(null);
      setSelectedStateOption(null);
      setStateCountrySelect(null);
    }
  }, [props.selectIdCountry]);
  return (
    <div className={classNames(props.className)} id="addressForm">
      <div>
        {props.title && <h3 className="text-xl leading-6">{props.title}</h3>}
        {props.description && <p className="mt-1 text-sm text-gray-500">{props.description}</p>}
      </div>
      <div className="mt-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <Input formik={props.formik} name="name" label="Name" />
        </div>

        <div className="sm:col-span-2">
          <Input formik={props.formik} name="lastname" label="Last Name" />
        </div>

        <div className="sm:col-span-2">
          <Input formik={props.formik} name="email" label="Email" />
        </div>

        <div className="sm:col-span-3">
          <Input formik={props.formik} name="phone" label="Phone" />
        </div>

        <div className="sm:col-span-3">
          {countries && (
            <NireekaCombobox
              label="Country"
              name="country"
              list={countries}
              formik={props.formik}
              defaultSelected={props.formik.values.country}
              onSelect={props.onCountrySelect}
              setSelectIdCountry={props.setSelectIdCountry}
            />
          )}
        </div>

        <div className="sm:col-span-4">
          <Input
            formik={props.formik}
            name="address"
            label="Address"
            autoComplete="off"
            suggestions={addressSuggestions}
            onAddressSuggestionClick={handleAddressSuggestionClick}
            isSuggestionsLoading={isAddressSuggestionsLoading}
          />
        </div>

        <div className="sm:col-span-2">
          <Input formik={props.formik} name="unit" label="Unit" optional />
        </div>

        <div className="sm:col-span-2">
          <Input formik={props.formik} name="city" label="City" isLoading={isAddressDetailsLoading} />
        </div>

        <div className="sm:col-span-2">
          <SelectOrInput
            options={filteredIdState}
            value={selectedStateOption?.value} // pass the string value as value prop
            onChange={(value) => handleChange({ value: value })} // pass the value as an object
            formik={props.formik}
            name="state"
            label="State / Province"
            condition={itemState === 35 || itemState === 4}
          />
        </div>

        <div className="sm:col-span-2">
          <Input formik={props.formik} name="zipcode" label="ZIP / Postal code" isLoading={isAddressDetailsLoading} />
        </div>
      </div>
    </div>
  );
}
