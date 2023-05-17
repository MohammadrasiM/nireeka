import { MinusSmIcon, ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { METRIC_SYSTEM, UNITS } from "../../../app/constants/units";
import classNames from "../../../functions/classNames";
import { convertMetricToImperial } from "../../../functions/convertors";
import { cleanNumberForUI } from "../../../functions/numbers";
import WhiteShadowCard from "../../Atoms/cards/WhiteShadowCard";

const BikeStatus = (props) => {
  const userUnitSystem = useSelector((state) => state.auth.userData?.unit);

  const bikestatus = [
    {
      label: `Trip (${UNITS[userUnitSystem].distance})`,
      value:
        props.ratios && props.ratios.trip
          ? userUnitSystem === METRIC_SYSTEM
            ? cleanNumberForUI(props.ratios.trip.value)
            : cleanNumberForUI(convertMetricToImperial.km2mile(props.ratios.trip.value))
          : "0",
      badge:
        props.ratios && props.ratios.trip
          ? cleanNumberForUI(Math.abs(props.ratios.trip.ratio * 100)) + "%"
          : "0%",
      badgeClassName:
        props.ratios && props.ratios.trip && props.ratios.trip.ratio !== 0
          ? props.ratios.trip.ratio > 0
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
          : "bg-yellow-50 text-yellow-700",
      icon:
        props.ratios && props.ratios.trip.ratio > 0
          ? ArrowSmUpIcon
          : props.ratios && props.ratios.trip.ratio < 0
          ? ArrowSmDownIcon
          : MinusSmIcon,
    },
    {
      label: "Charge",
      value:
        props.status && props.status.battery_charge
          ? cleanNumberForUI(props.status.battery_charge) + "%"
          : "0%",
      badge:
        props.status && props.status.remaining_range
          ? cleanNumberForUI(props.status.remaining_range) +
            ` ${UNITS[userUnitSystem].distance} left`
          : `0 ${UNITS[userUnitSystem].distance} left`,
      badgeClassName: "bg-green-100 text-green-800",
    },
    {
      label: `Avg. Speed (${UNITS[userUnitSystem].speed})`,
      value:
        props.ratios && props.ratios.avg_speed
          ? userUnitSystem === METRIC_SYSTEM
            ? cleanNumberForUI(props.ratios.avg_speed.value)
            : cleanNumberForUI(convertMetricToImperial.kmph2mph(props.ratios.avg_speed.value))
          : "0",
      badge:
        props.ratios && props.ratios.avg_speed
          ? cleanNumberForUI(Math.abs(props.ratios.avg_speed.ratio * 100)) + "%"
          : "0%",
      badgeClassName:
        props.ratios && props.ratios.avg_speed && props.ratios.avg_speed.ratio !== 0
          ? props.ratios.avg_speed.ratio > 0
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
          : "bg-yellow-50 text-yellow-700",
      icon:
        props.ratios && props.ratios.avg_speed.ratio > 0
          ? ArrowSmUpIcon
          : props.ratios && props.ratios.avg_speed.ratio < 0
          ? ArrowSmDownIcon
          : MinusSmIcon,
    },
  ];

  return (
    <section>
      <h2 className="text-gray-700 text-md mb-2 pl-4 sm:pl-0">Your Bike Status</h2>
      <WhiteShadowCard className="flex divide-x divide-gray-200 bg-white" noPadding>
        {bikestatus.map((item, index) => (
          <div key={index} className="flex-1 px-4 py-5 flex flex-wrap items-center space-y-2">
            <span className="text-sm text-gray-700 basis-full">{item.label}</span>
            <span className="text-indigo-700 font-medium text-2xl basis-full sm:basis-auto">
              {item.value}
            </span>
            <span
              className={classNames(
                item.badgeClassName,
                "text-sm rounded-full px-3 flex justify-between items-center ml-auto text-center"
              )}
            >
              {item.icon && (
                <span className="w-3 mr-2 relative -left-1">
                  <item.icon className="icon-stroke-width-1 h-5 text-left" />
                </span>
              )}
              <span>{item.badge}</span>
            </span>
          </div>
        ))}
      </WhiteShadowCard>
    </section>
  );
};

export default BikeStatus;
