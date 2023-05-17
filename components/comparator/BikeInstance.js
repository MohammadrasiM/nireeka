import classNames from "functions/classNames";
import dynamic from "next/dynamic";
import Image from "next/image";

const RemoveFromComparisonButton = dynamic(() => import("./RemoveButton"));

const BikeInstance = ({ bike, className, fetchBikes }) => {
  return (
    <th key={Math.random()} className={classNames("h-full font-normal max-w-xs px-4", className)}>
      <div className="relative w-full flex justify-center">
        <RemoveFromComparisonButton bikeId={bike.db_id} fetchBikes={fetchBikes} />
        <Image width={400} height={320} src={bike?.thumbnail || bike?.product?.variation_image} alt={bike?.title} objectFit="contain" />
      </div>
      <div>
        <h3 className="text-base md:text-xl text-left font-light">
          {bike?.product?.title} <span className="font-thin text-sm md:text-lg">{bike?.variation?.name}</span>
        </h3>
        <div
          style={{ backgroundColor: bike?.color?.code }}
          className={classNames("h-2", bike?.color?.code?.toLowerCase() === "#ffffff" && "border")}
       />
      </div>
    </th>
  );
};

export default BikeInstance;
