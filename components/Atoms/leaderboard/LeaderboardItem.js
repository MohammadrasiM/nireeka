import Avatar from "../people/Avatar";
import Name from "../people/Name";

const LeaderboardItem = (props) => {
  // let rankColorClassname = "text-gray-700";
  // if (index === 0) rankColorClassname = "gold";
  // else if (index === 1) rankColorClassname = "silver";
  // else if (index === 2) rankColorClassname = "brown";
  return (
    <div
      key={`leaderboard-${props.rank}`}
      className="flex items-center space-x-4"
    >
      {!props.noNumber && (
        <div>
          <span className="text-lg font-light text-gray-900">
            {props.rank}
          </span>
        </div>
      )}
      <div>
        <Avatar user={props.user} />
      </div>
      <div>
        <span className="block text-sm font-light text-gray-900">
          <Name user={props.user}>{props.user.full_name}</Name>
        </span>
        <span className="block text-sm font-light text-gray-500">
          <span>{props.text ? props.text : "Points: " + props.points}</span>
        </span>
      </div>
    </div>
  );
};

export default LeaderboardItem;
