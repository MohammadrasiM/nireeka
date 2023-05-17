import SafeLinkifiedHtml from "@/components/SafeHtml/SafeLinkifiedHtml";
import { useCallback, useEffect, useState } from "react";
import { getBikeStatByOrderId } from "../../../app/api/nsd";
import { commafy } from "../../../functions/numbers";
import { convertSecondsToHMS } from "../../../functions/time";
import WhiteShadowCard from "../cards/WhiteShadowCard";
import Avatar from "./Avatar";
import CountryBadge from "./CountryBadge";

const UserInfoModal = (props) => {
  const [bikeStats, setBikeStats] = useState(null);

  let movingTimeHMS = [0, 0, 0];
  if (bikeStats)
    movingTimeHMS = convertSecondsToHMS(bikeStats.status.moving_time_seconds);

  const getBikeStats = useCallback(async (orderId) => {
    try {
      const response = await getBikeStatByOrderId(orderId);
      setBikeStats(response.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    if (
      !!props.data.bikes &&
      props.data.bikes.length &&
      props.data.bikes[0].order_bike_id
    )
      getBikeStats(props.data.bikes[0].order_bike_id);
  }, [props.data.bikes, getBikeStats]);

  return (
    <WhiteShadowCard
      noPadding
      className="px-4 py-4 shadow-xl border border-gray-200 space-y-3 text-sm text-gray-500 font-light"
    >
      {/* Avatar / name / country / Joined date */}
      <div className="flex">
        <Avatar user={props.data} noUserInfoModal />
        <div className="ml-4">
          <span className="font-light text-gray-900 text-base">
            <div className="flex justify-start">
              <span className="font-light text-gray-900 text-base">
                {props.data.name} {props.data.last_name}
              </span>
              {/* !!props.data.bikes[0] */}
              {!!props.data.bikes && (
                <span className="pl-1.5 mt-0.5">
                  <SafeLinkifiedHtml
                    className="comment-body-p text-gray-700 font-extralight text-sm break-words"
                    string={props.data.bikes[0].name}
                  />
                </span>
              )}
            </div>{" "}
          </span>
          {!!props.data.user_name && <p>@{props.data.user_name}</p>}
        </div>
        <div className="text-gray-700 ml-auto flex flex-col items-end justify-between">
          {!!props.data.show_country && !props.data.country.image_path && (
            <CountryBadge src={props.data.country.image_path} />
          )}
          {!!props.data.registered_at && (
            <span>Joined {props.data.registered_at}</span>
          )}
        </div>
      </div>
      {/* Bike and its status */}
      {!!props.data.bikes && props.data.bikes.length > 0 && (
        <div className="flex">
          {/* bike image */}
          {!!props.data.bikes[0].image && (
            <div className="flex-[2]">
              <img
                src={props.data.bikes[0].image}
                alt={props.data.bikes[0].name}
              />
            </div>
          )}
          {/* bike status */}
          <div className="flex flex-col items-center flex-1">
            {bikeStats && (
              <div className="flex flex-1 flex-col justify-center space-y-4">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    <span className="text-2xl ">
                      {commafy(bikeStats.status.current_trip)}
                    </span>
                    <span> km</span>
                  </span>
                  <span className="text-gray-500">Covered</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    <span className="text-2xl ">{movingTimeHMS[0]}</span>
                    <span> h </span>
                    <span className="text-2xl ">{movingTimeHMS[1]}</span>
                    <span> m </span>
                    <span className="text-2xl ">{movingTimeHMS[2]}</span>
                    <span> s </span>
                  </span>
                  <span className="text-gray-500">Riding time</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Stats */}
      <div className="flex justify-evenly">
        <div>
          <span className="text-center font-light">
            <span className="block text-xl text-gray-700">
              {props.data.points}
            </span>
            <span>points</span>
          </span>
        </div>
        <div>
          <span className="text-center font-light">
            <span className="block text-xl text-gray-700">
              {props.data.threads_count}
            </span>
            <span>posts</span>
          </span>
        </div>
        <div>
          <span className="text-center font-light">
            <span className="block text-xl text-gray-700">
              {props.data.comments_count}
            </span>
            <span>comments</span>
          </span>
        </div>
      </div>
    </WhiteShadowCard>
  );
};

export default UserInfoModal;
