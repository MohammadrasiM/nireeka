import { ClockIcon, HeartIcon, MapIcon, TrendingUpIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { convertSecondsToHMS } from "../../../functions/time";
import { METRIC_SYSTEM, UNITS } from "../../../app/constants/units";
import classNames from "../../../functions/classNames";
import { convertMetricToImperial } from "../../../functions/convertors";
import { cleanNumberForUI, getOrdinalSuffixOf } from "../../../functions/numbers";
import WhiteShadowCard from "../../Atoms/cards/WhiteShadowCard";

const Stats = (props) => {
  const userUnitSystem = useSelector((state) => state.auth.userData?.unit);

  let totalRidingTimeHMS = [0, 0, 0];
  if (props.status && props.status.moving_time_seconds) {
    totalRidingTimeHMS = convertSecondsToHMS(props.status.moving_time_seconds);
    totalRidingTimeHMS = totalRidingTimeHMS.map((item) => {
      if (item < 10) return "0" + item;
      else return `${item}`;
    });
  }

  const latestRide =
    props.rides && props.rides.length > 0 ? props.rides[props.rides.length - 1].records : null;

  const stats = [
    {
      icon: <MapIcon className="h-6 w-6 icon-stroke-width-1" />,
      value:
        props.status && props.status.odo
          ? userUnitSystem === METRIC_SYSTEM
            ? cleanNumberForUI(props.status.odo)
            : cleanNumberForUI(convertMetricToImperial.km2mile(props.status.odo))
          : "0",
      subvalue: UNITS[userUnitSystem].distance,
      subtitle: "ODO (Total distance traveled by you)",
      badge: props.leaderboard
        ? getOrdinalSuffixOf(props.leaderboard.odo_based + 1) + " in leaderboard"
        : "Not in leaderboard",
      iconForeground: "text-teal-700",
      iconBackground: "bg-teal-50",
    },
    {
      icon: <ClockIcon className="h-6 w-6 icon-stroke-width-1" />,
      value:
        props.status && totalRidingTimeHMS !== null
          ? totalRidingTimeHMS[0] + ":" + totalRidingTimeHMS[1] + ":" + totalRidingTimeHMS[2]
          : "00:00:00",
      subvalue: "",
      subtitle: "Total riding time",
      badge: props.leaderboard
        ? getOrdinalSuffixOf(props.leaderboard.time_based + 1) + " in leaderboard"
        : "Not in leaderboard",
      iconForeground: "text-purple-700",
      iconBackground: "bg-purple-50",
    },
    {
      icon: <TrendingUpIcon className="h-6 w-6 icon-stroke-width-1" />,
      value:
        props.status && props.status.max_speed_ever
          ? userUnitSystem === METRIC_SYSTEM
            ? cleanNumberForUI(props.status.max_speed_ever)
            : cleanNumberForUI(convertMetricToImperial.kmph2mph(props.status.max_speed_ever))
          : "0",
      subvalue: UNITS[userUnitSystem].speed,
      subtitle: "Max Speed Record",
      badge: props.leaderboard
        ? getOrdinalSuffixOf(props.leaderboard.speed_based + 1) + " in leaderboard"
        : "Not in leaderboard",
      iconForeground: "text-sky-700",
      iconBackground: "bg-sky-50",
    },
    {
      icon: <HeartIcon className="h-6 w-6 icon-stroke-width-1" />,
      value: latestRide && latestRide.max_hb ? cleanNumberForUI(latestRide.max_hb) : "0",
      subvalue: "bpm",
      subtitle: "Max Heart Beat (Latest record from last 2 weeks)",
      badge:
        latestRide && latestRide.avg_hb
          ? cleanNumberForUI(latestRide.avg_hb) + " bpm in average"
          : "0bpm in average",
      iconForeground: "text-yellow-700",
      iconBackground: "bg-yellow-50",
    },
  ];

  return (
    <section aria-labelledby="stats-title">
      <WhiteShadowCard
        noPadding
        className="bg-gray-200 divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px"
      >
        <h2 className="sr-only" id="stats-title">
          Stats
        </h2>
        {stats.map((action, actionIdx) => (
          <div
            key={actionIdx}
            className={classNames(
              actionIdx === 0 ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none" : "",
              actionIdx === 1 ? "sm:rounded-tr-lg" : "",
              actionIdx === stats.length - 2 ? "sm:rounded-bl-lg" : "",
              actionIdx === stats.length - 1
                ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                : "",
              "relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
            )}
          >
            <div>
              <span
                className={classNames(
                  action.iconBackground,
                  action.iconForeground,
                  "rounded-lg inline-flex p-3 ring-4 ring-white"
                )}
              >
                {action.icon}
              </span>
            </div>
            <div className="mt-8">
              <h3 className="font-light">
                <a href={action.href} className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  <span className="text-5xl">{action.value}</span>
                  <span className="text-lg"> {action.subvalue}</span>
                </a>
              </h3>
              <p className="mt-2 mb-3 text-sm text-gray-500">{action.subtitle}</p>
              <span
                className={classNames(
                  action.iconBackground,
                  action.iconForeground,
                  "text-sm px-3 py-1 rounded-full"
                )}
              >
                {action.badge}
              </span>
            </div>
            {/* <span
              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span> */}
          </div>
        ))}
      </WhiteShadowCard>
    </section>
  );
};

export default Stats;
