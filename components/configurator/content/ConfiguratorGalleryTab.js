import GalleryPicture from "@/components/Forum/gallery/GalleryPicture";
import {useSelector} from "react-redux";
import ConfiguratorHeader from "@/components/configurator/header/ConfiguratorHeader";
import React from "react";

const ConfiguratorGalleryTab = () => {
  const configuratorData = useSelector((state) => state?.configurator.configuratorData);

  if(!configuratorData?.gallery?.length) return null

  return (
      <section id="gallery" className="flex flex-wrap justify-between items-center mt-[100px]">
          <ConfiguratorHeader>
              gallery
          </ConfiguratorHeader>
          {configuratorData?.gallery?.map((item, index) => (
              <GalleryPicture
                  containerClassName="sm:basis-full md:max-h-48"
                  key={index}
                  src={item.original}
                  thumbnail={item.thumbnail}
                  alt={item.title}
                  title={item.title}
                  href={item.link}
              />
          ))}
      </section>
  );
};

export default ConfiguratorGalleryTab;
