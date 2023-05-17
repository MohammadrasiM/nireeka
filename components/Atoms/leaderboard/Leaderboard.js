import { Fragment, useCallback, useEffect, useState } from "react";
import WhiteShadowCard from "../cards/WhiteShadowCard";
import classNames from "../../../functions/classNames";
import LeaderboardItem from "./LeaderboardItem";
import WhiteButton from "../buttons/WhiteButton";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { convertSecondsToHMS } from "../../../functions/time";
import { getAllLeaderboard } from "functions/getAllLeaderboard";

const sortByMenu = [
  {
    text: "Forum",
    keyInObj: "forum",
  },
  {
    text: "Odo",
    keyInObj: "odo",
  },
  {
    text: "Riding Time",
    keyInObj: "time",
  },
  {
    text: "Max speed",
    keyInObj: "speed",
  },
];

const Leaderboard = (props) => {
  const [leaderboard, setLeaderboard] = useState(props.leaderboard);
  const [sortBy, setSortBy] = useState(null);
  const defaultSortKey = "forum";
  const defaultSortText = "Forum";

  const handleSortLeaderboardClick = (sortKey) => {
    setSortBy(sortKey);
  };

  const refreshLeaderboard = useCallback(async () => {
    // Checks if trending posts already exist, if it true it won't fetch them anymore
    if (!!leaderboard) return;

    const leaderboardToSet = await getAllLeaderboard(props.NSDCount, props.forumCount);

    setLeaderboard(leaderboardToSet);
  }, [props.NSDCount, props.forumCount]);

  useEffect(() => {
    refreshLeaderboard();
  }, [refreshLeaderboard]);

  return (
    <section aria-labelledby="leaderboard" className="hidden lg:block">
      <WhiteShadowCard>
        <div className={classNames("flex items-center", props.className)}>
          <h2 className="text-base font-medium text-gray-900">Leaderboard</h2>
          {/* Sorting Menu */}
          <div className="flex ml-auto">
            <Menu as="div" className="relative text-left font-light">
              <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 bg-white text-sm font-light text-gray-700 hover:bg-gray-50">
                  Sorted By {sortBy ? sortBy.text : defaultSortText}
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5 icon-stroke-width-1"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    {sortByMenu.map((item, index) => (
                      <Menu.Item key={`trendingSortMenu-${index}`}>
                        {({ active }) => (
                          <p
                            className={`${active ? "bg-gray-100 text-gray-900" : "text-gray-700"} ${
                              sortBy && item.keyInObj === sortBy.keyInObj ? "text-blue-500" : ""
                            } block px-4 py-2 text-sm font-light space-x-3 cursor-pointer`}
                            onClick={() => handleSortLeaderboardClick(item)}
                          >
                            {item.icon}
                            <span>{item.text}</span>
                          </p>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div className="mt-6 flow-root space-y-4">
          {!!leaderboard ? (
            !!leaderboard[sortBy ? sortBy.keyInObj : defaultSortKey] &&
            leaderboard[sortBy ? sortBy.keyInObj : defaultSortKey].map((item, index) => {
              let text = "";
              const sortKey = sortBy ? sortBy.keyInObj : defaultSortKey;

              if (sortKey === "odo") {
                text = `ODO: ${item.value} km`;
              } else if (sortKey === "time") {
                const HMS = convertSecondsToHMS(item.value);
                text = `Riding Time: ${HMS[0] + ":" + HMS[1] + ":" + HMS[2]}`;
              } else if (sortKey === "speed") {
                text = `Max Speed: ${item.value} km/h`;
              } else {
                text = `Points: ${item.points}`;
              }

              return (
                <LeaderboardItem
                  key={index}
                  user={item.user}
                  points={sortKey === "forum" ? item.points : item.value}
                  text={text}
                  rank={index + 1}
                  noNumber={props.noNumber}
                />
              );
            })
          ) : (
            <span className="text-sm">Nothing to display</span>
          )}
        </div>
        {!props.noViewAll && (
          <WhiteButton className="mt-6 w-full font-light" href="/forum/leaderboard">
            View all
          </WhiteButton>
        )}
      </WhiteShadowCard>
    </section>
  );
};

export default Leaderboard;
