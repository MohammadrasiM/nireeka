import IframeContentModal from "@/components/Atoms/modals/IframeContentModal";
import BlurBackdrop from "@/components/Atoms/overlays/BlurBackdrop";
import Link from "next/link";
import { forwardRef, useState } from "react";
import { useSelector } from "react-redux";
import classNames from "../../../functions/classNames";
import LoadingNireeka from "../../Atoms/LoadingNireeka";
import PackageIcon from "../../svg/PackageIcon";

function ShippingNDeliveryDates(props, ref) {
  const dates = useSelector((state) => state.configurator.dates);
  const deliveryDateUrl = useSelector(
    (state) => state.configurator.configuratorData.delivery_date_url
  );
  const [isGetDeliveryDatesModalVisible, setIsGetDeliveryDatesModalVisible] = useState(false);

  return (
    <div ref={ref} className={classNames(props.className)}>
      <div className="pr-3">
        <PackageIcon className="w-7 h-7" fill="#444444" />
      </div>
      <div className="flex flex-col text-sm">
        <span>
          <span>Est. Shipping: </span>
          {dates && dates.shipping ? (
            <span className="font-medium">{dates.shipping}</span>
          ) : (
            <LoadingNireeka className="w-4 h-4 border-gray-700" />
          )}
        </span>
        <span>
          <span>Est. Delivery: </span>
          {dates && dates.delivery ? (
            <span className="font-medium">{dates.delivery}</span>
          ) : (
            <LoadingNireeka className="w-4 h-4 border-gray-700" />
          )}
        </span>
        {!!deliveryDateUrl && (
          <span
            className="text-blue-600 hover:underline cursor-pointer text-sm"
            onClick={() => setIsGetDeliveryDatesModalVisible(true)}
          >
            Get delivery dates
          </span>
        )}
      </div>

      <BlurBackdrop
        isVisible={isGetDeliveryDatesModalVisible}
        onClose={() => setIsGetDeliveryDatesModalVisible(false)}
        backdropMode="dark"
        className="w-full sm:w-900 h-900"
      >
        <IframeContentModal className="w-full h-full" url={deliveryDateUrl} />
      </BlurBackdrop>
    </div>
  );
}

export default forwardRef(ShippingNDeliveryDates);
