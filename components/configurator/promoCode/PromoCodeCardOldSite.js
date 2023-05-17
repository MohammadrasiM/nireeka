import dynamic from "next/dynamic";
import { useState } from "react";
import classNames from "../../../functions/classNames";
import { commafy } from "../../../functions/numbers";
import BlurBackdrop from "../../Atoms/overlays/BlurBackdrop";

const PromoCodeEligibleModal = dynamic(() => import("./PromoCodeEligibleModal"));
const PromoCodeNotEligibleModal = dynamic(() => import("./PromoCodeNotEligibleModal"));

export default function PromoCodeCardOldSite(props) {
  // We use only one state for the two modals, because we can control which modal to show with props.isEligible boolean prop
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <div className={classNames("flex flex-wrap", props.className)}>
      <div className="flex flex-col bg-orange-400 border-x-2 border-dashed p-3 flex-grow whitespace-nowrap">
        <span className="text-white text-sm">USD ${commafy(props.discount)}</span>
        <span className="text-white text-sm">Orders over USD ${commafy(props.maxPrice)}</span>
      </div>
      <div className="flex flex-grow items-center justify-center bg-orange-400 border-r-2 border-dashed p-3">
        <button
          className="bg-white text-black px-10 py-1 rounded-2xl text-sm"
          onClick={() => setIsModalVisible(true)}
        >
          Get
        </button>
      </div>

      <BlurBackdrop
        isVisible={props.isEligible && isModalVisible}
        onClose={() => setIsModalVisible(false)}
        backdropMode="light"
        backdropColorClass="bg-black/50"
      >
        <PromoCodeEligibleModal
          totalPrice={props.totalPrice}
          discount={props.discount}
          promoCode={props.promoCode}
          onClose={() => {
            document.getElementsByTagName("body")[0].style.overflow = "auto";
            setIsModalVisible(false);
          }}
        />
      </BlurBackdrop>

      <BlurBackdrop
        isVisible={!props.isEligible && isModalVisible}
        onClose={() => setIsModalVisible(false)}
        backdropMode="light"
        backdropColorClass="bg-black/50"
      >
        <PromoCodeNotEligibleModal
          totalPrice={props.totalPrice}
          maxPrice={props.maxPrice}
          discount={props.discount}
          onClose={() => {
            document.getElementsByTagName("body")[0].style.overflow = "auto";
            setIsModalVisible(false);
          }}
        />
      </BlurBackdrop>
    </div>
  );
}
