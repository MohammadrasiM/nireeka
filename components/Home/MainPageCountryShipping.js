import { useRouter } from "next/router";
import React, { useState } from "react";
import ShippingCostCalculatorModal from "../Atoms/modals/ShippingCostCalculatorModal";
import BlurBackdrop from "../Atoms/overlays/BlurBackdrop";

export default function Country() {
  const router = useRouter();

  const [
    isShippingCalculatorModalVisible,
    setIsShippingCalculatorModalVisible,
  ] = useState(false);

  return (
    <div>
      <div className="px-4 py-24 border-b border-gray-200 md:py-36 customGradient">
        <div className="flex flex-wrap justify-center w-full px-2 mx-auto ">
          <div className="w-full">
            <h4 className="w-full mx-auto text-[22px] text-center text-gray-500 lg:w-8/12 font-light ">
              {`We're shipping to 65+ countries including`}
              <span className="inline text-black text-[22px] font-light ">{` The US`}</span>
              <span className="inline text-black text-[22px] font-light ">{`, Canada`}</span>
              <span className="inline text-black text-[22px] font-light ">{`, Germany`}</span>
              <span className="inline text-black text-[22px] font-light ">{`, The UK`}</span>
              <span className="inline text-black text-[22px] font-light ">{`, Australia`}</span>
              <span className="inline text-black text-[22px] font-light ">{`, Japan`}</span>
              {`, and many more! Click the link below to find out if your country is included.`}
            </h4>
            <div className="flex justify-center w-full pt-4 pb-4 mx-auto ">
              {/* md:text-3xl */}
              <div className="flex px-1 mt-5 ml-auto align-baseline sm:mr-100 min-w-700">
                <span className="px-2 font-light text-red-500 text-[22px]">
                  &gt;
                </span>
                <button
                  onClick={() =>
                    router.push(
                      "/help-center/topic/18/do-you-ship-to-my-country"
                    )
                  }
                  className="text-[22px] font-light text-center underline  hover:text-indigo-500"
                >
                  {` Countries List`}
                </button>
              </div>
              <div className="flex px-1 mt-5 ml-2 mr-auto align-baseline">
                <span className="px-2 text-[22px] font-light text-red-500 ">
                  &gt;
                </span>
                <button
                  onClick={() => {
                    setIsShippingCalculatorModalVisible(true);
                  }}
                  className="text-[22px] font-light text-center underline hover:text-indigo-500"
                >
                  {`Shipping Cost Calculator  `}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BlurBackdrop
        isVisible={isShippingCalculatorModalVisible}
        onClose={() => setIsShippingCalculatorModalVisible(false)}
        backdropMode="dark"
        className="w-full md:w-[50rem] min-h-[450px]"
      >
        <ShippingCostCalculatorModal
          // onClose={() => setIsShippingCalculatorModalVisible(false)}
        />
      </BlurBackdrop>
    </div>
  );
}
