import classNames from "../../../functions/classNames";
import ConditionalLink from "../links/ConditionalLink";

const SecondaryButton = (props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={classNames(
        "flex justify-center items-center shadow-sm text-sm rounded-md focus:outline-none text-indigo-700 bg-indigo-100 hover:bg-indigo-200",
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

export default SecondaryButton;
