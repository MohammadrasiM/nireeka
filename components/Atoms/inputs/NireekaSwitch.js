import { Switch } from "@headlessui/react";
import classNames from "../../../functions/classNames";
import LoadingNireeka from "../LoadingNireeka";

const NireekaSwitch = (props) => {
  return (
    <Switch.Group>
      <div className={classNames(props.isInline && "flex items-center", props.className)}>
        <Switch.Label className="text-sm font-light text-gray-700 mr-4">{props.label}</Switch.Label>
        {props.isLoading !== undefined && (
          <div className="flex items-center">
            {props.isLoading && <LoadingNireeka className="w-5 h-5 border-gray-600" />}
          </div>
        )}
        <div className={classNames("flex items-center", props.isInline && "ml-auto")}>
          {!!props.disabledText && <span className="mr-2">{props.disabledText}</span>}
          <Switch
            checked={props.enabled}
            onChange={props.onChange && !props.disabled ? props.onChange : () => {}}
            className={classNames(
              "relative inline-flex items-center w-11 h-6 rounded-full transition-colors focus:outline-none",
              props.alwaysOn
                ? "bg-blue-600"
                : props.disabled
                ? "bg-gray-300 cursor-not-allowed"
                : props.enabled
                ? "bg-blue-600"
                : "bg-gray-200"
            )}
            style={{ width: props.width, height: props.height }}
          >
            <span
              className={classNames(
                "inline-block w-4 h-4 transform bg-white rounded-full transition-transform",
                props.enabled ? "translate-x-6" : "translate-x-1"
              )}
              style={{
                width: props.height - 8,
                height: props.height - 8,
                transform: `translateX(${
                  props.enabled ? props.width - props.height + 4 + "px" : "4px"
                })`,
              }}
            />
          </Switch>
          {!!props.enabledText && <span className="ml-2">{props.enabledText}</span>}
        </div>
      </div>
    </Switch.Group>
  );
};

export default NireekaSwitch;
