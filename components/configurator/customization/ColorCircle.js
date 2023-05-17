import Image from "next/image";
import classNames from "../../../functions/classNames";

export default function ColorCircle(props) {
  return (
    <div
      className={classNames("flex flex-col justify-center", props.className)}
      onClick={!props.isDisabled ? props.onClick : null}
    >
      <div
        className={classNames(
          props.isSelected ? "border-blue-800" : "border-transparent",
          "border rounded-full flex flex-col justify-center p-1",
          props.isDisabled && !props.isSelected ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        )}
      >
        <Image
          title={props.color.title}
          alt={props.color.title}
          className="w-auto rounded-md"
          width={40}
          height={40}
          src={props.color.image_path}
        />
      </div>
    </div>
  );
}
