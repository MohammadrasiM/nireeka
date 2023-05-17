import classNames from "../../../functions/classNames";
import ConditionalLink from "../links/ConditionalLink";

const PrimaryButton = (props) => {
  return (
    <button
      type={props.type ? props.type : "button"}
      onClick={props.disabled ? () => {} : props.onClick}
      disabled={!!props.disabled}
      className={classNames(
        "flex justify-center items-center shadow-sm text-sm rounded-md focus:outline-none border border-transparent transition-all",
        !props.href && "px-4 py-2",
        !!props.disabled
          ? "text-white bg-gray-600 cursor-not-allowed"
          : "text-white bg-blue-600 hover:bg-blue-700",
        props.className
      )}
    >
      <ConditionalLink
        href={props.href}
        condition={props.href}
        className="flex flex-1 px-4 py-2"
      >
        {props.children}
      </ConditionalLink>
    </button>
  );
};

export default PrimaryButton;
