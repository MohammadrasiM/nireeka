import { useState } from "react";
import { toast } from "react-toastify";
import { useComparator } from "services/comparator";
import WhiteShadowCard from "../Atoms/cards/WhiteShadowCard";
import XButton from "../Atoms/XButton";

const RemoveFromComparisonButton = (props) => {
  const { comparator } = useComparator();
  const [isPopupTextVisible, setIsPopupTextVisible] = useState(false);
  const [popupTimeoutId, setPopupTimeoutId] = useState(null);

  const handleXButtonMouseEnter = () => {
    const timeoutId = setTimeout(() => {
      setIsPopupTextVisible(true);
    }, 500);
    setPopupTimeoutId(timeoutId);
  };

  const handleXButtonMouseLeave = () => {
    if (popupTimeoutId) {
      clearTimeout(popupTimeoutId);
      setIsPopupTextVisible(false);
    }
  };

  const handleBikeRemove = async () => {
    try {
      const res = await comparator.removeBike(props.bikeId);
      toast.success(res);

      if (typeof props.fetchBikes === "function") props.fetchBikes();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div
        onMouseEnter={handleXButtonMouseEnter}
        onMouseLeave={handleXButtonMouseLeave}
        onClick={handleBikeRemove}
        className="absolute right-0 top-8 z-10"
      >
        <XButton className="w-6 h-6" />
      </div>
      {isPopupTextVisible && (
        <WhiteShadowCard noPadding className="absolute text-sm top-16 right-0 p-3 z-10">
          Remove from comparison
        </WhiteShadowCard>
      )}
    </>
  );
};

export default RemoveFromComparisonButton;
