import AppHttp from "../AppHttp";

export const postAReply = async (threadId, formData) => {
  const http = AppHttp({ "Content-Type": "multipart/form-data" });
  try {
    const res = await http.post(`/api/forum/comment/${threadId}`, formData);
    return res.data;
  } catch (error) {
    console.log("Error in posting a comment", threadId, error.response);
    throw error;
  }
};

export const likeCommentById = async (commentId) => {
  const http = AppHttp();
  try {
    const res = await http.post(`/api/forum/comment/${commentId}/like`);
    return res.data;
  } catch (error) {
    console.log("Error in liking a comment", commentId, error.response);
    throw error;
  }
};

export const unlikeCommentById = async (commentId) => {
  const http = AppHttp();
  try {
    const res = await http.delete(`/api/forum/comment/${commentId}/like`);
    return res.data;
  } catch (error) {
    console.log("Error in unliking a comment", commentId, error.response);
    return error;
  }
};

export const deleteCommentById = async (commentId) => {
  const http = AppHttp();
  try {
    const res = await http.delete(`/api/forum/comment/${commentId}`);
    return res.data;
  } catch (error) {
    console.log("Error deleting a comment with id", commentId, error.response);
    return error;
  }
};

export const updateCommentById = async (commentId, formData) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const http = AppHttp({headers});
  try {
    const res = await http.put(`/api/forum/comment/${commentId}`, formData);
    return res.data;
  } catch (error) {
    console.log("Error updating comment with id:", commentId, error.response);
    return error;
  }
};

export const deletePictureFromComment = async (commentId) => {
  const http = AppHttp();
  try {
    const res = await http.post(`/api/forum/comment/delete-photo/${commentId}`);
    return res.data;
  } catch (error) {
    console.log("Error deleting picture from comment", error.response);
    return error;
  }
};

export const toggleCommentHiddenMode = async (commentId) => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/forum/comment/${commentId}/toggle-hide`);
    return res.data;
  } catch (error) {
    console.log("Error deleting picture from comment", response.error);
    return error;
  }
};
