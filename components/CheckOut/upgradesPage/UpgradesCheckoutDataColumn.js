import LoadingNireeka from "@/components/Atoms/LoadingNireeka";
import classNames from "functions/classNames";
import { commafy } from "functions/numbers";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PaymentMethods from "../PaymentMethods";
import CheckoutUpgradeListItem from "./CheckoutUpgradeListItem";
import CheckoutAggrement from "@/components/CheckOut/CheckoutAggrement";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import {XIcon} from "@heroicons/react/outline";
import BlurBackdrop from "@/components/Atoms/overlays/BlurBackdrop";

const UpgradesCheckoutDataColumn = (props) => {
  // Bill Values
  const [cartTotal, setCartTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [aggrement, setAggrement] = useState(false);
  const [aggrementError, setAggrementError] = useState(false);
  const [showAggrementErrorModal, setShowAggrementErrorModal] = useState(false);

  // Destructing, because they're a useEffect dependency
  const { setPassValue } = props;

  const handleCreditCheckboxChange = () => {
    if (props.credit <= 0) return; // In this case, calling this method is impossible from UI, because there is no checkbox. But just in case :)

    setPassValue((preValue) => {
      return {
        ...preValue,
        isCreditCheckboxSelected: !preValue.isCreditCheckboxSelected,
      };
    });
  };

  useEffect(() => {
    if (!props.cartItems.upgrades) return;

    let cartTotal = 0;
    // Calculating cart total and shipping fee
    for (let i = 0; i < props.cartItems.upgrades.length; i++)
      cartTotal += +props.cartItems.upgrades[i].price;

    setCartTotal(cartTotal);

    let grandTotalToSet = cartTotal + props.vat;

    // Calculating credit
    // If negative, it's automatically calculated,
    // if positive, we look for the checkbox status
    if (props.credit < 0) grandTotalToSet -= +props.credit;
    else if (props.passValue.isCreditCheckboxSelected) grandTotalToSet -= +props.credit;

    setGrandTotal(grandTotalToSet);
    setPassValue((prevValues) => {
      return { ...prevValues, grandTotal: grandTotalToSet };
    });
  }, [
    props.cartItems.upgrades,
    props.credit,
    props.passValue.isCreditCheckboxSelected,
    props.vat,
    setPassValue,
  ]);

  const toogleErrorAggrement = () => {
    if(showAggrementErrorModal) document.getElementsByTagName("body")[0].style.overflow = "auto";
    setShowAggrementErrorModal(prevState => !prevState);
  }

  const showErrorAggrement = () => {
    setAggrementError(true);
    setShowAggrementErrorModal(true)
  }

  const onAccept = () => {
    setAggrementError(true);
    toogleErrorAggrement()
    setAggrement(true)
  }

  useEffect(() => {
    if(aggrement && aggrementError)
      setAggrementError(false)
  }, [aggrement])

  return (
    <div className="flex flex-col py-2 divide-y sm:py-2">
      {/* Shopping Cart */}
      <div className="px-4 sm:py-2 sm:px-6">
        <div className="flex items-start justify-between">
          <span className="text-lg font-light text-gray-900">Shopping cart</span>
        </div>

        <div className="flow-root overflow-auto scrollbar-thumb-zinc-400 hover:scrollbar-thumb-customGrayBorder">
          <CheckoutUpgradeListItem item={props.cartItems} />
        </div>
      </div>

      {/* Billing */}
      <div className="px-4 sm:py-2 sm:px-6">
        <div className="flex justify-between py-2 text-sm font-light text-gray-900 sm:text-base">
          <span>Subtotal</span>
          <span>${commafy(cartTotal)}</span>
        </div>
        {/* Vat & Duties */}
        {props.vat !== 0 && (
          <div className="flex justify-between py-2 text-sm font-light text-gray-900 sm:text-base">
            <span className="flex items-center">
              VAT &amp; Duties
              <Link href="/help-center/topic/taxes-duties-vat">
                <a target="_blank" className="mx-1 text-xs text-blue-600 hover:text-blue-400">
                  (Check more details)
                </a>
              </Link>
            </span>
            <span>${commafy(props.vat)}</span>
          </div>
        )}
        {/* Credit */}
        {!!props.credit && props.credit !== 0 && (
          <div className="flex justify-between py-2 text-sm font-light text-gray-900 sm:text-base">
            <div className="text-sm">
              <legend className="sr-only">Credit</legend>
              <label
                htmlFor="credit"
                className="flex items-center justify-between text-sm font-light text-gray-900 cursor-pointer sm:text-base"
              >
                {props.credit > 0 && (
                  <div className="flex items-center h-5 mr-3">
                    <input
                      id="credit"
                      aria-describedby="Credit-description"
                      name="credit"
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 "
                      checked={props.passValue.isCreditCheckboxSelected}
                      onChange={handleCreditCheckboxChange}
                    />
                  </div>
                )}
                Your Credit
              </label>
            </div>
            <div
              id="comments-description"
              className={classNames(
                "flex justify-between",
                props.passValue.isCreditCheckboxSelected ? "text-nireekaGreen" : "text-gray-400",
                props.credit < 0 && "text-red-600"
              )}
            >
              <span>
                {props.credit < 0 && "-"}${commafy(Math.abs(props.credit))}
              </span>
            </div>
          </div>
        )}

        {/* Shipping and Delivery Dates */}
        <div className="flex py-2 text-sm font-light text-gray-900 sm:text-base">
          <span className="text-sm flex flex-col">
            <span>The upgrade(s) will be installed and shipped along with your bike.</span>
            <span>
              <Link href="/help-center/topic/103/what-are-upgrades" target="_blank" passHref>
                <a target="_blank" className="text-blue-700 hover:underline">
                  Click here
                </a>
              </Link>{" "}
              for more information.
            </span>
          </span>
        </div>

        {/* Grand Total */}
        <div className="flex justify-between py-2 mt-5 text-sm font-medium text-gray-900 sm:text-base">
          <span>Grand Total</span>
          <span>${grandTotal > 0 ? commafy(grandTotal) : 0}</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="px-4 sm:py-2 sm:px-6">
        <PaymentMethods
          disabled={grandTotal <= 0}
          setPassValue={setPassValue}
          selectedCountryBilling={props.address.country}
          methods={props.paymentMethods || []}
        />
      </div>
      <div className="px-4 sm:py-2 sm:px-6">
        <div className="flex items-start font-light pt-6 pb-3">
          <input
              id="aggrement"
              name="aggrement"
              value="aggrement"
              onChange={(e) => setAggrement(e.target.checked)}
              type="checkbox"
              checked={aggrement}
              className="w-4 h-4 mt-1 rounded cursor-pointer"
          />
          <label className="ml-3">
            <CheckoutAggrement textColor={aggrementError ? 'text-red-600' : 'text-gray-800'} />
          </label>
        </div>
        <div className="flex items-center justify-center">
          <button
            form="checkoutForm"
            className={classNames(
                "flex items-center justify-center w-full border rounded-lg cursor-pointer py-2 sm:my-2",
                "border-nireekaGreen hover:text-nireekaGreen hover:bg-white text-white bg-nireekaGreen",
                "disabled:border-gray-500 disabled:text-gray-500 disabled:hover:bg-transparent",
                !aggrement ? "!border-gray-500 !text-gray-500 hover:!bg-transparent bg-transparent" : '',
              props.isCheckoutButtonLoading && "cursor-wait"
            )}
            disabled={props.isCheckoutButtonLoading}
            onClick={aggrement ? props.onCheckoutSubmit : showErrorAggrement}
          >
            {props.isCheckoutButtonLoading ? (
              <>
                <LoadingNireeka className="w-4 h-4 mr-2 border-gray-500" />
                <span>Please wait...</span>
              </>
            ) : (
              <span className="text-xs font-light  sm:text-sm">Checkout</span>
            )}
          </button>
        </div>
      </div>
      <BlurBackdrop
          isVisible={showAggrementErrorModal}
          onClose={toogleErrorAggrement}
          backdropColorClass="bg-black/40"
          noXButton
          className="relative w-full mx-auto h-inherit top-7 md:max-w-3xl"
          customStyle={{ width: "calc(100% - 1rem)", overflowY: "hidden" }}
      >
        <WhiteShadowCard>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-[14px] text-gray-900">
              Aggrement
            </h2>
            <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={toogleErrorAggrement}
            >
              <span className="sr-only">Close</span>
              <XIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <h3 className="my-8 text-xl font-light text-center text-gray-700">
            <CheckoutAggrement />
          </h3>
          <div className="flex flex-col sm:flex-row-reverse items-center space-y-4 sm:space-y-0 justify-between mt-8">
            <button onClick={onAccept} type="button" className="px-4 py-2 text-sm font-medium w-full sm:w-fit text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
              Accept
            </button>
            <button onClick={toogleErrorAggrement} type="button"
                    className="px-4 py-2 w-full sm:w-fit text-sm font-medium bg-white text-red-600 border border-red-600 rounded-md shadow-sm hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
              Deny
            </button>
          </div>
        </WhiteShadowCard>
      </BlurBackdrop>
    </div>
  );
};

export default UpgradesCheckoutDataColumn;
