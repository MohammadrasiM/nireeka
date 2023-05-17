import IframeContentModal from "@/components/Atoms/modals/IframeContentModal";
import BlurBackdrop from "@/components/Atoms/overlays/BlurBackdrop";
import {
  CONFIGURATOR_EDIT_ORDER_MODE,
  CONFIGURATOR_EDIT_UPGRADE_MODE,
} from "app/constants/configuratorModes";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLOR_TYPES } from "app/constants/colorTypes";
import { setTotalPrice } from "app/store/configuratorSlice";
import { commafy } from "functions/numbers";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import Counter from "@/components/Atoms/general/Counter";

const fullConfig = resolveConfig(tailwindConfig);
const mdScreenBreakPointInPixels = parseInt(fullConfig.theme.screens.md);

export default function ConfiguratorCosts() {
  const dispatch = useDispatch();
  const container = useRef();

  const selectedParts = useSelector(
    (state) => state.configurator.selectedParts
  );
  const selectedMultipleParts = useSelector(
    (state) => state.configurator.selectedMultipleParts
  );
  const selectedColor = useSelector(
    (state) => state.configurator.selectedColor
  );
  const configuratorData = useSelector(
    (state) => state.configurator.configuratorData
  );
  const preUpgradePartsPrice = useSelector(
    (state) => state.configurator.preUpgradePartsPrice
  );
  const configuratorMode = useSelector((state) => state.configurator.mode);
  const [isWhatDoesItMeanModalVisible, setIsWhatDoesItMeanModalVisible] =
    useState(false);

  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollPos(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const zIndex = scrollPos >= 5 ? 1 : 0;

  const equipmentPrice = useMemo(() => {
    let equipmentPrice = 0;
    // Calculating part prices
    for (let partKey in selectedParts) {
      if (selectedParts[partKey].price)
        equipmentPrice += selectedParts[partKey].price;
    }

    // Calculating multiple choice part prices
    for (let partKeyMul in selectedMultipleParts) {
      for (let i = 0; i < selectedMultipleParts[partKeyMul].length; i++) {
        if (selectedMultipleParts[partKeyMul][i].price)
          equipmentPrice += selectedMultipleParts[partKeyMul][i].price;
      }
    }

    // Calculating color price
    for (let i = 0; i < COLOR_TYPES.length; i++) {
      if (!selectedColor) break;
      if (
        configuratorMode === CONFIGURATOR_EDIT_ORDER_MODE ||
        configuratorMode === CONFIGURATOR_EDIT_UPGRADE_MODE
      )
        break;
      if (COLOR_TYPES[i] === selectedColor.type) {
        equipmentPrice += configuratorData.price_colors[COLOR_TYPES[i]];
        break;
      }
    }

    if (
      configuratorMode === CONFIGURATOR_EDIT_ORDER_MODE ||
      configuratorMode === CONFIGURATOR_EDIT_UPGRADE_MODE
    )
      equipmentPrice -= preUpgradePartsPrice;
    return equipmentPrice;
  }, [
    selectedParts,
    selectedMultipleParts,
    selectedColor,
    preUpgradePartsPrice,
    configuratorMode,
  ]);

  useEffect(() => {
    dispatch(
      setTotalPrice(equipmentPrice + Number(configuratorData.variation.price))
    );
  }, [equipmentPrice, dispatch, configuratorData.variation.price]);

  useEffect(() => {
    if (container.current && window.innerWidth >= mdScreenBreakPointInPixels) {
      const observer = new IntersectionObserver(
        ([e]) => e.target.classList.toggle("sticky-costs", !e.isIntersecting),
        { threshold: [1] }
      );

      observer.observe(container.current);
    }
  }, [container.current]);

  return (
    <>
      <div
        style={{ zIndex }}
        className="group md:sticky top-[-1px] h-[140px] bg-zinc-50 border-x border-gray-200"
        ref={container}
      >
        <div className="flex flex-col items-start flex-grow pb-2">
          {configuratorMode !== CONFIGURATOR_EDIT_ORDER_MODE &&
            configuratorMode !== CONFIGURATOR_EDIT_UPGRADE_MODE && (
              <div className="flex flex-col w-full bg-zinc-50 px-6">
                <h5 className="text-sm group-[.sticky-costs]:text-sm md:text-sm font-normal text-gray-600">
                  Base Price:
                </h5>
                <span className="whitespace-nowrap font-medium text-xl group-[.sticky-costs]:text-xl md:text-3xl text-green-600 pt-1">
                  ${commafy(configuratorData.variation.price)}
                  <span className="text-xs group-[.sticky-costs]:text-xs md:text-sm font-normal text-gray-600 ml-2">
                    USD
                  </span>
                </span>
              </div>
            )}
          <div className="py-3 w-full bg-white border-gray-300 group-[.sticky-costs]:pb-1 group-[.sticky-costs]:border-b bg-zinc-50 px-6">
            <h5 className="text-sm group-[.sticky-costs]:text-sm md:text-sm font-normal text-gray-600">
              Price for Upgrades{!!configuratorData.equipments_url && "*"}
            </h5>
            <span className="whitespace-nowrap font-normal text-base md:text-xl group-[.sticky-costs]:text-base pt-1">
              $<Counter value={equipmentPrice} normalize={commafy} />
              <span className="text-xs group-[.sticky-costs]:text-xs md:text-sm font-normal text-gray-600 ml-1">
                USD
              </span>
            </span>
          </div>
          {!!configuratorData.equipments_url && (
            <p
              className="w-full bg-white text-blue-600 text-xs sm:text-sm hover:underline cursor-pointer group-[.sticky-costs]:opacity-0 ease-in-out duration-300 bg-zinc-50 px-6"
              onClick={() => setIsWhatDoesItMeanModalVisible(true)}
            >
              * What does an Upgrade mean?
            </p>
          )}
        </div>
      </div>
      <BlurBackdrop
        isVisible={isWhatDoesItMeanModalVisible}
        onClose={() => setIsWhatDoesItMeanModalVisible(false)}
        backdropMode="dark"
        className="w-full sm:w-900 h-900"
      >
        <IframeContentModal
          className="w-full h-full"
          url={configuratorData.equipments_url}
        />
      </BlurBackdrop>
    </>
  );
}
