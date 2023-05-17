import React, { memo } from "react";

const Range = ({min = 0, max = 10, step = 0.5, name, label, defaultValue = "0", onChange}) => {

  return (
      <fieldset className="pt-1">
          <label htmlFor={name} className="block font-light text-gray-900 text-1remi">{label || name}</label>
          <input
              type="range"
              className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:shadow-none"
              min={min}
              max={max}
              step={step}
              id={name}
              defaultValue={defaultValue}
              onChange={(event) => {
                  if(onChange) onChange(event.currentTarget.value);
              }}
          />
      </fieldset>
  );
};

export default memo(Range);
