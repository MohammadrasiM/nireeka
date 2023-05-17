import LoadingNireeka from "@/components/Atoms/LoadingNireeka";
import { loadStripe } from "@stripe/stripe-js";
import { tryToPayUnpaidOrderByOrderId } from "app/api/user/finance";
import { checkoutKeys } from "app/constants/localStorageKeys";
import { EXPIRED_UNPAID_ORDER, PAYABLE_UNPAID_ORDER } from "app/constants/orders";
import { PAYMENT_STRIPE } from "app/constants/paymentMethods";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import classNames from "../../../functions/classNames";
import { commafy } from "../../../functions/numbers";
import PaymentRecordMenu from "./PaymentRecordMenu";

const PaymentTableRow = (props) => {
  const [isRetryPayLoading, setIsRetryPayLoading] = useState(false);

  const handlePayNowClick = async () => {
    try {
      setIsRetryPayLoading(true);
      const response = await tryToPayUnpaidOrderByOrderId(props.payment.id);
      const responseData = response.data;

      const paymentDataToSave = {
        orderId: responseData.order_id,
        paymentMethod: PAYMENT_STRIPE,
        grandTotal: props.payment.amount,
        sessionId: responseData.order_reference,
      };

      window.localStorage.setItem(checkoutKeys.PAYMENT_DATA, JSON.stringify(paymentDataToSave));

      try {
        const stripe = await loadStripe(responseData.stripe);
        return stripe.redirectToCheckout({
          sessionId: responseData.order_reference,
        });
      } catch (error) {
        toast.error("Couldn't connect to Stripe gateway. Try again later.");
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsRetryPayLoading(false);
    }
  };
  return (
    <tr className={classNames("bg-white", props.className)}>
      <td className="max-w-0 w-full px-6 py-4 text-sm text-gray-900">
        <div className="flex">
          <span href="#" className="group inline-flex space-x-2 text-sm">
            <p className="text-gray-900 group-hover:text-gray-900 font-medium">{props.payment.id}</p>
          </span>
        </div>
      </td>
      <td className="px-4 py-2 text-right text-sm text-gray-500">
        <div className="flex">
          <span className="group inline-flex space-x-2 justify-between items-center text-sm">
            {!!props.payment.payment_methods.logo && (
              <span className="flex items-center relative w-14 h-14">
                <Image
                  width={50}
                  height={50}
                  alt={props.payment.payment_methods.name}
                  src={props.payment.payment_methods.logo}
                  objectFit="contain"
                />
              </span>
            )}
            {!props.payment.payment_methods.number_card && (
              <span className="text-gray-900 group-hover:text-gray-900 text-right ml-auto">
                {props.payment.payment_methods.number_card.substring(
                  props.payment.payment_methods.number_card.length - 4
                )}
              </span>
            )}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
        <span className="text-gray-900 font-medium">${commafy(props.payment.amount)}</span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 space-y-3">
        <span
          className={classNames(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            props.payment.status.toLowerCase() === "paid"
              ? "bg-green-100 text-green-800"
              : props.payment.status.toLowerCase() === "unpaid"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          )}
        >
          {" "}
          {props.payment.status}{" "}
        </span>
        {props.payment.status.toLowerCase() === "unpaid" &&
          props.payment.pay === EXPIRED_UNPAID_ORDER && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Expired
            </span>
          )}
      </td>
      <td className="px-6 py-4 text-left text-sm whitespace-nowrap text-gray-500">
        <time dateTime="2020-07-11">{props.payment.date}</time>
      </td>
      <td className="px-6 py-4 text-right text-sm text-gray-500">
        <div className="flex items-center space-x-3">
          {props.payment.status.toLowerCase() === "unpaid" &&
            props.payment.pay === PAYABLE_UNPAID_ORDER && (
              <button
                className={classNames(
                  "rounded-lg py-1 px-3 transition-colors",
                  "border border-green-700 text-green-700",
                  !isRetryPayLoading &&
                    "hover:bg-green-600 hover:text-white hover:border-green-600",
                  "disabled:border-gray-500 disabled:text-gray-500",
                  isRetryPayLoading && "cursor-wait"
                )}
                onClick={handlePayNowClick}
                disabled={isRetryPayLoading}
              >
                {!isRetryPayLoading ? (
                  <span className="whitespace-nowrap">Pay Now</span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <LoadingNireeka className="w-4 h-4 border-gray-500" />
                    <span className="whitespace-nowrap">Processing...</span>
                  </span>
                )}
              </button>
            )}
          <PaymentRecordMenu
            orderId={props.payment.id}
            paymentStatus={props.payment.status}
            onSuccess={props.onSuccess}
          />
        </div>
      </td>
    </tr>
  );
};

export default PaymentTableRow;
