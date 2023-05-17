import { setBikes } from "app/store/comparisonSlice";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useComparator } from "services/comparator";
import BlurBackdrop from "../Atoms/overlays/BlurBackdrop";
import ConfiguratorBike from "../configurator/ConfiguratorBike";
import {PlusCircleIcon} from "@heroicons/react/outline";
import classNames from "functions/classNames";

const ConfiguratorAddCompareButton = ({configuratorData, selectedSize, selectedColor, selectedUpgrades, text = "Add to Compare", className}) => {
  const dispatch = useDispatch();
  const { comparator } = useComparator();

  // state show modal
  const [showModal, setShowModal] = useState(false);

  const handleAddToCompareClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);

    const partsToSave = [];

    const equipmentPrice = selectedUpgrades.reduce(
      (a, b) => (parseInt(a.price) || 0) + (parseInt(b.price) || 0),
      0
    );

    for (let category of configuratorData?.parts) {
      const foundUpgradeIndex = selectedUpgrades.findIndex(
        (upgrade) => upgrade.category_part_id === category.category_part_id
      );
      if (foundUpgradeIndex === -1) {
        if (category.default)
          partsToSave.push({
            ...category.default,
            category: category.category,
          });
      } else {
        partsToSave[foundUpgradeIndex] = {
          ...selectedUpgrades[foundUpgradeIndex],
          category: category.category,
        };
      }
    }

    try {
      const res = await comparator.addBike({
        product: configuratorData?.product || configuratorData,
        variation: configuratorData?.variation,
        equipmentPrice: +equipmentPrice,
        thumbnail: selectedColor?.pivot?.image_path || configuratorData?.variation_image,
        color: selectedColor,
        size: selectedSize,
        upgrades: partsToSave,
      });
      // if (res) {
      //   toast.success(`${configuratorData.product.title} ${configuratorData.variation.name} was added to comparison.`);
      // }
    } catch (error) {
      toast.error(error);
    }

    try {
      const bikes = await comparator.getBikes();
      dispatch(setBikes(bikes));
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCloseModal = () => {
    document.getElementsByTagName("body")[0].style.overflow = "auto";
    setShowModal(false);
  };
  return (
    // if was props text
    <>
      <div className={classNames("flex items-center hover:underline mt-3 font-light", className)}>
        <PlusCircleIcon className="w-5 h-5 icon-stroke-width-1 mr-2" />
        <span onClick={handleAddToCompareClick} className="text-sm text-gray-600 cursor-pointer">
            {text}
        </span>
      </div>
      <BlurBackdrop
        isVisible={showModal}
        backdropMode="dark"
        onClose={handleCloseModal}
        className="w-full md:w-[43rem] xl:w-[50rem] min-w-[60%] bg-white"
      >
        <h4 className="text-center font-light text-2xl pb-5 pt-10">
          <span>{`${configuratorData?.product?.title || configuratorData?.title} `}</span>
          <span className=" text-gray-500 font-medium">{configuratorData?.variation?.name || configuratorData?.variation_details?.name}</span> was
          added to comparison.
        </h4>

        <ConfiguratorBike
          className="w-2/3 mx-auto "
          bikeImageSrc={selectedColor ? selectedColor?.pivot?.image_path : configuratorData?.image || configuratorData?.variation_image}
        />
        <div className="flex w-full mx-auto justify-center mt-12 z-[2] pb-10">
          <div className="flex justify-center w-[90%] md:w-[340px]">
            <Link href={"/configurator"}>
              <a
                onClick={handleCloseModal}
                className="flex mx-0.5 justify-center w-40 p-1 md:p-2 md:mx-auto md:my-4 font-medium text-white transition-all ease-in hover:outline bg-red-500 rounded-full md:w-40 hover:bg-white hover:outline-gray-300  hover:text-black"
              >
                Add another bike
              </a>
            </Link>
            <Link href={"/compare"}>
              <a
                onClick={handleCloseModal}
                className="flex mx-0.5 justify-center border border-gray-300 w-40 p-1 md:p-2 md:mx-auto md:my-4 font-medium transition-all ease-in  bg-transparent rounded-full md:w-40 hover:border-gray-900   text-gray-700"
              >
                Go to comparison
              </a>
            </Link>
          </div>
        </div>
      </BlurBackdrop>
    </>
  );
};

export default ConfiguratorAddCompareButton;
