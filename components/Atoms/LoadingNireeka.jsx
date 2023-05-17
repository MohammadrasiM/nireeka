import React from "react";
import classNames from "../../functions/classNames";

export default function LoadingNireeka(props) {
  return (
    <span
      className={classNames(
        "animate-spin rounded-full border-t inline-block",
        props.widthLoading,
        props.heightLoading,
        props.borderLoading,
        props.colorLoading,
        props.className
      )}
      role="status"
    ></span>
  );
}
