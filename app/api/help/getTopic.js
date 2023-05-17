import AppHttp from "../AppHttp";

export const getTopic = async (topic, accessToken = null) => {
  const http = AppHttp({ accessToken });
  try {
    const res = await http.get(`/api/help-center/topic/${topic}`);
    return res.data;
  } catch (error) {
    console.log("Couldn't get user profile data id:", topic, error, error.response);
    return error;
  }
};
