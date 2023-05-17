import classNames from "../../../functions/classNames";

const BikeBadge = (props) => {
  return (
    <span className={classNames("flex items-center font-light whitespace-nowrap text-xs text-gray-700", props.className)}>
      {props.bikeName !== "Not a Nireeka owner" && (
        <span
          className={classNames(
            "inline-block w-3 h-3 rounded-full mr-1",
            (props.bikeColor.toLowerCase() === "#efefef" ||
              props.bikeColor.toLowerCase() === "#ffffff") &&
              "border border-gray-500",
            props.badgeClassName
          )}
          style={{ backgroundColor: props.bikeColor }}
        ></span>
      )}
      <span>{props.bikeName}</span>
    </span>
  );
};

export default BikeBadge;
