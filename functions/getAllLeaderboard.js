import { getAllLeaderboardData, getLeaderboardData, getNSDLeaderboard } from "app/api/leaderboard";

export const getAllLeaderboard = async (
  NSDLeaderboardCount = 6,
  forumLeaderboardCount = "less"
) => {
  let res;
  // Fetching leaderboard
  const allLeaderboard = {};

  let responses = null;
  try {
    responses = await Promise.all([
      forumLeaderboardCount === "less" ? getLeaderboardData() : getAllLeaderboardData(),
      getNSDLeaderboard("odo", NSDLeaderboardCount),
      getNSDLeaderboard("time", NSDLeaderboardCount),
      getNSDLeaderboard("speed", NSDLeaderboardCount),
    ]);
  } catch (error) {
    console.log("Couldn't get leaderboard data.", error, error.response);
    return null;
  }

  if (!responses) return null;

  allLeaderboard.forum = responses[0].data;
  allLeaderboard.odo = responses[1].data;
  allLeaderboard.time = responses[2].data;
  allLeaderboard.speed = responses[3].data;

  return allLeaderboard;
};
