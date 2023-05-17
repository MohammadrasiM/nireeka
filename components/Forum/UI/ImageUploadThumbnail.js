import ImageOverlay from "@/components/Atoms/overlays/ImageOverlay";
import { useState } from "react";
import classNames from "../../../functions/classNames";
import XButton from "../../Atoms/XButton";
import ImageThumbnail from "./ImageThumbnail";
import Spinner from "@/components/common/Spinner";

const ImageUploadThumbnail = (props) => {
  const [isPicOverlaid, setIsPicOverlaid] = useState(false);

  return (
    <div className={classNames("relative", props.className)}>
      <ImageOverlay
        src={props.src || props.thumbnail}
        alt={props.alt}
        isVisible={isPicOverlaid}
        onClose={() => setIsPicOverlaid(false)}
        backdropMode="dark"
      />
      <ImageThumbnail
        src={props.thumbnail || props?.src}
        alt={props.alt}
        onClick={() => setIsPicOverlaid(true)}
        className={props.thumbnailClassName}
      />
      {props.isDeleting ? <Spinner className={props.xButtonClassName} /> : <XButton onClick={props.onCloseClick} className={props.xButtonClassName} />}
    </div>
  );
};

export default ImageUploadThumbnail;
