import { forwardRef } from "react";
import classNames from "../../../functions/classNames";
import LoadingNireeka from "../LoadingNireeka";

const TextInput = (props, ref) => {
  let inputStyle = "";
  if (props.inputMode === "full-border")
    inputStyle =
      "block w-full border bg-white border-gray-300 focus:border-indigo-600 focus:ring-0 sm:text-sm py-2 px-3 rounded-md disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed";
  else if (props.inputMode === "bottom-border")
    inputStyle =
      "block w-full border-b border-transparent bg-white border-gray-300 focus:border-indigo-600 focus:ring-0 sm:text-sm pb-1 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed";

  return (
    <div className={classNames(props.isInline && "flex items-center")}>
      <div className="flex">
        {!!props.label && (
          <label htmlFor={props.name} className="block text-sm font-light text-gray-700 mr-2">
            {props.label}
          </label>
        )}
        {!!props.helpText && props.isInline && (
          <p className="flex items-center text-sm text-gray-500 mr-4">{props.helpText}</p>
        )}
        {props.isLoading !== undefined && (
          <div className="flex items-center">
            {props.isLoading && <LoadingNireeka className="w-5 h-5 border-gray-600" />}
          </div>
        )}
        {!!props.isOptional && <span className="text-sm text-gray-500 ml-auto">Optional</span>}
      </div>
      <div
        className={classNames(
          "relative",
          props.isInline ? "ml-auto" : "mt-1",
          props.inputClassName
        )}
      >
        <input
          autoComplete={props.autoComplete}
          type={props.type}
          name={props.name}
          id={props.name}
          value={props.value}
          className={classNames(inputStyle, props.className)}
          placeholder={props.placeholder}
          onChange={props.onChange}
          ref={ref}
          disabled={props.disabled}
          step={props.step}
        />
      </div>
      {!!props.helpText && !props.isInline && (
        <p className="mt-2 text-sm text-gray-500">{props.helpText}</p>
      )}
    </div>
  );
};

export default forwardRef(TextInput);
