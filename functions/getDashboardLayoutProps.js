import { getAllLeaderboard } from "./getAllLeaderboard";
import { getAllTrendingPosts } from "./getAllTrendingPosts";

export const getDashboardLayoutProps = async () => {
  const trending = await getAllTrendingPosts();
  const leaderboard = await getAllLeaderboard();

  return {
    trending,
    leaderboard,
  };
};
