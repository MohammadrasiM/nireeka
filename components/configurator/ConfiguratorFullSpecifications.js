import { CogIcon } from "@heroicons/react/outline";
import { useState } from "react";
import BlurBackdrop from "../Atoms/overlays/BlurBackdrop";
import FullSpecificationModal from "./FullSpecificationModal";

export default function ConfiguratorFullSpecifications() {

  // A state to control full specification modal visibility
  const [isFullSpecificationModalVisible, setIsFullSpecificationModalVisible] = useState(false);

  return (
    <>
      <div className="flex items-center hover:underline mt-3">
          <span className="mr-2">
            <CogIcon className="w-5 h-5 icon-stroke-width-1" />
          </span>
            <span
                onClick={() => {
                    setIsFullSpecificationModalVisible(true);
                }}
                className="text-sm font-light text-gray-600 cursor-pointer"
            >
            Full Specifications
          </span>
        </div>
      <BlurBackdrop
        isVisible={isFullSpecificationModalVisible}
        backdropMode="dark"
        onClose={() => setIsFullSpecificationModalVisible(false)}
        className="w-full md:w-[43rem] xl:w-[50rem] min-w-[70%]"
      >
        <FullSpecificationModal />
      </BlurBackdrop>
    </>
  );
}
