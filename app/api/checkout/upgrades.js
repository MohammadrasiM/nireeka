import AppHttp from "../AppHttp";

export const postUpgradesCheckoutData = async (postData) => {
  const http = AppHttp();
  try {
    const res = await http.post("/api/checkout/add-upgrades", postData);
    return res.data;
  } catch (error) {
    console.log("Error in checkout:", error, error.response);
    throw error;
  }
};

export const postUpgradesCheckoutDataToServer = async (postData) => {
  const http = AppHttp();
  try {
    const res = await http.post("/api/checkout/upgrades", postData, {timeout: 60 * 1000});
    return res.data;
  } catch (error) {
    console.log("Error in upgrades checking out", error, error.response);
    throw error;
  }
};
