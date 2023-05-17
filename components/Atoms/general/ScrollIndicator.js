import classNames from "functions/classNames";

export default function ScrollIndicator(props) {
  return (
    <div
      className={classNames("flex flex-col items-center", props.className)}
      onClick={typeof props.onClick === "function" ? props.onClick : () => {}}
    >
      <div className="relative h-12 w-[3px] mb-2">
        <span className="w-full h-full block before:w-[1px] before:h-full before:block before:absolute before:inset-0 before:mx-auto before:bg-gray-700 after:w-[3px] after:h-200 after:bg-gray-700 after:rounded-xl after:block after:absolute after:inset-0 after:mx-auto after:animate-scroller"></span>
      </div>
      <span className="font-light">SCROLL</span>
    </div>
  );
}
