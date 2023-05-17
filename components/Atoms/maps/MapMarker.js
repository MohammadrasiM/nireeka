import classNames from "../../../functions/classNames";

const MapMarker = (props) => {
  return (
    <div
      className={classNames(props.className)}
      lat={props.lat}
      lng={props.lng}
    >
      {/* change image to img and it works */}
      <img
        width={4 * 7}
        height={7 * 7}
        alt=""
        src="/images/googleMapsPin.png"
        className="relative -translate-y-full"
      />
    </div>
  );
};

export default MapMarker;
