import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import classNames from "../../../functions/classNames";
import PromoCodeCardOldSite from "./PromoCodeCardOldSite";

export default function ConfiguratorPromoCodesOldSite(props) {
  const [isCouponDropdownVisible, setIsCouponDropdownVisible] = useState(false);

  const totalPrice = useSelector((state) => state.configurator.totalPrice);

  return (
    <>
      <div className="flex flex-col pt-8">
        <span className="text-xl font-light">Discount</span>
        <div className="flex relative pb-8 mt-5 border-b">
          <div className="bg-orange-400 border-x-2 border-dashed p-2 flex-grow mr-4">
          <span className="text-white font-light text-sm">
            USD <span className="font-medium">${props.codes[0].discount}</span> off on USD{" "}
            <span className="font-medium">${props.codes[0].max_price}</span>
          </span>
          </div>
          <div className="flex items-center justify-center">
          <span
              className="text-blue-400 cursor-pointer text-sm"
              onClick={() => setIsCouponDropdownVisible(true)}
          >
            Get coupons
          </span>
          </div>
          <Transition
              show={isCouponDropdownVisible}
              as={Fragment}
              enter="transition ease-out duration-300"
              enterFrom="transform opacity-0 scale-90"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
          >
            <div className="absolute right-0 bg-white z-20 top-16 px-5 py-5 rounded-xl min-w-full">
              {/* Upward Triangle */}
              <div className="absolute -top-3 w-0 h-0 border-x-[10px] border-x-transparent border-b-[15px] border-b-white"></div>
              <span className="text-sm text-gray-400">
              Store Coupons (Excluding Shipping cost &amp; VAT)
            </span>
              {props.codes.map((code, index) => (
                  <PromoCodeCardOldSite
                      key={index}
                      discount={code.discount}
                      maxPrice={code.max_price}
                      promoCode={code.code}
                      isEligible={totalPrice > code.max_price}
                      totalPrice={totalPrice}
                      className="border-b border-gray-700 border-dashed last:border-b-0 pb-2 mt-2"
                  />
              ))}
            </div>
          </Transition>
        </div>
      </div>

      {isCouponDropdownVisible && (
        <div
          className="fixed top-0 right-0 left-0 bottom-0 bg-black/50 cursor-pointer z-10"
          onClick={() => setIsCouponDropdownVisible(false)}
        ></div>
      )}
    </>
  );
}
