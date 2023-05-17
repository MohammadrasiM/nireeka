import React, { useState } from "react";
import { useSelector } from "react-redux";
import BlurBackdrop from "@/components/Atoms/overlays/BlurBackdrop";
import ConfiguratorHeader from "@/components/configurator/header/ConfiguratorHeader";
import Image from "next/image";

const ConfiguratorFeatureTab = () => {
  const [video, setVideo] = useState(undefined);
  const configuratorData = useSelector(
    (state) => state?.configurator.configuratorData
  );

  if (!configuratorData?.features?.items?.length) return null;

  return (
    <section id="feature" className="mt-[100px]">
      <ConfiguratorHeader>features</ConfiguratorHeader>
      <div className="w-full flex flex-col space-y-12 md:space-y-4">
        {configuratorData?.features?.items?.map((feature) => (
          <div
            key={feature?.id}
            className="flex flex-col lg:flex-row justify-between items-start space-y-2 lg:space-y-0 lg:space-x-4"
          >
            <div
              className="flex-1 w-full"
              onClick={() => {
                if (feature?.video_url) setVideo(feature?.video_url);
              }}
            >
              {/* <img alt={feature?.title}
                                 className="w-full select-none max-h-64 object-cover w-auto"
                                 src={feature?.photo}
                            /> */}
              <div
                style={{ overflow: "hidden", position: "relative" }}
                className="w-full h-full min-w-[200px] min-h-[170px] md:min-h-[242px] select-none max-h-[260px] "
              >
                <Image
                  alt={feature?.title}
                  src={feature?.photo}
                  loading="eager"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  quality={100}
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-center border-t-2 border-gray-900 pb-4 w-full lg:w-1/3 min-w-[16rem]">
              <h3 className="text-xl font-semibold text-gray-900 text-left py-2">
                {feature?.title}
              </h3>
              <div
                className="text-sm font-light text-gray-800 disable-preflight"
                dangerouslySetInnerHTML={{
                  __html: feature?.description,
                }}
              />
              {/*<p className="text-sm font-light text-gray-400">{feature?.description}</p>*/}
              {!!feature?.video_url && (
                <button
                  type="button"
                  className="bg-black px-6 py-2 text-white font-normal mt-6"
                  onClick={() => setVideo(feature?.video_url)}
                >
                  Learn more
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <BlurBackdrop
        isVisible={!!video}
        onClose={() => {
          setVideo(undefined);
        }}
        backdropColorClass="bg-black/40"
        className="relative w-full mx-auto h-inherit top-7 md:max-w-3xl"
        customStyle={{ width: "calc(100% - 1rem)", overflowY: "hidden" }}
      >
        <div className="flex justify-center items-center">
          <iframe
            width="800"
            height="500"
            src={video + "?autoplay=1&amp;modestbranding=1&amp"}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </BlurBackdrop>
    </section>
  );
};

export default ConfiguratorFeatureTab;
