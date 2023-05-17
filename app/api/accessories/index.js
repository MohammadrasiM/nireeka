import AppHttp from "../AppHttp";

export const getAccessories = async () => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.get("/api/accessories");
    return res.data;
  } catch (error) {
    console.log("Error in getting Accessories", error, error.response);
    throw error;
  }
};
export const getAccessoriesId = async (id) => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.get(`/api/accessories/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error in getting Accessories id", error, error.response);
    throw error;
  }
};

