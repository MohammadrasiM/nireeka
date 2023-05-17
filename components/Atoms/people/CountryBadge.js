import Image from "next/image";

const CountryBadge = (props) => {
  if (!props.src && !props.name) return <></>;
  return (
    <div className="flex space-x-1">
      <div className="relative z-0 rounded-full flex items-center justify-center">
        {!!props.src && (
          <Image
            width={15}
            height={15}
            alt={props.name ? props.name : ""}
            objectFit="cover"
            src={props.src}
            className="rounded-full z-0"
          />
        )}
      </div>
      {!!props.name && <p className="text-xs text-gray-700">{props.name}</p>}
    </div>
  );
};

export default CountryBadge;
