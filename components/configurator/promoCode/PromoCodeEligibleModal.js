import { useRef } from "react";
import { toast } from "react-toastify";
import { commafy } from "../../../functions/numbers";
import WhiteShadowCard from "../../Atoms/cards/WhiteShadowCard";

export default function PromoCodeEligibleModal(props) {
  const promoCodeRef = useRef();

  const handleCopyPromoCodeClick = () => {
    navigator.clipboard.writeText(promoCodeRef.current.innerText);
    toast.success("Code was copied to the clipboard.");
  };

  return (
    <WhiteShadowCard>
      <div className="flex flex-col items-center">
        <span className="text-3xl text-green-700 mb-5">Congratulations!</span>
        <span className="text-center">
          Your price is <span className="font-medium">${commafy(props.totalPrice)}</span> and
          you&apos;re eligible for a <span className="font-medium">${commafy(props.discount)}</span>{" "}
          discount!
        </span>
        <span
          className="mt-10 mb-3 text-2xl font-medium text-green-700"
          ref={promoCodeRef}
          onClick={handleCopyPromoCodeClick}
        >
          {props.promoCode}
        </span>
        <span className="text-gray-700 text-sm cursor-pointer" onClick={handleCopyPromoCodeClick}>
          Click to Copy
        </span>

        <button
          onClick={() => props.onClose()}
          className="bg-blue-500 px-5 py-2 rounded-lg text-white mt-14"
        >
          Close
        </button>
      </div>
    </WhiteShadowCard>
  );
}
