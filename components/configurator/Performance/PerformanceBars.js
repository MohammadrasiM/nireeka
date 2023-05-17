import classNames from "functions/classNames";
import PerformanceBar from "../PerformanceBar";

// Don't forget to update PERFORMANCE_KEYS inside app/constants/performanceKeys.js after adding a new object
const bars = [
  {
    title: "Power",
    unit: "W",
    hasConvertibleUnit: false,
    key: "power",
  },
  {
    title: "Max Speed",
    imperialUnit: "mph",
    metricUnit: "km/h",
    hasConvertibleUnit: true,
    key: "max_speed",
  },
  { title: "Practicality", key: "practicality" },
  {
    title: "Suspension",
    key: "suspension",
  },
  {
    title: "Range",
    imperialUnit: "Miles",
    metricUnit: "km",
    hasConvertibleUnit: true,
    key: "range",
  },
  {
    title: "Weight",
    imperialUnit: "lbs",
    metricUnit: "kg",
    hasConvertibleUnit: true,
    key: "weight",
  },
  {
    title: "Battery",
    unit: "WH",
    hasConvertibleUnit: false,
    key: "battery",
  },
];

const PerformanceBars = (props) => (
  <div className={classNames(props.className)}>
    {bars.map((bar) => {
      let title = bar.title;

      if (props.performanceValues[bar.key]) {
        title += " (" + props.performanceValues[bar.key];

        if (bar.hasConvertibleUnit)
          title += " " + (configuratorUnit === 0 ? bar.metricUnit : bar.imperialUnit);
        else if (bar.unit) title += " " + bar.unit;

        title += ")";
      }

      return (
        <PerformanceBar
          addedValue={
            performance && performance[bar.key]
              ? performance[bar.key] - props.defaultPerformance[bar.key]
              : 0
          }
          value={props.defaultPerformance ? props.defaultPerformance[bar.key] : 0}
          key={bar.key}
          title={title}
          // maxValue={maxValue}
          maxValue={10}
        />
      );
    })}
  </div>
);

export default PerformanceBars;
