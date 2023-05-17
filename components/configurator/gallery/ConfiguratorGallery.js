import { useSelector } from "react-redux";
import GalleryThumbnail from "./GalleryThumbnail";

const ConfiguratorGallery = () => {
  const pictures = useSelector((state) => state.configurator.configuratorData?.gallery);

  return (
    <div className="flex flex-row flex-wrap items-center space-x-4">
      {pictures?.map((picture, index) => (
          <GalleryThumbnail
            key={index}
            src={picture.thumbnail}
            alt={picture.title}
          />
        ))}
    </div>
  );
};

export default ConfiguratorGallery;
