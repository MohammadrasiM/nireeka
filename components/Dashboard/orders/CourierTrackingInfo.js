const CourierTrackingInfo = (props) => {
  return (
    <>
      {!!props.trackNumber && (
        <span className="text-sm">
          Tracking Number: <span className="text-gray-700">{props.trackNumber}</span>
        </span>
      )}
      {!!props?.courier?.name && (
        <span className="text-sm">
          Courier:{" "}
          {props.courier?.url && props?.trackNumber ? (
            <a
              href={props.courier.url + props.trackNumber}
              target="_blank"
              rel="noreferrer"
              className={props.courier.url ? "text-blue-500 hover:underline" : "text-gray-700"}
            >
              <span>{props.courier.name}</span>
            </a>
          ) : (
            <span className="text-gray-700">{props.courier.name}</span>
          )}
        </span>
      )}
    </>
  );
};

export default CourierTrackingInfo;
