import { getTrendingPosts } from "app/api/forum";

export const getAllTrendingPosts = async () => {
  const trending = {};

  let responses = null;
  try {
    responses = await Promise.all([
      getTrendingPosts("popularity"),
      getTrendingPosts("comment"),
      getTrendingPosts("view"),
    ]);
  } catch (error) {
    return null;
  }

  if (!responses) return null;

  trending.popularity = responses[0].data.populars;
  trending.comment = responses[1].data.populars;
  trending.view = responses[2].data.populars;

  return trending;
};
