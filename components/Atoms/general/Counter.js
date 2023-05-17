import { cleanNumberForUI } from "functions/numbers";
import { useEffect, useState } from "react";

const Counter = (props) => {
  const [value, setValue] = useState(props.value || 0);

  useEffect(() => {
    const initialDiff = Math.abs(props.value - value);

    const intervalId = setInterval(() => {
      if (props.value === value || initialDiff === 0) return;

      setValue((prevValue) => {
        let step;
        if (Math.abs(prevValue - props.value) > 100) step = 20;
        else if (Math.abs(prevValue - props.value) > 25) step = 5;
        else step = 1;

        if (prevValue > parseInt(props.value)) return prevValue - step;
        else if (prevValue < parseInt(props.value)) return prevValue + step;
        return prevValue;
      });
    }, 500 / initialDiff);

    return () => {
      clearInterval(intervalId);
    };
  }, [props.value]);

  if(props?.normalize)
    return <>{props.normalize(cleanNumberForUI(value + (props.value - Math.floor(props.value))))}</>;
  return <>{cleanNumberForUI(value + (props.value - Math.floor(props.value)))}</>;
};

export default Counter;
