import { EmojiSadIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { toast } from "react-toastify";
import {
  getPaymentResponseForOtherThanStripe,
  getPaymentResponseForPayPal,
  getPaymentResponseForStripe,
} from "../../../app/api/checkout";
import { checkoutKeys } from "../../../app/constants/localStorageKeys";
import {
  PAYMENT_CREDIT,
  PAYMENT_PARTIALLY,
  PAYMENT_PAYBRIGHT,
  PAYMENT_PAYPAL,
  PAYMENT_STRIPE,
} from "../../../app/constants/paymentMethods";
import PrimaryButton from "@/components/Atoms/buttons/PrimaryButton";
import SecondaryButton from "@/components/Atoms/buttons/SecondaryButton";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import LoadingNireeka from "@/components/Atoms/LoadingNireeka";
import {handleLoginSuccess} from "../../../services/AuthService";
import {registerSuccess} from "../../../app/store/authSlice";
import CookiesService from "../../../services/CookiesService";

export default function ResponsePage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isPageDataLoading, setIsPageDataLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState({ success: null });
  const [paymentData, setPaymentData] = useState(null);

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

  const loginAfterPayment = async () => {
    const token = CookiesService.get("access_token_payment")
    await handleLoginSuccess(token)
    dispatch(registerSuccess());
    CookiesService.remove("access_token_payment");
  }

  const getPaymentStatus = async (data) => {
    if(data?.sessionId === PAYMENT_CREDIT && data?.grandTotal <= 0) {
      setPaymentStatus((prevState) => {
        return { success: true };
      });
      setIsPageDataLoading(false);
      return;
    }
    setIsPageDataLoading(true);
    if (
      data.paymentMethod === PAYMENT_PARTIALLY ||
      data.paymentMethod === PAYMENT_PAYBRIGHT ||
      data.paymentMethod === PAYMENT_CREDIT
    ) {
      try {
        if (!data.orderId || !data.code) {
          setPaymentStatus((prevState) => {
            return { ...prevState, success: null };
          });
          return;
        }

        const res = await getPaymentResponseForOtherThanStripe(data.orderId, data.code);

        if (res.status === 200) {
          if (res.success) {
            setPaymentStatus((prevState) => {
              return { ...prevState, success: true };
            });
            loginAfterPayment();
          } else {
            setPaymentStatus((prevState) => {
              return { ...prevState, success: false };
            });
          }
        }
      } catch (error) {
        if (error && error.response && error.status === 401) {
          setPaymentStatus((prevState) => {
            return { ...prevState, success: false };
          });

          return;
        }
        console.log("ERROR: Failed to fetch payment callback for stripe: ", error, error.response);
        toast.error(
          "Sorry we couldn't retrieve your payment status. Check your orders in dashboard for more information."
        );
        setPaymentStatus((prevState) => {
          return { ...prevState, success: null };
        });
      } finally {
        setIsPageDataLoading(false);
      }
    }
    else if (data.paymentMethod === PAYMENT_STRIPE) {
      try {
        if (!data.orderId || !data.sessionId) {
          setPaymentStatus((prevState) => {
            return { ...prevState, success: null };
          });
          return;
        }

        const res = await getPaymentResponseForStripe(data.orderId, data.sessionId);

        if (res.status === 200) {
          if (res.success) {
            setPaymentStatus((prevState) => {
              return { ...prevState, success: true };
            });
            loginAfterPayment();
          } else {
            setPaymentStatus((prevState) => {
              return { ...prevState, success: false };
            });
          }
        }
      } catch (error) {
        if (error && error.response && error.status === 401) {
          setPaymentStatus((prevState) => {
            return { ...prevState, success: false };
          });

          return;
        }
        console.log("ERROR: Failed to fetch payment callback for stripe: ", error, error.response);
        toast.error(
          "Sorry we couldn't retrieve your payment status. Check your orders in dashboard for more information."
        );
        setPaymentStatus((prevState) => {
          return { ...prevState, success: null };
        });
      } finally {
        setIsPageDataLoading(false);
      }
    }
    else if (data.paymentMethod === PAYMENT_PAYPAL) {
      try {
        if (!data.token || !data.orderId) {
          setPaymentStatus((prevState) => {
            return { ...prevState, success: null };
          });
          return;
        }

        const res = await getPaymentResponseForPayPal(data.orderId, data.token);

        if (res.status === 200) {
          if (res.success) {
            setPaymentStatus((prevState) => {
              return { ...prevState, success: true };
            });
            loginAfterPayment();
          } else {
            setPaymentStatus((prevState) => {
              return { ...prevState, success: false };
            });
          }
        }
      } catch (error) {
        if (error && error.response && error.status === 401) {
          setPaymentStatus((prevState) => {
            return { ...prevState, success: false };
          });

          return;
        }
        console.log("ERROR: Failed to fetch payment callback for paypal: ", error, error.response);
        toast.error(
          "Sorry we couldn't retrieve your payment status. Check your orders in dashboard for more information."
        );
        setPaymentStatus((prevState) => {
          return { ...prevState, success: null };
        });
      } finally {
        setIsPageDataLoading(false);
      }
    }
    else if (data.paymentMethod === PAYMENT_CREDIT) {
      setPaymentStatus(() => {
        return {
          ...prevState,
          success: true,
        };
      });
    }
    else {
      console.log("ERROR: Invalid payment method: ", data.paymentMethod);
      toast.error(
        "Sorry we couldn't retrieve your payment status. Check your orders in dashboard for more information."
      );

      setPaymentStatus((prevState) => {
        return { ...prevState, success: null };
      });
    }

    setIsPageDataLoading(false);
  };

  useEffect(() => {
    if (!!paymentData) {
      setIsPageDataLoading(false);
      return;
    }

    const localStoragePaymentData = JSON.parse(
      window.localStorage.getItem(checkoutKeys.PAYMENT_DATA)
    );

    setPaymentData(localStoragePaymentData);

    if (!localStoragePaymentData) {
      if (!isUserLoggedIn) router.push("/");
      else {
        setPaymentStatus((prevState) => {
          return { ...prevState, success: null };
        });
        setIsPageDataLoading(false);
      }
    }
    else getPaymentStatus(localStoragePaymentData);
  }, []); // router is not a dependency, it might change (e.g. on paypal), but we don't really care

  if (isPageDataLoading)
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <LoadingNireeka className="w-16 h-16 border-gray-700" />
        <span>Retrieving payment status...</span>
      </div>
    );

  // If payment was unsuccessful
  if (paymentStatus.success === false)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <WhiteShadowCard className="flex flex-col items-center justify-center space-y-10">
          <Image width={100} height={100} src="/images/failure-icon.png" alt="" />
          <div className="flex flex-col items-center justify-center space-y-3">
            <span className="text-2xl text-red-600">Payment Failed!</span>
            <span className="font-light">
              This is often due to authorization procedures in the bank. Please call your bank to
              authorize the payment first.
            </span>
            <span className="font-light">
              If you&apos;ve contacted the bank already,{" "}
              <Link href="/cart/checkout" passHref target="_self">
                <a className="text-blue-600">go to checkout</a>
              </Link>{" "}
              to try again.
            </span>
            <span className="font-light">
              For your convenience, there is an alternative way. You can also transfer{" "}
              <strong>{`$${paymentData.grandTotal}`}</strong> to our <strong>PayPal</strong> account
              at <strong>tony@nireeka.com</strong> and send the receipt to{" "}
              <strong>sales@nireeka.com</strong>. Your order will be registered on our website right
              away.
            </span>
          </div>
          <div className="flex space-x-3">
            <SecondaryButton href="/dashboard/payments">View Payments</SecondaryButton>
            <PrimaryButton href="/cart/checkout">Continue to Checkout</PrimaryButton>
          </div>
        </WhiteShadowCard>
      </div>
    );

  // If payment was successful
  if (paymentStatus.success === true)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <WhiteShadowCard className="flex flex-col items-center justify-center space-y-10">
          <Image width={100} height={100} src="/images/success-icon.svg" alt="" />
          <div className="flex flex-col items-center justify-center space-y-3">
            <span className="text-2xl text-green-700">Payment Successful!</span>
            <span className="font-light">We are thrilled to have you onboard!</span>
            <span className="font-light">
              {paymentData.orderId
                ? `Go to your dashboard now to view Order No. ${paymentData.orderId}`
                : `Go to dashboard's order page to view your order status.`}
            </span>
          </div>
          <div className="flex space-x-3">
            <PrimaryButton href="/dashboard/payments?type=paid">View Order</PrimaryButton>
          </div>
        </WhiteShadowCard>
      </div>
    );

  // If payment data/status was not available for any reason
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <WhiteShadowCard className="flex flex-col items-center justify-center space-y-10">
        <EmojiSadIcon className="w-20 h-20 text-red-600 icon-stroke-width-1" />
        <div className="flex flex-col items-center justify-center space-y-3">
          <span className="text-xl">An error occurred during the payment status check.</span>
          <span className="font-light">You can check the payment status in your dashboard.</span>
          <span className="font-light">
            Also you can always open a ticket in your dashboard and contact our support team.
          </span>
        </div>
        <div className="flex space-x-3">
          <SecondaryButton href="/dashboard/support">Open a ticket</SecondaryButton>
          <PrimaryButton href="/dashboard/payments">Go to payments</PrimaryButton>
        </div>
      </WhiteShadowCard>
    </div>
  );
}
