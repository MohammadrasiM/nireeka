import AppHttp from "../AppHttp";

export const getFeedPostsByPage = async (pageNum) => {
  const http = AppHttp();
  try {
    const res = await http.get("/api/forum/threads", {
      params: { page: pageNum },
    });
    return res.data;
  } catch (error) {
    console.log("Error fetching forum posts.", error, error.response);
    return error;
  }
};

export const getTrendingPosts = async (sortBy) => {
  let queryString = {};
  switch (sortBy) {
    case "popularity":
      queryString["popularity"] = 1;
      break;
    case "comment":
      queryString["comment"] = 1;
      break;
    case "view":
      queryString["view"] = 1;
      break;
    default:
      queryString["popularity"] = 1;
  }
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.get("/api/forum/threads/trending", {
      params: queryString,
    });
    return res.data;
  } catch (error) {
    console.log("Error fetching popular posts", error);
    throw error;
  }
};

export const getAllTrendingPosts = async (sortBy) => {
  const http = AppHttp();
  try {
    const res = await http.get("/api/forum/threads/trending/all");
    return res.data;
  } catch (error) {
    console.log("Error fetching popular posts", error.response);
    return error;
  }
};

export const getChannelsList = async () => {
  const http = AppHttp();
  try {
    const res = await http.get("/api/forum/channels");
    return res.data;
  } catch (error) {
    console.log("Error fetching channels list", error.response);
    return error;
  }
};

export const getPostsByChannel = async (channelSlug, pageNum) => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/forum/threads/${channelSlug}`, {
      params: { page: pageNum },
    });
    return res.data;
  } catch (error) {
    console.log("Error fetching posts by channelSlug", error.response);
    return error;
  }
};

export const getThreadData = async (channelSlug, postId, accessToken = null) => {
  const http = AppHttp({ accessToken });
  try {
    const res = await http.get(`/api/forum/threads/${channelSlug}/${postId}`, {timeout: 60 * 1000});
    return res.data;
  } catch (error) {
    console.log("Error fetching thread detail", error.response);
    return error;
  }
};

export const searchInForum = async (keyword) => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.post(`/api/forum/threads/search`, { keyword });
    return res.data;
  } catch (error) {
    console.log("Error in searching", error.response);
    return error;
  }
};

export const getGalleryPicsByPage = async (pageNum) => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/forum/gallery`, {
      params: { page: pageNum },
      timeout: 60 * 1000
    });
    return res.data;
  } catch (error) {
    console.log("Error in getting forum gallery pics", error.response);
    return error;
  }
};
