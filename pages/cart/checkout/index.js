import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { getCheckoutPending, getCountriesPending } from "app/store/checkoutSlice";
import CheckoutShoppingCart from "@/components/CheckOut/CheckoutShoppingCart";
import * as Yup from "yup";
import { postCheckoutData, postPaymentGuestData } from "app/api/checkout";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import {
  PAYMENT_CREDIT,
  PAYMENT_PARTIALLY,
  PAYMENT_PAYBRIGHT,
  PAYMENT_PAYPAL,
  PAYMENT_STRIPE,
} from "app/constants/paymentMethods";
import { checkoutKeys } from "app/constants/localStorageKeys";
import LoadingNireeka from "@/components/Atoms/LoadingNireeka";
import CheckoutAddressForms from "@/components/CheckOut/CheckoutAddressForms";
import { getParameterValueByNameInURL } from "functions/url";
import { getCartPending } from "app/store/cartServer";
import Head from "next/head";
import { deepCopy } from "functions/convertors";
import { useRouter } from "next/router";
import { savePaymentAccessToken } from "../../../services/AuthService";
import scrollTo, { scrollToTargetAdjusted } from "../../../functions/scrollTo";

const LoadingPage = () => (
  <div className="flex items-center justify-center h-screen">
    <LoadingNireeka className="w-16 h-16 border-gray-700" />
  </div>
);

/* Formik Validation Object */
const validationSchema = (hasEmail, stateCountrySelect) =>
  Yup.object({
    name: Yup.string().required("Name is required").min(2, "Name is too short"),
    lastname: Yup.string().required("Last Name is required").min(3, "Last Name is too short"),
    phone: Yup.string()
      // .matches(/^[0-9]+$/, "Must contain only digits")
      .min(5, "Phone number is too short")
      .required("A phone number is required"),
    email: hasEmail ? Yup.string().required("Email is required").email("Email is incorrect") : undefined,
    address: Yup.string().required("Address is required").min(4, "Address is too short"),
    unit: Yup.string(),
    country: Yup.object()
      .shape({
        title: Yup.string().min(0, "Country is required"),
        id: Yup.number().min(0, "Country is required"), // id of the selected country in AddressForm has been initialized to -1
        code: Yup.string().min(2, "Country is required").max(2, "Country is required"),
      })
      .nullable()
      .required("Country is required"),
    city: Yup.string().required("City is required").min(1, "City is too short"),
    state: Yup.string().required("State is required").min(1, "State is too short"),
    zipcode: Yup.string().required("Zip Code is required").min(1, "Zip Code is too short"),
  });

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [passValue, setPassValue] = useState({
    enteredPromoCode: "", // entered valid promo code
    isCreditCheckboxSelected: false, // true if checkbox is selected, false if not selected, and null if credit is negative
    payment_type: "", // payment method, one of in checkoutData.payments_type
  });
  const [isShippingAndBillingAddressTheSame, setIsShippingAndBillingAddressTheSame] = useState(true);
  const [isCreateNewBillingAddressVisible, setIsCreateNewBillingAddressVisible] = useState(false);
  const [isCreateNewShippingAddressVisible, setIsCreateNewShippingAddressVisible] = useState(false);
  const [isCheckoutButtonLoading, setIsCheckoutButtonLoading] = useState(false);

  const [stateCountrySelect, setStateCountrySelect] = useState(null);

  console.log(stateCountrySelect);
  //debugger;

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const isUserDataLoading = useSelector((state) => state.auth.isUserDataLoading);
  const userData = useSelector((state) => state.auth.userData);
  const cartGuestItems = useSelector((state) => state.cart?.cartItems);
  const checkoutData = useSelector((state) => state.checkout.checkoutData);
  const isGetCheckoutLoading = useSelector((state) => state.checkout.isGetCheckoutLoading);
  const selectedBillingAddress = useSelector((state) => state.checkout.selectedBillingAddress);
  const selectedShippingAddress = useSelector((state) => state.checkout.selectedShippingAddress);

  const billingFormik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      phone: "",
      email: "",
      country: { title: "", id: -1 },
      address: "",
      unit: "",
      city: "",
      state: "",
      // state2: { title: "", id: -1 },
      zipcode: "",
    },
    onSubmit: (values) => values,
    validateOnBlur: false,
    validateOnChange: true,
    validationSchema: validationSchema(!isUserLoggedIn, stateCountrySelect),
  });

  const shippingFormik = useFormik({
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
    validateOnChange: true,
    validationSchema: validationSchema(false),
  });

  useEffect(() => {
    dispatch(getCheckoutPending());
    dispatch(getCountriesPending());
    if (isUserLoggedIn && !!userData) {
      dispatch(getCartPending());
    }
  }, [dispatch, isUserLoggedIn, userData]);

  const handleCheckoutSubmit = async () => {
    setIsCheckoutButtonLoading(true);
    let billingAddress = selectedBillingAddress;
    let shippingAddress;

    if (isCreateNewBillingAddressVisible) billingAddress = await billingFormik.submitForm();

    if (!billingAddress) {
      setIsCheckoutButtonLoading(false);
      scrollToTargetAdjusted("#formError", 300);
      return;
    }

    if (!isShippingAndBillingAddressTheSame)
      if (isCreateNewShippingAddressVisible) shippingAddress = await shippingFormik.submitForm();
      else shippingAddress = selectedShippingAddress;
    else shippingAddress = billingAddress;

    if (!shippingAddress) {
      setIsCheckoutButtonLoading(false);
      scrollToTargetAdjusted("#formError", 300);
      return;
    }

    const dataToPostToServer = {
      code: `${passValue.enteredPromoCode}`,
      credit: isUserLoggedIn ? passValue.isCreditCheckboxSelected : undefined,
      payment_type: `${passValue.payment_type}`,
    };

    // Addresses
    if (isShippingAndBillingAddressTheSame) {
      if (isCreateNewBillingAddressVisible) {
        dataToPostToServer.billing = deepCopy(billingAddress);
        dataToPostToServer.billing.country = billingAddress.country.id;

        dataToPostToServer.shipping = deepCopy(dataToPostToServer.billing);
        if (isUserLoggedIn) dataToPostToServer.method = "new";
      } else {
        dataToPostToServer.address_id = billingAddress.id;
      }
    } else {
      // Billing Address
      if (isCreateNewBillingAddressVisible) {
        dataToPostToServer.billing = deepCopy(billingAddress);
        dataToPostToServer.billing.country = billingAddress.country.id;
      } else {
        dataToPostToServer.b_address_id = billingAddress.id;
      }

      // Shipping Address
      if (isCreateNewShippingAddressVisible) {
        dataToPostToServer.shipping = deepCopy(shippingAddress);
        dataToPostToServer.shipping.country = shippingAddress.country.id;
      } else {
        dataToPostToServer.sh_address_id = shippingAddress.id;
      }

      if (isCreateNewBillingAddressVisible && isCreateNewShippingAddressVisible) {
        dataToPostToServer.method = "new";
      }
    }

    try {
      let response;
      if (isUserLoggedIn) response = await postCheckoutData(dataToPostToServer);
      else {
        dataToPostToServer.email = dataToPostToServer?.billing?.email;
        dataToPostToServer.carts = cartGuestItems?.map(
          (product) =>
            product?.server || {
              product_id: product?.id,
              count: product?.cartQuantity,
            }
        );
        response = await postPaymentGuestData(dataToPostToServer);
        await savePaymentAccessToken(response?.data?.access_token);
      }
      const responseData = response?.data;
      const paymentDataToSave = {
        orderId: responseData.order_id,
        paymentMethod: passValue.payment_type,
        grandTotal: passValue.grandTotal,
      };

      if (responseData) {
        if (
          passValue.payment_type === PAYMENT_CREDIT ||
          passValue.payment_type === PAYMENT_PARTIALLY ||
          passValue.payment_type === PAYMENT_PAYBRIGHT
        ) {
          paymentDataToSave.code = responseData.code;
        } else if (passValue.payment_type === PAYMENT_STRIPE) {
          paymentDataToSave.sessionId = responseData.order_reference;
        } else if (passValue.payment_type === PAYMENT_PAYPAL) {
          const token = getParameterValueByNameInURL("token", responseData.payment_link);
          paymentDataToSave.token = token;
        } else {
          console.log("ERROR: INVALID PAYMENT METHOD:", passValue.payment_type);
          throw new Error("Payment method is invalid.");
        }

        // Saving some data, so we can retrieve it in checkout callback page
        window.localStorage.setItem(checkoutKeys.PAYMENT_DATA, JSON.stringify(paymentDataToSave));
        if (!responseData?.payment_link?.length && responseData?.order_reference === PAYMENT_CREDIT) {
          router.push("/cart/checkout/response");
          return;
        }
        if (
          passValue.payment_type === PAYMENT_CREDIT ||
          passValue.payment_type === PAYMENT_PARTIALLY ||
          passValue.payment_type === PAYMENT_PAYPAL
        ) {
          window.location.href = responseData.payment_link;
        } else if (passValue.payment_type === PAYMENT_PAYBRIGHT) {
          const newWindow = window.open("", "_self");
          newWindow.document.write(responseData.payment_link);
        } else if (passValue.payment_type === PAYMENT_STRIPE) {
          const stripe = await loadStripe(checkoutData.stripe);
          return stripe.redirectToCheckout({
            sessionId: responseData.payment_link,
          });
        } else {
          console.log("ERROR: INVALID PAYMENT METHOD:", passValue.payment_type);
          throw new Error("Payment method is invalid.");
        }
      } else {
        throw new Error("Response data from server was not found.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Sorry, we couldn't check. Try again later.");
      }
    } finally {
      setIsCheckoutButtonLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Checkout - Nireeka</title>
      </Head>
      {!isUserDataLoading && !isGetCheckoutLoading ? (
        <div className="px-2 mx-auto max-w-8xl sm:px-6 lg:px-8 lg:py-8">
          <div className="grid grid-cols-6 pb-16 md:pb-12">
            {/* Forms */}
            <div className="col-span-6 py-8 mx-2 space-y-10 lg:col-span-4 sm:mx-4 lg:py-0 md:pr-8 lg:pr-16">
              <CheckoutAddressForms
                billingFormik={billingFormik}
                shippingFormik={shippingFormik}
                showGuestForm={!isUserLoggedIn}
                isShippingAndBillingAddressTheSame={isShippingAndBillingAddressTheSame}
                setIsShippingAndBillingAddressTheSame={setIsShippingAndBillingAddressTheSame}
                isCreateNewBillingAddressVisible={isCreateNewBillingAddressVisible}
                setIsCreateNewBillingAddressVisible={setIsCreateNewBillingAddressVisible}
                isCreateNewShippingAddressVisible={isCreateNewShippingAddressVisible}
                setIsCreateNewShippingAddressVisible={setIsCreateNewShippingAddressVisible}
                stateCountrySelect={stateCountrySelect}
                setStateCountrySelect={setStateCountrySelect}
              />
            </div>
            {/* Right column (Cart data and checkout billing) */}
            <div className="col-span-6 lg:col-span-2">
              <div className="w-full bg-gray-100 shadow-lg sm:rounded-tl-lg">
                <CheckoutShoppingCart
                  initialCheckoutData={checkoutData}
                  passValue={passValue}
                  setPassValue={setPassValue}
                  onCheckoutSubmit={handleCheckoutSubmit}
                  isCheckoutButtonLoading={isCheckoutButtonLoading}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
