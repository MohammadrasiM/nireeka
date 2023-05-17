import AppHttp from "../AppHttp";

export const getCheckoutData = async () => {
  const http = AppHttp();
  try {
    const res = await http.get("/api/checkout");
    return res.data;
  } catch (error) {
    console.log("Error in getting checkout data from server.", error, error.response);
    throw error;
  }
};

export const getCheckoutGuestData = async (postData) => {
  const http = AppHttp();
  try {
    const res = await http.post("/api/checkout-guest", postData);
    return res.data;
  } catch (error) {
    console.log("Error in getting checkout data from server.", error, error.response);
    throw error;
  }
};

export const postCheckoutData = async (postData) => {
  const http = AppHttp();
  try {
    const res = await http.post("/api/checkout", postData, {timeout: 60 * 1000});
    return res.data;
  } catch (error) {
    console.log("Error in checkout:", error, error.response);
    throw error;
  }
};

export const postPaymentGuestData = async (postData) => {
  const http = AppHttp();
  try {
    const res = await http.post("/api/payment-guest", postData, {timeout: 60 * 1000});
    return res.data;
  } catch (error) {
    console.log("Error in paymrnt:", error, error.response);
    throw error;
  }
};

export const getPaymentResponseForStripe = async (orderId, sessionId) => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/call-back/${orderId}`, {
      params: { session_id: sessionId },
      timeout: 60 * 1000
    });
    return res.data;
  } catch (error) {
    console.log("Error in getting stripe payment response :", error, error.response);
    throw error;
  }
};

export const getPaymentResponseForPayPal = async (orderId, token) => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/call-back-pay-pal/${orderId}`, {
      params: { token },
      timeout: 60 * 1000
    });
    return res.data;
  } catch (error) {
    console.log("Error in getting paypal payment response:", error, error.response);
  }
};

export const getPaymentResponseForOtherThanStripe = async (orderId, code) => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/call-back-pay/${orderId}/${code})`, {timeout: 60 * 1000});
    return res.data;
  } catch (error) {
    console.log("Error in getting payment response :", error, error.response);
    throw error;
  }
};

export const getShippingAndVatByCountry = async (countryId) => {
  const http = AppHttp();
  try {
    const res = await http.post(`/api/shipping-vat`, { country_id: countryId });
    return res.data;
  } catch (error) {
    console.log("Error in getting shipping and vat from server :", error, error.response);
    throw error;
  }
};

export const getShippingAndVatGuestByCountry = async (countryId, cartItems) => {
  const http = AppHttp();
  try {
    const res = await http.post(`/api/shipping-vat-guest`, { country_id: countryId, items: cartItems });
    return res.data;
  } catch (error) {
    console.log("Error in getting shipping and vat from server :", error, error.response);
    throw error;
  }
};
