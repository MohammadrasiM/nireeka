import { Fragment, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PERFORMANCE_KEYS } from "../../../app/constants/performanceKeys";
import { convertMetricToImperial } from "../../../functions/convertors";
import { cleanNumberForUI } from "../../../functions/numbers";
import PerformanceBars from "./PerformanceBars";
import PerformanceStats from "./PerformanceStats";

const initialValues = {
  power: null,
  max_speed: null,
  range: null,
  weight: null,
};

export default function BikePerformance(props) {
  const [performanceValues, setPerformanceValues] = useState(initialValues);

  // 0 means metric, 1 means imperial
  const configuratorUnit = useSelector((state) => state.configurator.unit);
  const configuratorData = useSelector((state) => state.configurator.configuratorData);
  const defaultPerformance = useSelector((state) => state.configurator.configuratorData.performance_default);
  const selectedUpgrades = useSelector((state) => state.configurator.upgrades);

  const initializeMotor = useCallback(() => {
    setPerformanceValues((prevValues) => {
      const newValues = { ...prevValues };
      const motorCategory = configuratorData.parts.filter((item) => item.category_part_id === 1)[0];
      if (motorCategory?.default?.specs && motorCategory.default.specs.length)
        newValues.power = +motorCategory.default.specs.filter((item) => item.title === "power")[0]
          .value;
      else newValues.power = 0;
      return newValues;
    });
  }, [configuratorData.parts]);

  const initializeBattery = useCallback(() => {
    setPerformanceValues((prevValues) => {
      const newValues = { ...prevValues };
      const batteryCategory = configuratorData.parts.filter(
        (item) => item.category_part_id === 2
      )[0];
      if (batteryCategory?.default?.specs && batteryCategory?.default?.specs.length)
        newValues.battery = +batteryCategory.default.specs.filter(
          (item) => item?.title === "capacity"
        )?.[0]?.value;
      else newValues.battery = 0;

      return newValues;
    });
  }, [configuratorData.parts]);

  const initializeWeight = useCallback(() => {
    setPerformanceValues((prevValues) => {
      const newValues = { ...prevValues };
      if (configuratorData.init_value.weight) newValues.weight = configuratorData.init_value.weight;
      else newValues.weight = 0;
      return newValues;
    });
  }, [configuratorData.init_value.weight]);

  const initializeMaxSpeed = useCallback(() => {
    setPerformanceValues((prevValues) => {
      const newValues = { ...prevValues };
      if (configuratorData.init_value.max_speed)
        newValues.max_speed = configuratorData.init_value.max_speed;
      else newValues.max_speed = 0;

      return newValues;
    });
  }, [configuratorData.init_value.max_speed]);

  const initializeRange = useCallback(() => {
    setPerformanceValues((prevValues) => {
      const newValues = { ...prevValues };
      if (configuratorData.init_value.range) newValues.range = configuratorData.init_value.range;
      else newValues.range = 0;
      return newValues;
    });
  }, [configuratorData.init_value.range]);

  // Update value when selectedUpgrades change
  useEffect(() => {
    initializeMotor();
    initializeBattery();
    initializeMaxSpeed();
    initializeRange();
    initializeWeight();

    setPerformanceValues((prevPerformance) => {
      const newValues = { ...prevPerformance };

      selectedUpgrades.forEach((part) => {
        if (part.weight) {
          newValues.weight += part.weight;
        }

        if (part.specs && part.specs.length > 0) {
          part.specs.forEach((spec) => {
            switch (spec.title) {
              case "power":
                newValues.power = parseInt(spec.value);
                break;
              case "capacity":
                newValues.battery = parseInt(spec.value);
                break;
              case "speed":
                newValues.max_speed += parseInt(spec.value);
                break;
              case "range":
                newValues.range += parseInt(spec.value);
                break;
              default:
                break;
            }
          });
        }
      });

      if (configuratorUnit === 1) {
        newValues.weight = convertMetricToImperial.kg2lb(newValues.weight);
        newValues.max_speed = convertMetricToImperial.kmph2mph(newValues.max_speed);
        newValues.range = convertMetricToImperial.km2mile(newValues.range);
      }

      newValues.weight = cleanNumberForUI(newValues.weight);
      newValues.max_speed = cleanNumberForUI(newValues.max_speed);
      newValues.range = cleanNumberForUI(newValues.range);

      return newValues;
    });
  }, [
    selectedUpgrades,
    initializeMotor,
    initializeBattery,
    initializeMaxSpeed,
    initializeRange,
    initializeWeight,
    configuratorUnit,
  ]);

  switch (props.mode) {
    case "stats":
      return <PerformanceStats className={props.className} performanceValues={performanceValues} />;
    case "bars":
      return (
        <PerformanceBars
          className={props.className}
          defaultPerformance={defaultPerformance}
          performanceValues={performanceValues}
        />
      );
    default:
      return <Fragment />;
  }
}
