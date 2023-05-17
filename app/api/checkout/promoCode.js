import AppHttp from "../AppHttp";

export const promoCodePost = async (data) => {
  const http = AppHttp();
  try {
    const res = await http.post("/api/check-promo-code", data);
    return res.data;
  } catch (error) {
    console.error("Error checking promo code.", error, error.response);
    throw error;
  }
};

export const promoCodeGuestPost = async (data) => {
  const http = AppHttp();
  try {
    const res = await http.post("/api/check-promo-code-guest", data);
    return res.data;
  } catch (error) {
    console.error("Error checking promo code.", error, error.response);
    throw error;
  }
};