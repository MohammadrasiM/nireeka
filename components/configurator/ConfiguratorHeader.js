import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLOR_TYPES } from "../../app/constants/colorTypes";
import { setTotalPrice } from "../../app/store/configuratorSlice";

export default function ConfiguratorHeader(props) {
  const dispatch = useDispatch();

  const selectedParts = useSelector(
    (state) => state.configurator.selectedParts
  );
  const selectedMultipleParts = useSelector(
    (state) => state.configurator.selectedMultipleParts
  );
  const selectedColor = useSelector(
    (state) => state.configurator.selectedColor
  );

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
    if (COLOR_TYPES[i] === selectedColor.type) {
      equipmentPrice += props.colorPrices[COLOR_TYPES[i]];
      break;
    }
  }

  useEffect(() => {
    dispatch(setTotalPrice(equipmentPrice + Number(props.variation.price)));
  }, [equipmentPrice, dispatch, props.variation.price]);

  return (
    <div className="basis-16 flex-shrink-0 bg-white border-y border-gray-400 px-2 sm:px-6 xl:px-0">
      <div className="grid grid-cols-12 sm:gap-x-5 xl:gap-x-0 h-full space-y-5 sm:space-y-0">
        <div className="col-span-12 sm:col-span-7 xl:col-span-3 pl-0 lg:pl-16 text-center sm:text-left flex flex-col justify-evenly">
          <div>
            <span className="font-light text-xl sm:text-2xl sm:font-normal capitalize">
              <span>{props.product.title.toLowerCase()}</span>
              <span className="text-sm text-gray-700 ml-1">
                {props.variation.name}
              </span>
            </span>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-5 xl:col-span-4 xl:col-start-9 pl-0 lg:pr-16 text-center sm:text-left flex flex-col justify-evenly">
          <div>
            <span className="text-lg sm:text-base font-normal">
              ${props.variation.price} + ${equipmentPrice} = $
              {+props.variation.price + equipmentPrice}
            </span>
          </div>
          <div>
            <span className="text-xs font-medium text-gray-600 italic">
              Base Price + Equipment Price = Total Price
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
