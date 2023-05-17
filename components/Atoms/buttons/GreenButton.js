import classNames from "../../../functions/classNames";
import ConditionalLink from "../links/ConditionalLink";

const GreenButton = (props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={classNames(
        "flex justify-center items-center shadow-sm text-sm rounded-xl focus:outline-none border border-nireekaGreen transition-all",
        props.reverse
          ? "bg-transparent text-nireekaGreen hover:bg-nireekaGreen hover:text-white"
          : "bg-nireekaGreen text-white hover:bg-transparent hover:text-nireekaGreen",
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

export default GreenButton;
