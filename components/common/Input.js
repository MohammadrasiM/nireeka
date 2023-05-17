import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { forwardRef, useRef, useState } from "react";
import classNames from "../../functions/classNames";
import LoadingNireeka from "../Atoms/LoadingNireeka";

const Input = (props, ref) => {
  const inputRefHook = useRef();
  const inputRef = ref ? ref : inputRefHook;

  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  let inputType = "text";
  if (props.type === "password")
    inputType = isPasswordVisible ? "text" : "password";
  else if (!!props.type) inputType = props.type;

  const handleFormChange = (e) => {
    if (typeof props?.formik?.handleChange === "function")
      props.formik.handleChange(e);
    if (typeof props?.onChange === "function") props.onChange(e);
  };

  return (
    <div className={classNames("relative", props.className)}>
      <label
        className="flex items-center text-sm font-light text-gray-700"
        htmlFor={props.name}
      >
        {props.label}
        {props.optional && (
          <span className="text-gray-500">&nbsp;{"(Optional)"}</span>
        )}
        {props.isLoading && (
          <LoadingNireeka className="w-4 h-4 border-gray-700 ml-3" />
        )}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          id={props.name}
          type={inputType}
          onChange={handleFormChange}
          value={
            props?.value
              ? props.value
              : !props.noFormik
              ? props.formik.values[props.name]
              : undefined
          }
          name={props.name}
          className={classNames(
            "block w-full px-3 py-2 mt-1 rounded-md shadow-sm sm:text-sm",
            "bg-white border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
            !props.noPasswordEye && props.type === "password" && "pr-10",
            props.inputClassName
          )}
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
          /**
           * There is a bug in formik onBlur
           * When user clicks on an address suggestion, the onClick on the address won't trigger and only the input onBlur gets called.
           */
          onBlur={() => {
            setTimeout(() => {
              setIsFocused(false);
            }, 100);
          }}
          onFocus={() => setIsFocused(true)}
        />
        {!props.noPasswordEye && props.type === "password" && (
          <i
            className="absolute cursor-pointer right-3 top-500 -translate-y-500"
            onClick={() => setIsPasswordVisible((prevState) => !prevState)}
          >
            {isPasswordVisible ? (
              <EyeOffIcon className="w-5 h-5 icon-stroke-width-1" />
            ) : (
              <EyeIcon className="w-5 h-5 icon-stroke-width-1" />
            )}
          </i>
        )}
      </div>

      {/* Suggestion Dropdown */}
      {isFocused ? (
        props.isSuggestionsLoading ? (
          <div className="absolute z-20 bg-white left-0 right-0 w-full shadow-lg rounded-lg divide-y overflow-scroll max-h-60 flex justify-center py-3">
            <LoadingNireeka className="w-5 h-5 border-gray-700" />
          </div>
        ) : !!props.suggestions ? (
          <div className="absolute z-20 bg-white left-0 right-0 w-full shadow-lg rounded-lg divide-y overflow-scroll max-h-60">
            {props.suggestions.map((suggestion, index) => (
              <div
                key={Math.random() + "-" + index}
                className="block py-2 hover:bg-gray-100 cursor-pointer p-3"
                onClick={() => props.onAddressSuggestionClick(suggestion)}
              >
                <span className="text-sm font-light">
                  {suggestion.full_name}
                </span>
              </div>
            ))}
          </div>
        ) : null
      ) : null}

      {/* Errors */}
      {props.showError
        ? null
        : !props.noFormik &&
          props.formik.errors[props.name] &&
          props.formik.touched[props.name] && (
            <div
              id="formError"
              className="mx-1 mt-0.5 text-sm font-light text-red-500"
            >
              {props.formik.errors[props.name]}
            </div>
          )}
    </div>
  );
};

export default forwardRef(Input);
