import classNames from "../../../functions/classNames";
import ConditionalLink from "../links/ConditionalLink";

const OrangeButton = (props) => {
  return (
    <button
      type={props.type ? props.type : "button"}
      onClick={props.disabled ? () => {} : props.onClick}
      disabled={!!props.disabled}
      className={classNames(
        "flex justify-center w-full text-sm font-light rounded-md shadow-sm transition-all",
        "text-white  bg-nireekaOrange border border-transparent",
        !props.disabled && "hover:border-nireekaOrange hover:text-nireekaOrange hover:bg-white",
        !props.href && "px-4 py-2",
        "disabled:text-white disabled:bg-gray-400 disabled:cursor-not-allowed",
        props.className
      )}
    >
      <ConditionalLink href={props.href} condition={props.href} className="flex-1 px-4 py-2">
        {props.children}
      </ConditionalLink>
    </button>
  );
};

export default OrangeButton;
