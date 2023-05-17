import React, {memo, useCallback, useEffect, useState} from "react";
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const MultiRange = ({min = 0, max = 10, step = 0.5, name, label, dots, defaultValue, onChange, className}) => {

    const [value, setValue] = useState(defaultValue || [min, max]);

    const changeValue = useCallback((range) => {
        if(onChange) onChange(range);
        setValue(range)
    }, [onChange]);

    useEffect(() => {
        if(min !== max) setValue(defaultValue)
    }, [defaultValue]);

    if(min === max) return null;

  return (
      <fieldset className={className}>
          <label htmlFor={name} className="block font-light text-gray-900 mb-3 first-letter:capitalize">{label || name}</label>
          <Range min={min} max={max} value={value} onChange={changeValue} step={step} dots={dots}  />
          <div className="flex flex-row justify-between items-center mt-1">
              <span>{value?.[0] || min}</span>
              <span>{value?.[1] || max}</span>
          </div>
      </fieldset>
  );
};

export default memo(MultiRange);
