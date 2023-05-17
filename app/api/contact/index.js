import AppHttp from "../AppHttp";

export const getFormContactUs = async (data) => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.post("/api/contact-us", data);
    return res.data;
  } catch (error) {
    console.error("Error checking contact-Us.", error, error.response);
    throw error;
  }
};
