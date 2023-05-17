import Image from "next/image";

export default function ConfiguratorBike({ bikeImageSrc }) {
  return (
    <div
      style={{ position: "relative", overflow: "hidden" }}
      className="flex flex-col justify-center w-full h-full min-w-[250px] min-h-[190px] max-h-[350px] md:min-h-[512px] md:max-h-[600px]"
    >
      <Image
        alt="bike"
        className="w-full select-none"
        src={bikeImageSrc}
        loading="eager"
        layout="fill"
        objectFit="contain"
        objectPosition="center"
        quality={100}
      />
      {/* <img alt="bike" className="w-full select-none" src={bikeImageSrc} /> */}
    </div>
  );
}
