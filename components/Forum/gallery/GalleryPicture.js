import { PhotographIcon } from "@heroicons/react/outline";
import { useState, useRef, useEffect } from "react";
import classNames from "../../../functions/classNames";
import ImageOverlay from "../../Atoms/overlays/ImageOverlay";

const GalleryPicture = (props) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const handleOpenImageClick = () => {
    setIsMaximized(true);
  };
  const handleCloseImageClick = () => {
    setIsMaximized(false);
  };
  const imageThumpRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (imageThumpRef.current.complete) setIsLoaded(true);
  }, []);

  return (
    <div className={`basis-full sm:basis-[45%] max-h-56 rounded-md overflow-hidden shadow-md mb-4 cursor-pointer ${props?.containerClassName}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageThumpRef}
        src={props.thumbnail || props.src}
        alt={props.alt}
        title={props.title}
        onClick={!isLoaded ? () => {} : handleOpenImageClick}
        onLoad={() => setIsLoaded(true)}
        className={classNames("w-full h-full object-cover object-center", !isLoaded && "hidden", props?.className)}
      />
      {!isLoaded && (
        <div className="w-full h-56 bg-gray-200 animate-pulse">
          <PhotographIcon className="icon-stroke-width-1 w-full h-full text-gray-300" />
        </div>
      )}
      <ImageOverlay
        isVisible={isMaximized}
        src={props.src}
        alt={props.alt}
        title={props.title}
        onClose={handleCloseImageClick}
        // href={props.href}
      />
    </div>
  );
};

export default GalleryPicture;
