import { useState } from "react";
import { useSelector } from "react-redux";
import IframeContentModal from "../Atoms/modals/IframeContentModal";
import BlurBackdrop from "../Atoms/overlays/BlurBackdrop";

export default function OverallRating() {
  const performance = useSelector((state) => state.configurator.performance);
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);

  let overallRating = 0;
  if (!!performance)
    overallRating =
      (!!performance.power ? performance.power : 0) +
      (!!performance.max_speed ? performance.max_speed : 0) +
      (!!performance.practicality ? performance.practicality : 0) +
      (!!performance.suspension ? performance.suspension : 0) +
      (!!performance.range ? performance.range : 0) +
      (!!performance.weight ? performance.weight : 0);

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm">Overall rating</span>
      <span className="whitespace-nowrap">
        <span className="text-[4.5rem] leading-none font-thin text-black">{overallRating}</span>
        <span className="text-xl text-gray-500 font-light">/60</span>
      </span>
      {!!performance?.url && (
        <span className="text-blue-500 text-sm hover:underline cursor-pointer italic font-light">
          What does it mean?
        </span>
      )}

      <BlurBackdrop
        isVisible={isHelpModalVisible}
        onClose={() => setIsHelpModalVisible(false)}
        className="w-full sm:w-900 h-900"
      >
        <IframeContentModal className="w-full h-full" url={performance?.url} />
      </BlurBackdrop>
    </div>
  );
}
