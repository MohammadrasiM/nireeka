import { forwardRef, useEffect, useRef, useState } from "react";
import classNames from "../../../functions/classNames";

const TextArea = (props, ref) => {
  // A state to set input's height automatically while typing
  const [postBodyTextAreaHeight, setPostBodyTextAreaHeight] = useState("auto");
  const handlePostBodyChange = (e) => {
    setPostBodyTextAreaHeight("auto");
  };
  useEffect(() => {
    setPostBodyTextAreaHeight(ref.current.scrollHeight);
  }, [postBodyTextAreaHeight, ref]);

  return (
    <div>
      <div className="flex justify-between">
        {!!props.label && (
          <label
            htmlFor={props.name}
            className="block text-sm font-light text-gray-700"
          >
            {props.label}
          </label>
        )}
        {!!props.isOptional && (
          <span className="text-sm text-gray-500">Optional</span>
        )}
      </div>
      <div className="mt-1">
        <textarea
          id={props.name}
          name={props.name}
          rows={props.rows}
          className={classNames(
            "shadow-sm px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md",
            props.className
          )}
          style={{ minHeight: postBodyTextAreaHeight }}
          onInput={handlePostBodyChange}
          value={props.value}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          maxLength={props.maxLength}
          onChange={props.onChange}
          ref={ref}
        />
      </div>
      {!!props.helpText && (
        <p className="mt-2 text-sm text-gray-500">{props.helpText}</p>
      )}
    </div>
  );
};

export default forwardRef(TextArea);
