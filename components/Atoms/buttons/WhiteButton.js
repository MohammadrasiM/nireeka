import classNames from "../../../functions/classNames";
import ConditionalLink from "../links/ConditionalLink";

const WhiteButton = (props) => {
  return (
    <button
      type={props.type ? props.type : "button"}
      onClick={props.disabled ? () => {} : props.onClick}
      disabled={!!props.disabled}
      className={classNames(
        "flex justify-center items-center shadow-sm text-sm rounded-md focus:outline-none border border-gray-300 focus:border-blue-600 transition-all",
        !props.href && "px-4 py-2",
        !!props.disabled
          ? "text-gray-700 bg-gray-200 cursor-not-allowed"
          : "bg-white hover:bg-gray-100 text-gray-700",
        props.className
      )}
    >
      <ConditionalLink
        href={props.href}
        condition={props.href}
        className="flex justify-center flex-1 px-4 py-2"
      >
        {props.children}
      </ConditionalLink>
    </button>
  );
};

export default WhiteButton;
