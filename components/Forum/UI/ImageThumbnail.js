import Image from "next/image";
import classNames from "../../../functions/classNames";

const ImageThumbnail = (props) => {
  return (
    <img
      loading="lazy"
      src={props.src}
      alt={props.alt}
      onClick={props.onClick}
      className={classNames("h-full rounded-md cursor-pointer border border-gray-200 object-cover", props.className)}
    />
  );
};

export default ImageThumbnail;
