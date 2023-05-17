import { useSelector } from "react-redux";
// import ConfiguratorBike from "@/components/configurator/ConfiguratorBike";
import BikePerformance from "@/components/configurator/Performance/BikePerformance";
import ConfiguratorUnitSwitch from "@/components/configurator/ConfiguratorUnitSwitch";
import Image from "next/image";

const ConfiguratorOverviewTab = () => {
  const selectedColor = useSelector(
    (state) => state?.configurator.selectedColor
  );
  const configuratorData = useSelector(
    (state) => state?.configurator.configuratorData
  );

  return (
    <section id="overview" className="flex flex-col items-start bg-white">
      <div
        style={{ position: "relative", overflow: "hidden" }}
        className="h-full w-full max-h-[520px] min-h-[190px] md:min-h-[350px] lg:min-h-[460px] "
      >
        <Image
          alt="bike"
          className="w-full select-none"
          src={
            selectedColor
              ? selectedColor.pivot.image_path
              : configuratorData.image
          }
          layout="fill"
          objectFit="contain"
          objectPosition="center"
          // loading="eager"
          priority={true}
        />
      </div>

      {/* <img
        alt="bike"
        className="w-full select-none"
        src={
          selectedColor
            ? selectedColor.pivot.image_path
            : configuratorData.image
        }
      /> */}
      <span className="text-sm w-full text-gray-500 font-normal italic text-center mb-3">
        The bikes shown in this configurator are computer-generated pictures in
        an artificial lighting studio and may not be exactly as shown in the
        real world.
      </span>
      {/*<ConfiguratorBike bikeImageSrc={selectedColor ? selectedColor.pivot.image_path : configuratorData.image}/>*/}
      <BikePerformance mode="stats" />
      <ConfiguratorUnitSwitch />
    </section>
  );
};

export default ConfiguratorOverviewTab;
