import AppHttp from "../AppHttp";

export const likePostById = async (threadId) => {
  const http = AppHttp();
  try {
    const res = await http.post(`/api/forum/threads/${threadId}/like`);
    return res.data;
  } catch (error) {
    console.log("Error in liking a post with ID", threadId, error.response);
    return error;
  }
};

export const unlikePostById = async (threadId) => {
  const http = AppHttp();
  try {
    const res = await http.delete(`/api/forum/threads/${threadId}/like`);
    return res.data;
  } catch (error) {
    console.log("Error in liking a post with ID", threadId, error.response);
    return error;
  }
};

export const postNewThread = async (formData) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const http = AppHttp({ headers });
  try {
    const res = await http.post(`/api/forum/threads`, formData);
    return res.data;
  } catch (error) {
    console.log("Error posting new thread.", error.response);
    return error;
  }
};

export const deleteThread = async (threadId) => {
  const http = AppHttp();
  try {
    const res = await http.delete(`/api/forum/threads/${threadId}`);
    return res.data;
  } catch (error) {
    console.log("Error deleting a thread", error.response);
    return error;
  }
};

export const editThread = async (threadId, formData) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const http = AppHttp({ headers });
  try {
    const res = await http.post(`/api/forum/threads/${threadId}`, formData);
    return res.data;
  } catch (error) {
    console.log("Error editing thread", error.response);
    throw error;
  }
};

export const togglePostVisibility = async (threadId) => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/forum/threads/${threadId}/toggle-hide`);
    return res.data;
  } catch (error) {
    console.log("Error hiding/unhiding post", error.response);
    return error;
  }
};

export const subscribeToThread = async (threadId) => {
  const http = AppHttp();
  try {
    const res = await http.post(`/api/forum/threads/subscriptions`, {
      thread_id: threadId,
    });
    return res.data;
  } catch (error) {
    console.log("Error subscribing to thread with id:", threadId, error.response);
    return error;
  }
};

export const unsubscribeFromThread = async (threadId) => {
  const http = AppHttp();
  try {
    const res = await http.delete(`/api/forum/threads/subscriptions`, {
      data: {
        thread_id: threadId,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error unsubscribing from thread with id:", threadId, error.response);
    return error;
  }
};
