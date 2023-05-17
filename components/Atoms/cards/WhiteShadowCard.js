import { forwardRef } from "react";
import classNames from "functions/classNames";

const WhiteShadowCard = (props, ref) => {
  return (
    <div
      ref={ref}
      className={classNames(
        "bg-white shadow rounded-lg",
        props.noPadding ? "" : "px-4 py-6 sm:p-6",
        props.className
      )}
      onClick={props.onClick ? props.onClick : () => {}}
    >
      {props.children}
    </div>
  );
};

export default forwardRef(WhiteShadowCard);
