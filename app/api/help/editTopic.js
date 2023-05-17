import AppHttp from "../AppHttp";
export const editTopic = async (data) => {
  const http = AppHttp();
  try {
    const res = await http.post(`/api/help-center/update/topic`, data);
    return res.data;
  } catch (error) {
    console.error("Error edit topic.", error, error.response);

    throw error;
  }
};
