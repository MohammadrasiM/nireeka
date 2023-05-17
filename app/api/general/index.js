import AppHttp from "../AppHttp";

export const getAllCountries = async () => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.get("/api/countries");
    return res.data;
  } catch (error) {
    console.log("Error in fetching countries", error, error.response);
    return error;
  }
};

export const getAllBikes = async () => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.get("/api/bikes/list");
    return res.data;
  } catch (error) {
    console.log("Error in fetching bike list", error, error.response);
    throw error;
  }
};

export const getShippingCostByCountryAndProduct = async (
  countryId,
  productId
) => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.get("/api/shipping-calculator", {
      params: { country: countryId, product: productId },
    });
    return res.data;
  } catch (error) {
    console.log("Error getting shipping cost:", error, error.response);
  }
};

export const deleteFile = async (id) => {
  const http = AppHttp();
  try {
    const res = await http.post("/api/file/destroy", {file_id: id});
    return res.data;
  } catch (error) {
    console.log("Error in deleting file", error, error.response);
    return error;
  }
};
