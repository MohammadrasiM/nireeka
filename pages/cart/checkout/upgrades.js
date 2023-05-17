import LoadingNireeka from "@/components/Atoms/LoadingNireeka";
import ShowAddress from "@/components/CheckOut/ShowAddress";
import UpgradesCheckoutDataColumn from "@/components/CheckOut/upgradesPage/UpgradesCheckoutDataColumn";
import { loadStripe } from "@stripe/stripe-js";
import { postUpgradesCheckoutDataToServer } from "app/api/checkout/upgrades";
import { checkoutKeys } from "app/constants/localStorageKeys";
import {
  PAYMENT_CREDIT,
  PAYMENT_PARTIALLY,
  PAYMENT_PAYBRIGHT,
  PAYMENT_PAYPAL,
  PAYMENT_STRIPE,
} from "app/constants/paymentMethods";
import { getParameterValueByNameInURL } from "functions/url";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CheckoutUpgradesPage = () => {
  const router = useRouter();

  const [checkoutData, setCheckoutData] = useState(null);
  const [passValue, setPassValue] = useState({
    enteredPromoCode: "", // entered valid promo code
    isCreditCheckboxSelected: false, // true if checkbox is selected, false if not selected, and null if credit is negative
    payment_type: "", // payment method, one of in checkoutData.payments_type
  });
  const [isCheckoutButtonLoading, setIsCheckoutButtonLoading] = useState(false);
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

  useEffect(() => {
    const checkoutData = sessionStorage.getItem(checkoutKeys.UPGRADES_CHECKOUT_DATA);
    if (!checkoutData) router.push("/configurator");
    else if (!isUserLoggedIn) router.push("/login");

    setCheckoutData(JSON.parse(checkoutData));
  }, [isUserLoggedIn, router]);

  const handleCheckoutSubmit = async () => {
    setIsCheckoutButtonLoading(true);
    const dataToPostToServer = {
      credit: passValue.isCreditCheckboxSelected,
      payment_type: passValue.payment_type,
      order_bike_id: checkoutData.carts.order_bike_id,
      upgrades: checkoutData.carts.upgrades.map((upgrade) => upgrade.id),
    };

    if (!dataToPostToServer.upgrades) {
      toast.info("There is no upgrade in your cart.");
      router.push("/configurator");
      return;
    }

    try {
      const response = await postUpgradesCheckoutDataToServer(dataToPostToServer);
      const responseData = response.data;

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
      console.log(error)
    }
    setIsCheckoutButtonLoading(false);
  };

  return (
    <>
      <Head>
        <title>Checkout Upgrades - Nireeka</title>
      </Head>
      {checkoutData ? (
        <div>
          <div className="px-2 mx-auto max-w-8xl sm:px-6 lg:px-8 lg:py-8 ">
            <div className="grid grid-cols-6 pb-6 md:pb-12">
              {/* Addresses */}
              <div className="col-span-6 py-8 mx-2 space-y-10 lg:col-span-4 sm:mx-4 lg:py-0 md:pr-8 lg:pr-16">
                <div>
                  <ShowAddress title="Shipping Address" address={checkoutData.address} />

                  <div className="mt-4">
                    <span className="text-sm">
                      This is the delivery address of your bike. If you need to edit it, go ahead
                      and place the order, then edit the address in your{" "}
                      <Link href="/dashboard/profile" passHref>
                        <a className="text-blue-600 cursor-pointer hover:underline" target="_blank">
                          dashboard
                        </a>
                      </Link>
                      .
                    </span>
                  </div>
                </div>
                {/* <div>
              <span className="text-sm text-gray-700">
                Note: By closing this tab before checking out, all your new upgrades data will be lost. In that case,
                you may want to add them again from the{" "}
                <Link href="/dashboard/orders" passHref>
                  <a className="text-blue-600 cursor-pointer hover:underline">orders page</a>
                </Link>
                .
              </span>
            </div> */}
              </div>
              {/* Right column (Cart data and checkout billing) */}
              <div className="col-span-6 lg:col-span-2">
                <div className="w-full bg-gray-100 shadow-lg sm:rounded-tl-lg">
                  <UpgradesCheckoutDataColumn
                    passValue={passValue}
                    setPassValue={setPassValue}
                    address={checkoutData.address}
                    cartItems={checkoutData.carts}
                    stripeKey={checkoutData.stripe}
                    credit={checkoutData.credit}
                    vat={checkoutData.vat}
                    isCheckoutButtonLoading={isCheckoutButtonLoading}
                    onCheckoutSubmit={handleCheckoutSubmit}
                    paymentMethods={checkoutData.payments_type}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <LoadingNireeka className="w-16 h-16 border-gray-700" />
        </div>
      )}
    </>
  );
};

export default CheckoutUpgradesPage;
