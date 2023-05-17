import { useDispatch, useSelector } from "react-redux";
import classNames from "../../../functions/classNames";
import {
  callGetAvailableColorsBySize,
  setSelectedSize,
} from "../../../app/store/configuratorSlice";
import IframeContentModal from "@/components/Atoms/modals/IframeContentModal";
import BlurBackdrop from "@/components/Atoms/overlays/BlurBackdrop";
import { useState } from "react";
import {
  CONFIGURATOR_EDIT_ORDER_MODE,
  CONFIGURATOR_EDIT_UPGRADE_MODE,
} from "app/constants/configuratorModes";

export default function SizeConfigStep(props) {
  const dispatch = useDispatch();

  const [isRight4UModalVisible, setIsRight4UModalVisible] = useState(false);

  const selectedSize = useSelector((state) => state.configurator.selectedSize);
  const productId = useSelector((state) => state.configurator.configuratorData.product.id);
  const availableSizes = useSelector((state) => state.configurator.configuratorData.sizes);
  const sizeData = useSelector((state) => state.configurator.configuratorData.size_color[0]);
  const configuratorMode = useSelector((state) => state.configurator.mode);

  const handleSizeClick = (clickedSize) => {
    if (selectedSize.id === clickedSize.id) return;

    dispatch(setSelectedSize(clickedSize));
    dispatch(
      callGetAvailableColorsBySize({
        productId,
        sizeId: clickedSize.id,
      })
    );
    if (props.doAfterSizeSelect) props.doAfterSizeSelect();
  };

  return (
    <div id={props.id} className={classNames("flex flex-col", props.className)}>
      <span className="text-xl font-light">{sizeData.title}</span>
      {!!sizeData.url && !!sizeData.description && (
        <span
          className="block text-sm font-light text-blue-500 hover:text-blue-600 cursor-pointer"
          onClick={() => setIsRight4UModalVisible(true)}
        >
          {sizeData.description}
        </span>
      )}

      <div className="mt-5">
        <div
          className={classNames(
            "grid gap-3",
            availableSizes.length % 3 === 0 ? "grid-cols-3" : "grid-cols-2"
          )}
        >
          {(!availableSizes || availableSizes.length === 0) && (
            <div>
              <span className="text-lg text-red-600">Out of stock!</span>
            </div>
          )}
          {!!availableSizes &&
            availableSizes.map((size, index) => {
              const isDisabled =
                configuratorMode === CONFIGURATOR_EDIT_ORDER_MODE ||
                configuratorMode === CONFIGURATOR_EDIT_UPGRADE_MODE;
              const isSelected = selectedSize?.id === size.id;
              return (
                <div
                  onClick={!isDisabled ? () => handleSizeClick(size) : null}
                  key={size.id}
                  className={classNames(
                    "border border-gray-900 py-3 px-4 rounded-2xl cursor-pointer text-sm",
                    !isDisabled && "hover:bg-gray-700 hover:text-white",
                    isDisabled && !isSelected && "opacity-50 cursor-not-allowed",
                    availableSizes.length % 3 === 0
                      ? ""
                      : availableSizes.length % 2 === 1 &&
                          availableSizes.length - 1 === index &&
                          "col-span-2",
                    isSelected && "bg-gray-900 text-white hover:bg-gray-900"
                  )}
                >
                  <span className="block text-center">{`${size.title2}`}</span>
                </div>
              );
            })}
        </div>

        {!!availableSizes && availableSizes.length > 0 && (
          <div className="mt-5 space-y-2">
            <div>
              <span className="font-light text-sm">
                If you&apos;re not sure about the size, check the table below for a reference.
              </span>
            </div>

            <div className="border border-gray-400 rounded-lg">
              {availableSizes.map((size) => (
                <div key={size.id} className="flex border-b last:border-b-0 border-gray-400">
                  <span className="flex-1 font-light text-sm p-2 border-r border-gray-400">
                    {size.suitable_for_imperial}
                  </span>
                  <span className="flex-[2] font-light text-sm p-2 border-r border-gray-400">
                    {size.suitable_for_metric}
                  </span>
                  <span className="flex-1 font-light text-sm p-2">{size.title2}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BlurBackdrop
        isVisible={isRight4UModalVisible}
        onClose={() => setIsRight4UModalVisible(false)}
        backdropMode="dark"
        className="w-full sm:w-900 h-900"
      >
        <IframeContentModal className="w-full h-full" url={sizeData.url} />
      </BlurBackdrop>
    </div>
  );
}
