import { useRef } from "react";
import { toast } from "react-toastify";
import classNames from "../../../functions/classNames";
import { generateRandomText } from "../../../functions/generators";
import { commafy } from "../../../functions/numbers";

const randomFakePromoCode = generateRandomText(8);
export default function PromoCodeCard(props) {
  const promoCodeRef = useRef();

  const handleCopyPromoCodeClick = () => {
    navigator.clipboard.writeText(promoCodeRef.current.innerText);
    toast.success("Code was copied to the clipboard successfully.");
  };

  return (
    <div
      className={classNames(
        "border border-gray-900 rounded-2xl py-4 shadow-lg flex w-fit",
        props.className
      )}
    >
      <div className="basis-[60%] px-4 space-y-2">
        <p className="text-2xl font-light">
          ${commafy(props.discount)} OFF
        </p>
        <p className="text-sm text-gray-900">
          Orders over ${commafy(props.maxPrice)}
        </p>
        <p className="text-sm text-gray-600">
          {props.isEligible
            ? "This promo code is available for you."
            : "You're not eligible for this promo code yet."}
        </p>
      </div>
      <div className="basis-[40%] flex flex-col justify-center items-center border-l-2 border-gray-300 border-dashed px-4">
        <p
          className={classNames(
            "text-blue-600 font-medium text-2xl",
            !props.isEligible && "blur"
          )}
          ref={promoCodeRef}
        >
          {props.isEligible ? props.promoCode : randomFakePromoCode}
        </p>
        {!!props.isEligible && (
          <p
            className="text-sm text-gray-600 cursor-pointer"
            onClick={handleCopyPromoCodeClick}
          >
            Click to copy
          </p>
        )}
      </div>
    </div>
  );
}
