import { ClockIcon } from "@heroicons/react/outline";
import { Fragment, useEffect, useState } from "react";
import { getRidesData } from "../../../app/api/nsd";
import {
  convertSecondsToHMS,
  getDateDiffInDays,
} from "../../../functions/time";
import WhiteShadowCard from "../../Atoms/cards/WhiteShadowCard";
import LoadingNireeka from "../../Atoms/LoadingNireeka";
import TripRecordChart from "./TripRecordsChart";

const HMS = ["h", "m", "s"];

const WeeklyReport = (props) => {
  const [lastWeekData, setLastWeekData] = useState(null);
  const [thisWeekData, setThisWeekData] = useState(null);

  const [thisWeekRidingTime, setThisWeekRidingTime] = useState(0);
  const [diffWeekRidingTime, setDiffWeekRidingTime] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const getChartData = async () => {
    setIsLoading(true);
    // const date = new Date();
    // const epochNow = date.getTime();
    // const epochStartOfLastWeek = date.setDate(
    //   date.getDate() - date.getDay() - 7
    // );
    // const res = await getRidesData(props.macId, epochStartOfLastWeek, epochNow);

    // const rides = res.data.resRides;
    const rides = props.rides;

    const lastWeek = [];
    const thisWeek = [];
    // Initilizing last week data
    for (let i = 0; i < 7; i++) {
      lastWeek.push(null);
      thisWeek.push(null);
    }

    const nowDate = new Date();
    for (let i = 0; i < rides.length; i++) {
      const rideDate = new Date(rides[i].date);
      const daysDiff = getDateDiffInDays(rideDate, nowDate);

      if (daysDiff > nowDate.getDay()) {
        // It's last week data
        lastWeek[rideDate.getDay()] = rides[i];
      } else {
        // It's this week data
        thisWeek[rideDate.getDay()] = rides[i];
      }
    }

    const lastWeekRidingTime = lastWeek.reduce(
      (sum, item) => sum + (item ? item.records.moving_time_seconds : 0)
    );
    const thisWeekRidingTime = thisWeek.reduce(
      (sum, item) => sum + (item ? item.records.moving_time_seconds : 0),
      0
    );
    const diffWeekRidingTime = thisWeekRidingTime - lastWeekRidingTime;

    setLastWeekData(lastWeek);
    setThisWeekData(thisWeek);

    setThisWeekRidingTime(thisWeekRidingTime);
    setDiffWeekRidingTime(diffWeekRidingTime);

    setIsLoading(false);
  };

  useEffect(() => {
    if (props.rides) getChartData();
    else setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <section>
        <WhiteShadowCard noPadding className="shadow-md py-6">
          <div className="flex justify-center">
            <LoadingNireeka className="w-14 h-14 border-gray-600" />
          </div>
        </WhiteShadowCard>
      </section>
    );
  }

  return (
    <section>
      <WhiteShadowCard noPadding className="shadow-md overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 text-md text-gray-700">
          <h2 className="font-medium text-gray-700">Your Weekly Report</h2>
          <div className="flex flex-col items-center space-y-2 py-5 sm:py-0">
            <p>Riding time this week</p>
            <p className="flex items-center space-x-1 text-gray-900">
              <ClockIcon className="w-6 h-6 icon-stroke-width-1" />
              <span>
                {thisWeekRidingTime
                  ? convertSecondsToHMS(thisWeekRidingTime).map(
                      (time, index) =>
                        time !== 0 && (
                          <Fragment key={index}>
                            <span className="font-medium text-2xl">{time}</span>
                            {HMS[index] + " "}
                          </Fragment>
                        )
                    )
                  : <span className="font-medium text-2xl">00:00:00</span>}
              </span>
            </p>
            <p>
              {diffWeekRidingTime !== 0 &&
                convertSecondsToHMS(Math.abs(diffWeekRidingTime)).map(
                  (time, index) =>
                    time !== 0 && (
                      <span key={"mtlw" + index} className="font-medium">
                        {time + HMS[index] + " "}
                      </span>
                    )
                )}
              {diffWeekRidingTime > 0 && "more than last week"}
              {diffWeekRidingTime < 0 && "less than last week"}
            </p>
          </div>
        </div>
        <div className="bg-gray-100 px-4 py-3">
          <TripRecordChart
            lastWeekData={lastWeekData}
            thisWeekData={thisWeekData}
          />
        </div>
      </WhiteShadowCard>
    </section>
  );
};

export default WeeklyReport;
