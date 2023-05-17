import GoogleMapReact from "google-map-react";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getBikeLastLocation } from "../../../app/api/nsd";
import { GOOGLE_JAVASCRIPT_API_KEY } from "../../../app/api_keys";
import LoadingNireeka from "../../Atoms/LoadingNireeka";
import MapMarker from "../../Atoms/maps/MapMarker";

const BikeLastLocation = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [locationCoordinates, setLocationCoordinates] = useState(null);

  const getData = async () => {
    if (props.macId) {
      try {
        setIsLoading(true);
        const locationRes = await getBikeLastLocation(props.macId);
        if (locationRes?.data?.location?.lat && locationRes?.data?.location?.long)
          setLocationCoordinates({
            lat: locationRes.data.location.lat,
            lng: locationRes.data.location.long,
          });
        else setLocationCoordinates(null);
      } catch (error) {
        console.log(error)
        setLocationCoordinates(null);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!props.macId) {
    return (
      <div className="w-full h-96 rounded-lg overflow-hidden">
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_JAVASCRIPT_API_KEY }}
          defaultCenter={{ lat: 50, lng: 50 }}
          defaultZoom={props.defaultZoom ? props.defaultZoom : 0}
          center={{ lat: 0, lng: 0 }}
        ></GoogleMapReact>
      </div>
    );
  }

  if (!locationCoordinates) {
    return <p>Couldn&apos;t load map. Try again later.</p>;
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden">
      {!isLoading ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_JAVASCRIPT_API_KEY }}
          defaultCenter={locationCoordinates}
          defaultZoom={props.defaultZoom ? props.defaultZoom : 14}
          center={locationCoordinates}
        >
          <MapMarker lat={locationCoordinates.lat} lng={locationCoordinates.lng} />
        </GoogleMapReact>
      ) : (
        <div className="h-full flex justify-center items-center">
          <LoadingNireeka className="w-12 h-12 border-gray-600" />
        </div>
      )}
    </div>
  );
};

export default BikeLastLocation;
