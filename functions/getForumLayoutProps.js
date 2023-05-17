import { getChannelsList } from "../app/api/forum/index";
import { getAllLeaderboard } from "./getAllLeaderboard";
import { getAllTrendingPosts } from "./getAllTrendingPosts";

export const getForumLayoutProps = async () => {
  const channels = (await getChannelsList()).data;
  const trending = await getAllTrendingPosts();
  const leaderboard = await getAllLeaderboard();

  return {
    channels,
    trending,
    leaderboard,
  };
};
