import classNames from "functions/classNames";

const MainPageBikeData = (props) => {
  return (
    <div>
      <div
        className={classNames(
          "transition duration-500  transform opacity-0",
          props.isHovered && "opacity-100"
        )}
      >
        {!!props.data && (
          <div className="absolute translate-x-200  grid grid-cols-2 gap-4 -top-12">
            {props.data?.specs.map((spec, index) => (
              <div key={index}>
                <h2 className="text-5xl font-extralight">{spec.value}</h2>
                <span className="block">{spec.title}</span>
              </div>
            ))}

            {props.data.hasOptionalUpgrades && (
              <p className="font-extralight">* Optional upgrades</p>
            )}
          </div>
        )}
      </div>

      {!!props.data && (
        <h4
          className={`text-6xl text-center transition duration-500  text-gray-900 opacity-100 font-extralight ${
            props.isHovered && "opacity-10"
          }`}
        >
          {props.data?.title}
          <span className="ml-3 text-2xl ">{props.data?.emoji}</span>
        </h4>
      )}
    </div>
  );
};

export default MainPageBikeData;
