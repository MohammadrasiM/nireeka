import classNames from "../../../functions/classNames";
import ConditionalLink from "../links/ConditionalLink";

const DangerButton = (props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={classNames(
        "flex justify-center items-center shadow-sm text-sm rounded-md focus:outline-none bg-red-600 text-white hover:bg-red-700 transition-all",
        !props.href && "px-4 py-2",
        props.className
      )}
    >
      <ConditionalLink href={props.href} condition={props.href} className="flex flex-1 px-4 py-2">
        {props.children}
      </ConditionalLink>
    </button>
  );
};

export default DangerButton;
