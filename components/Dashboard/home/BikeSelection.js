import { useState } from "react";
import BlurBackdrop from "../../Atoms/overlays/BlurBackdrop";
import WhiteButton from "../../Atoms/buttons/WhiteButton";
import WhiteShadowCard from "../../Atoms/cards/WhiteShadowCard";
import BikeBadge from "../../Atoms/people/BikeBadge";
import PrimaryButton from "../../Atoms/buttons/PrimaryButton";
import classNames from "../../../functions/classNames";
import { CheckIcon } from "@heroicons/react/outline";
import { dashboard } from "app/constants/localStorageKeys";
import { toast } from "react-toastify";

const BikeSelection = (props) => {
  const [isBikeSelectModalOpen, setIsBikeSelectModalOpen] = useState(false);

  const handleSelectBikeClick = (bike) => {
    if (!bike?.mac_id || !bike.is_smart) {
      toast.info("This bike is not smart.");
      return;
    }

    localStorage.setItem(dashboard.SELECTED_BIKE_MAC_ID, bike.mac_id);
    props.setSelectedBikeMacId(bike.mac_id);
    toast.success(`Your ${bike.name} is now selected.`);

    setIsBikeSelectModalOpen(false);
    document.getElementsByTagName("body")[0].style.overflow = "auto";
  };

  let selectedBike = null;
  for (let i = 0; i < props.userBikes.length; i++) {
    if (props.userBikes[i].mac_id === props.selectedBikeMacId) {
      selectedBike = props.userBikes[i];
      break;
    }
  }

  return (
    <div>
      <div className="flex items-center px-4 sm:px-0">
        <p className="text-md text-gray-700 flex items-center">
          <span className="mr-4">Selected bike: </span>
          <BikeBadge bikeColor={selectedBike.color} className="mr-1" />
          <span className="text-black">{selectedBike.name}</span>
        </p>
        <WhiteButton onClick={() => setIsBikeSelectModalOpen(true)} className="ml-auto">
          My Bikes
        </WhiteButton>
      </div>
      <BlurBackdrop
        isVisible={isBikeSelectModalOpen}
        onClose={() => setIsBikeSelectModalOpen(false)}
        backdropMode="dark"
      >
        <WhiteShadowCard className="cursor-default md:min-w-[50rem] w-full divide-y space-y-10 overflow-y-auto max-h-900">
          {props.userBikes.map((bike, index) => (
            <div key={index} className="flex flex-col md:flex-row space-x-5 pt-10 first:pt-0">
              <div className="w-full md:w-[20rem]">
                <img src={bike.image} alt={bike.name} />
              </div>
              <div>
                <p className="text-xl mb-3">{bike.name}</p>
                <p className="flex space-x-2 items-center text-gray-700">
                  <span>Color: </span>
                  <BikeBadge bikeColor={bike.color} />
                </p>
                <p className="flex space-x-2 items-center text-gray-700">
                  <span>Size: </span>
                  <span>{bike.size}</span>
                </p>
                <p className="flex space-x-2 items-center text-gray-700">
                  <span>Weight: </span>
                  <span>{bike.weight}</span>
                </p>
                <p className="flex space-x-2 items-center text-gray-700">
                  <span>Order ID: </span>
                  <span>{bike.order_bike_id}</span>
                </p>
                {bike.is_smart && (
                  <p className="flex space-x-2 items-center text-gray-700">
                    <span>MAC ID: </span>
                    <span>{bike.mac_id}</span>
                  </p>
                )}
                {bike.is_smart ? (
                  <PrimaryButton
                    onClick={
                      bike.mac_id === props.selectedBikeMacId
                        ? () => {}
                        : () => handleSelectBikeClick(bike)
                    }
                    className={classNames(
                      "mt-5",
                      bike.mac_id === props.selectedBikeMacId &&
                        "bg-green-600 hover:bg-green-700 cursor-default"
                    )}
                  >
                    {bike.mac_id === props.selectedBikeMacId ? (
                      <>
                        <CheckIcon className="w-5 h-5 mr-1 text-white" />
                        <span>Selected</span>
                      </>
                    ) : (
                      "Select"
                    )}
                  </PrimaryButton>
                ) : (
                  <p className="text-red-600 mt-5">This bike is not smart!</p>
                )}
              </div>
            </div>
          ))}
        </WhiteShadowCard>
      </BlurBackdrop>
    </div>
  );
};

export default BikeSelection;
