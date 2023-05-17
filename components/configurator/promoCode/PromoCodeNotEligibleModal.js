import { commafy } from "../../../functions/numbers";
import WhiteShadowCard from "../../Atoms/cards/WhiteShadowCard";

export default function PromoCodeNotEligibleModal(props) {
  return (
    <WhiteShadowCard>
      <div className="flex flex-col items-center">
        <span className="text-3xl text-red-600 mb-5">Oops!</span>
        <span className="text-center">
          Your price is{" "}
          <span className="font-medium">${commafy(props.totalPrice)}</span>, so
          you&apos;re not eligible for a promo code yet.
        </span>
        <span className="text-center mt-2">
          You can increase it to{" "}
          <span className="font-medium">${commafy(props.maxPrice)}</span> to get
          a <span className="font-medium">${commafy(props.discount)}</span>{" "}
          discount!
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
