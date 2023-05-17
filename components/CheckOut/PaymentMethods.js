import Image from "next/image";

import PartiallyIcon from "../../public/images/partially.png";
import PayBrightIcon from "../../public/images/pay-bright.svg";
import AllCreditCardsIcon from "../../public/images/credit_cards/all_credit_cards.png";
import PayPalIcon from "../../public/images/paypal.png";
import {
  PAYMENT_PARTIALLY,
  PAYMENT_PAYBRIGHT,
  PAYMENT_PAYPAL,
  PAYMENT_STRIPE,
} from "../../app/constants/paymentMethods";
import { useEffect, useState } from "react";
import classNames from "../../functions/classNames";

const paymentMethods = [
  {
    id: 1,
    title: "Credit/Debit card",
    description: "",
    icon: AllCreditCardsIcon,
    name: PAYMENT_STRIPE,
    imgContainerClassName: "w-40",
  },
  {
    id: 2,
    title: "PayPal",
    description: "",
    icon: PayPalIcon,
    name: PAYMENT_PAYPAL,
    imgContainerClassName: "w-20",
  },
  {
    id: 3,
    title: "Pay Monthly",
    description: "3-Months",
    icon: PartiallyIcon,
    name: PAYMENT_PARTIALLY,
    imgContainerClassName: "w-28",
  },
  {
    id: 4,
    title: "Pay Monthly",
    description: "12-Months for Canadians Only",
    icon: PayBrightIcon,
    name: PAYMENT_PAYBRIGHT,
    imgContainerClassName: "w-20",
  },
];

export default function PaymentMethods(props) {
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);

  // Destructuring setPassValue, because it's a useEffect dependency
  const { setPassValue } = props;

  const handlePaymentMethodChange = (paymentMethod) => {
    if (paymentMethod.name === selectedMethod.name) return;

    setSelectedMethod(paymentMethod);
  };

  // If user selects canada, then select PayBright and then after that change their country, we deselect PayBright
  useEffect(() => {
    if (
      selectedMethod.name === PAYMENT_PAYBRIGHT &&
      props.selectedCountryBilling.code.toLowerCase() !== "ca"
    ) {
      setSelectedMethod(paymentMethods[0]);
    }
  }, [props.selectedCountryBilling, selectedMethod]);

  useEffect(() => {
    setPassValue((prevValue) => {
      return { ...prevValue, payment_type: selectedMethod.name };
    });
  }, [setPassValue, selectedMethod.name]);

  return (
    <div className="my-2">
      <span className="text-sm sm:text-base font-light text-gray-900 block py-4 mt-1">
        Select your preferred payment method:
      </span>
      <div className="grid grid-cols-2 gap-2">
        {paymentMethods
          .filter((method) => props.methods.includes(method.name))
          .map((method) => {
            const isPayBrightDisabled = props?.disabled || (method.name === PAYMENT_PAYBRIGHT && (!props.selectedCountryBilling || props.selectedCountryBilling.code.toLowerCase() !== "ca"));
            return (
              <div
                key={method.id}
                onClick={isPayBrightDisabled ? undefined : () => handlePaymentMethodChange(method)}
                className={classNames(
                  selectedMethod.name === method.name && !isPayBrightDisabled ? "border-blue-800" : "border-gray-300",
                  "col-span-1 border cursor-pointer rounded-lg flex flex-col justify-around my-1 h-28 p-3 text-center",
                  isPayBrightDisabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"
                )}
              >
                <div className="flex justify-center my-0">
                  <span className="text-xs font-normal sm:text-sm">{method.title}</span>
                </div>
                <div className="flex items-center justify-center my-0">
                  <span className="px-2 text-xs font-light text-center text-gray-400 md:text-sm lg:text-xs xl:text-sm xl:mx-1">
                    {method.description}
                  </span>
                </div>
                <div className="flex justify-center w-full">
                  <div
                    className={classNames(
                      "flex items-center justify-center",
                      method.imgContainerClassName
                    )}
                  >
                    <Image src={method.icon} alt={method.title} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
