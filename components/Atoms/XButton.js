import { XIcon } from "@heroicons/react/outline";
import classNames from "functions/classNames";

const XButton = (props) => {
  return (
    <span
      onClick={props.onClick}
      className={classNames(
        "rounded-full bg-gray-800/80 text-white flex items-center justify-center cursor-pointer",
        props.className
      )}
    >
      <XIcon className="icon-stroke-width-1" />
    </span>
  );
};

export default XButton;
