import AppHttp from "../AppHttp";

export const getStateCountryData = async (country_id) => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.get(`/api/state/${country_id}`);
    return res.data;
  } catch (error) {
    console.log(
      "Error in getting state data from server.",
      error,
      error.response
    );
    throw error;
  }
};
