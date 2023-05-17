import { Switch } from "@headlessui/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBillingCountry,
  setSelectedBillingAddress,
  setSelectedShippingAddress,
} from "../../app/store/checkoutSlice";
import classNames from "../../functions/classNames";
import AddressForm from "./AddressForm";
import AddressLists from "./AddressLists";
import ShowAddress from "./ShowAddress";
import AddressFormGuest from "@/components/CheckOut/AddressFormGuest";

export default function CheckoutAddressForms(props) {
  const dispatch = useDispatch();

  const [selectIdCountry, setSelectIdCountry] = useState(null);

  const [showSwitchBetweenListOrForm, setShowSwitchBetweenListOrForm] = useState(true);
  const checkoutData = useSelector((state) => state.checkout.checkoutData);
  const selectedBillingAddress = useSelector((state) => state.checkout.selectedBillingAddress);
  const selectedShippingAddress = useSelector((state) => state.checkout.selectedShippingAddress);
  const countries = useSelector((state) => state.checkout.countries);

  // Destructing, because they're dependencies of useEffects
  const { setIsCreateNewBillingAddressVisible } = props;
  const { setIsCreateNewShippingAddressVisible } = props;
  const { setStateCountrySelect } = props;

  const handleBillingAddressSelect = useCallback(
    (selectedAddress) => {
      dispatch(setSelectedBillingAddress(selectedAddress));
    },
    [dispatch]
  );
  const handleShippingAddressSelect = useCallback(
    (selectedAddress) => {
      dispatch(setSelectedShippingAddress(selectedAddress));
    },
    [dispatch]
  );

  const handleBillingCountrySelect = useCallback(
    (selected) => {
      dispatch(setBillingCountry(selected));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!checkoutData?.addresses?.length) {
      setIsCreateNewBillingAddressVisible(true);
      setIsCreateNewShippingAddressVisible(true);
      setShowSwitchBetweenListOrForm(false);
    } else {
      setIsCreateNewBillingAddressVisible(false);
      setIsCreateNewShippingAddressVisible(false);
      setShowSwitchBetweenListOrForm(true);
    }
  }, [checkoutData?.addresses]);

  console.log(props);

  useEffect(() => {
    if (selectIdCountry) {
      console.log("selectIdCountry", selectIdCountry);
      //debugger;
    }
  }, [selectIdCountry]);

  return (
    <>
      {!props.isCreateNewBillingAddressVisible && (
        <>
          {!!checkoutData?.addresses && checkoutData?.addresses.length > 0 && (
            <div>
              <AddressLists
                addresses={checkoutData?.addresses}
                selectedAddress={selectedBillingAddress}
                onAddressSelect={handleBillingAddressSelect}
                onCountrySelect={handleBillingCountrySelect}
                label="Select an existing address:"
              />
              <div className="flex">
                <Link href="/dashboard/profile" passHref>
                  <a className="ml-auto" target="_blank">
                    <span className="text-blue-500 italic text-sm cursor-pointer hover:text-blue-700 transition-colors">
                      Manage my addresses in my profile
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          )}

          {selectedBillingAddress && <ShowAddress title="Billing Address" address={selectedBillingAddress.data} />}
        </>
      )}

      {props.isCreateNewBillingAddressVisible && (
        <>
          {props.showGuestForm ? (
            <AddressFormGuest
              title="Billing Address"
              formik={props.billingFormik}
              countries={countries}
              onCountrySelect={handleBillingCountrySelect}
              selectIdCountry={selectIdCountry}
              setSelectIdCountry={setSelectIdCountry}
              setStateCountrySelect={setStateCountrySelect}
            />
          ) : (
            <AddressForm
              title="Billing Address"
              formik={props.billingFormik}
              countries={countries}
              onCountrySelect={handleBillingCountrySelect}
              selectIdCountry={selectIdCountry}
              setSelectIdCountry={setSelectIdCountry}
              setStateCountrySelect={setStateCountrySelect}
            />
          )}
        </>
      )}

      {showSwitchBetweenListOrForm && (
        <div>
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setIsCreateNewBillingAddressVisible((prevState) => !prevState)}
          >
            Or {props.isCreateNewBillingAddressVisible ? "select an existing address" : "create a new address"}
          </span>
        </div>
      )}

      <div className="w-full mt-3 mx-0.5">
        <Switch.Group as="div" className="flex items-center justify-start mb-2">
          <Switch
            checked={props.isShippingAndBillingAddressTheSame}
            onChange={props.setIsShippingAndBillingAddressTheSame}
            className={classNames(
              props.isShippingAndBillingAddressTheSame ? "bg-indigo-600" : "bg-gray-200",
              "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200"
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                props.isShippingAndBillingAddressTheSame ? "translate-x-5" : "translate-x-0",
                "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
              )}
            />
          </Switch>
          <Switch.Label as="span" className="ml-3">
            <span className="text-xs font-light text-gray-900 cursor-pointer sm:text-sm">
              Shipping address is the same as my billing address.
            </span>
          </Switch.Label>
        </Switch.Group>
      </div>

      {!props.isShippingAndBillingAddressTheSame && (
        <>
          {!props.isCreateNewShippingAddressVisible && (
            <>
              {!!checkoutData?.addresses && checkoutData?.addresses.length > 0 && (
                <AddressLists
                  addresses={checkoutData?.addresses}
                  selectedAddress={selectedShippingAddress}
                  onAddressSelect={handleShippingAddressSelect}
                  label="Select an existing address:"
                />
              )}

              {selectedShippingAddress && (
                <ShowAddress title="Shipping Address" address={selectedShippingAddress.data} />
              )}
            </>
          )}

          {props.isCreateNewShippingAddressVisible && (
            <AddressForm title="Shipping Address" formik={props.shippingFormik} countries={countries} />
          )}

          {showSwitchBetweenListOrForm && (
            <div>
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsCreateNewShippingAddressVisible((prevState) => !prevState)}
              >
                Or {props.isCreateNewShippingAddressVisible ? "select an existing address" : "create a new address"}
              </span>
            </div>
          )}
        </>
      )}
    </>
  );
}
