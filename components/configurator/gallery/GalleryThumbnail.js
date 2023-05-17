import { PhotographIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useState } from "react";
import classNames from "functions/classNames";
import ImageOverlay from "components/Atoms/overlays/ImageOverlay";

const GalleryThumbnail = (props) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleOpenImageClick = () => {
    setIsMaximized(true);
  };
  const handleCloseImageClick = () => {
    setIsMaximized(false);
  };

  return (
    <div className={classNames("cursor-pointer", props.className)}>
      <Image
        width={150}
        height={100}
        objectFit="cover"
        src={props.thumbnail || props.src}
        alt={props.alt || props.title}
        title={props.title}
        onClick={!isLoaded ? () => {} : handleOpenImageClick}
        onLoad={() => setIsLoaded(true)}
        className={classNames(
          "object-cover object-center rounded-lg",
          !isLoaded && "hidden"
        )}
      />
      {!isLoaded && (
        <div className="w-full h-[100px] rounded-lg bg-gray-200 animate-pulse">
          <PhotographIcon className="icon-stroke-width-1 w-full h-full text-gray-300" />
        </div>
      )}
        {isMaximized && (
            <ImageOverlay
                isVisible
                src={props.src || props.thumbnail}
                alt={props.alt || props.title}
                title={props.title}
                onClose={handleCloseImageClick}
                href={props.href}
            />
        )}
    </div>
  );
};

export default GalleryThumbnail;
