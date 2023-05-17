import { useDispatch, useSelector } from "react-redux";
import classNames from "../../../functions/classNames";
import ColorCircle from "./ColorCircle";
import { callGetDateBySizeAndColor, setSelectedColor } from "../../../app/store/configuratorSlice";
import { COLOR_TYPES } from "../../../app/constants/colorTypes";
import LoadingNireeka from "../../Atoms/LoadingNireeka";
import { useEffect, useState } from "react";
import IframeContentModal from "@/components/Atoms/modals/IframeContentModal";
import BlurBackdrop from "@/components/Atoms/overlays/BlurBackdrop";
import {
  CONFIGURATOR_EDIT_ORDER_MODE,
  CONFIGURATOR_EDIT_UPGRADE_MODE,
} from "app/constants/configuratorModes";

export default function ColorConfigStep(props) {
  const dispatch = useDispatch();

  const [isRight4UModalVisible, setIsRight4UModalVisible] = useState(false);

  const selectedColor = useSelector((state) => state.configurator.selectedColor);
  const selectedSize = useSelector((state) => state.configurator.selectedSize);
  const preUpgradesColorId = useSelector((state) => state.configurator.preUpgrades?.color_id);
  const productId = useSelector((state) => state.configurator.configuratorData.product.id);
  const availableColors = useSelector((state) => state.configurator.availableColors);
  const colorData = useSelector((state) => state.configurator.configuratorData.size_color[1]);
  const configuratorMode = useSelector((state) => state.configurator.mode);

  const handleColorClick = (clickedColor) => {
    dispatch(setSelectedColor(clickedColor));
    dispatch(
      callGetDateBySizeAndColor({
        productId,
        sizeId: selectedSize.id,
        colorId: clickedColor.id,
      })
    );
    if (typeof props.doAfterColorSelect === "function") props.doAfterColorSelect();
  };

  useEffect(() => {
    if (!availableColors) return;
  }, [dispatch, preUpgradesColorId, availableColors, productId, selectedSize?.id]);

  return (
    <div id={props.id} className={classNames("flex flex-col", props.className)}>
      <span className="text-xl font-light">{colorData.title}</span>
      {(!!colorData.url && !!colorData.description) && (
        <span
          className="block text-sm font-light text-blue-500 hover:text-blue-600 cursor-pointer"
          onClick={() => setIsRight4UModalVisible(true)}
        >
          {colorData.description}
        </span>
      )}

      <div className="mt-5">
        {!!availableColors ? (
          COLOR_TYPES.map((colorType) => {
            if (!!availableColors[colorType] && availableColors[colorType].length > 0)
              return (
                <div className="mb-5" key={colorType}>
                  <span className="text-sm">{`${colorType} ($${props.colorPrices[colorType]}):`}</span>
                  <div className="flex flex-wrap">
                    {availableColors[colorType].map((color) => (
                      <ColorCircle
                        key={color.id}
                        color={color}
                        className="mr-1 mt-2 last:mr-0"
                        onClick={() => handleColorClick(color)}
                        isSelected={selectedColor && selectedColor.id === color.id}
                        isDisabled={
                          configuratorMode === CONFIGURATOR_EDIT_ORDER_MODE ||
                          configuratorMode === CONFIGURATOR_EDIT_UPGRADE_MODE
                        }
                      />
                    ))}
                  </div>
                </div>
              );
          })
        ) : (
          <LoadingNireeka className="w-7 h-7 border-gray-700 mx-auto" />
        )}
      </div>

      <BlurBackdrop
        isVisible={isRight4UModalVisible}
        onClose={() => setIsRight4UModalVisible(false)}
        backdropMode="dark"
        className="w-full sm:w-900 h-900"
      >
        <IframeContentModal className="w-full h-full" url={colorData.url} />
      </BlurBackdrop>
    </div>
  );
}
