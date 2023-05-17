import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { METRIC_SYSTEM } from "app/constants/units";
import classNames from "functions/classNames";
import Counter from "@/components/Atoms/general/Counter";
import useEventListener from "../../../hooks/useEventListener";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";

const bikeStats = [
  {
    label: "Weight",
    key: "weight",
    imperialUnit: "lbs",
    metricUnit: "kg",
    hasConvertibleUnits: true,
  },
  {
    label: "Max speed",
    key: "max_speed",
    imperialUnit: "mph",
    metricUnit: "km/h",
    hasConvertibleUnits: true,
  },
  {
    label: "Range",
    key: "range",
    imperialUnit: "miles",
    metricUnit: "km",
    hasConvertibleUnits: true,
  },
  // {
  //   label: "Motor",
  //   key: "power",
  //   imperialUnit: "Watts",
  //   metricUnit: "Watts",
  //   hasConvertibleUnits: false,
  // },
  // {
  //   label: "Battery",
  //   key: "battery",
  //   imperialUnit: "WH",
  //   metricUnit: "WH",
  //   hasConvertibleUnits: false,
  // },
];

const roundableNumbers = ["max_speed", "range"];

const fullConfig = resolveConfig(tailwindConfig);
const xlScreenBreakPointInPixels = parseInt(fullConfig.theme.screens.md);

export default function PerformanceStats(props) {
  const configuratorUnit = useSelector((state) => state.configurator.unit);
  const container = useRef();
  const containerPosition = useRef();

  useEffect(() => {
    if(window.innerWidth < xlScreenBreakPointInPixels && container.current) {
      const containerRect = container?.current?.getBoundingClientRect();
      setTimeout(() => {
        containerPosition.current = container.current?.offsetTop + containerRect.height;
      }, 200)
    }
  }, [container.current])

  useEventListener(
      'scroll',
      (e) => {
        if ((window.pageYOffset) > containerPosition.current) {
          container.current?.classList.add("sticky-performance");
        } else {
          container.current?.classList.remove("sticky-performance");
        }
      },
      undefined,
      !!containerPosition.current
  );


  return (
    <div className={classNames("group left-0 right-0 top-[52px] w-full", props.className)} ref={container}>
      <div className="w-full flex flex-wrap bg-white justify-evenly md:justify-center space-x-4 md:space-x-20 py-2">
        {bikeStats?.map((spec) => (
          <div key={spec.label} className="flex flex-col">
            <div className="font-light text-sm md:text-base text-gray-700">
              <span className="whitespace-nowrap">{spec.label}</span>
            </div>
            <div>
              <span className="text-xl md:text-2xl lg:text-3xl font-light text-black group-[.sticky-performance]:text-base">
                <Counter
                  value={
                    roundableNumbers.includes(spec.key)
                      ? Math.round(+props.performanceValues[spec.key])
                      : +props.performanceValues[spec.key]
                  }
                />
              </span>
              <span className="text-base font-light text-gray-700 group-[.sticky-performance]:text-sm">
                {" " + (configuratorUnit === METRIC_SYSTEM ? spec.metricUnit : spec.imperialUnit)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
