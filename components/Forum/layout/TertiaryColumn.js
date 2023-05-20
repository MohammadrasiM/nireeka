import Leaderboard from "../../Atoms/leaderboard/Leaderboard";
import Trending from "../../Atoms/trending/Trending";

const TertiaryColumn = (props) => {
  return (
    <div className="space-y-4">
      {/* <WhoToFollow /> */}
      <Trending posts={props.trending} />
      {/* <Leaderboard leaderboard={props.leaderboard} noNumber /> */}
    </div>
  );
};

export default TertiaryColumn;
