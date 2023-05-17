import { CONFIGURATOR_EDIT_ORDER_MODE } from "app/constants/configuratorModes";
import AppHttp from "../AppHttp";
import qs from "qs";

export const getConfiguratorBikes = async (query) => {
  const http = AppHttp({ noToken: true });

  const payload = {};

  for (let property in query) {
    // Checks if property has a falsy value like "", undefined or null
    if (!query[property]) {
      continue;
    }

    // If the property was an array
    if (Array.isArray(query[property]) && query[property].length !== 0) {
      const arrayWithTruthyValue = query[property].filter((item) => !!item);
      for (let index = 0; index < arrayWithTruthyValue.length; index++) {
        payload[`${property}[${index}]`] = arrayWithTruthyValue[index];
      }
    } else payload[property] = query[property];
  }

  try {
    const res = await http.get("/api/configurator", {
      params: payload,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching spares.", error.response);
    return error;
  }
};

export const getConfiguratorBikesFilters = async (filters) => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.get(
      `api/configurator/bikes?${qs.stringify(filters)}`
    );
    return res.data;
  } catch (error) {
    console.log("Error in getting available bikes", error, error.response);
    throw error;
  }
};

export const getBikesFilters = async (filters) => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.get(
      `api/configurator/inventory-bikes?${qs.stringify(filters)}`
    );
    return res.data;
  } catch (error) {
    console.log("Error in getting available bikes", error, error.response);
    throw error;
  }
};

export const getConfiguratorBikeInfo = async (id) => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.get(`api/configurator/add-compare/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error in getting available bikes", error, error.response);
    throw error;
  }
};

export const getBikeConfiguratorData = async (
  slug,
  accessToken = null,
  mode = null
) => {
  const http = AppHttp({ accessToken });

  const params = {};
  if (mode === CONFIGURATOR_EDIT_ORDER_MODE) {
    params.has_upgrade_only = true;
  }

  try {
    const res = await http.get(`/api/configurator/${slug}`, { params });
    return res.data;
  } catch (error) {
    console.log(
      "Error in getting bike configurator data",
      error,
      error.response
    );
    throw error;
  }
};

export const getAvailableColorsBySize = async (productId, sizeId) => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.get(
      `/api/configurator/colors/available/${productId}/${sizeId}`
    );
    return res.data;
  } catch (error) {
    console.log(
      "Error in getting available colors by selected size",
      error,
      error.response
    );
    throw error;
  }
};

export const getDateBySizeAndColor = async (productId, sizeId, colorId) => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.get(
      `/api/configurator/colors/get-date/${productId}/${sizeId}/${colorId}`
    );
    return res.data;
  } catch (error) {
    console.log(
      "Error in getting bike shipping and delivery date",
      error,
      error.response
    );
    throw error;
  }
};

export const getPromoCodeByTotalPrice = async (bikeId, totalPrice) => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.post(
      `/api/configurator/change-promo-code/${bikeId}`,
      {
        total_price: totalPrice,
      }
    );
    return res.data;
  } catch (error) {
    console.log(
      "Error in getting bike shipping and delivery date",
      error,
      error.response
    );
    throw error;
  }
};

export const addConfiguredBikeToCart = async (dataToPostToServer) => {
  const http = AppHttp();
  try {
    const res = await http.post(`/api/configurator/cart`, dataToPostToServer);
    return res.data;
  } catch (error) {
    console.log("Error in adding bike to shopping cart", error, error.response);
    throw error;
  }
};

export const sendRateBike = async (dataToPostToServer) => {
  const http = AppHttp();
  try {
    const res = await http.post(`/api/configurator/rate`, dataToPostToServer);
    return res.data;
  } catch (error) {
    console.log("Error in send rate of bike", error, error.response);
    throw error;
  }
};

export const sendReviewBike = async (formData) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const http = AppHttp({ headers });
  try {
    const res = await http.post("/api/configurator/review", formData);
    return res.data;
  } catch (error) {
    console.log("Error sending review", error.response);
    throw error;
  }
};

export const editReviewBike = async (formData, reviewId) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const http = AppHttp({ headers });
  try {
    const res = await http.post(
      `/api/configurator/review/${reviewId}`,
      formData
    );
    return res.data;
  } catch (error) {
    console.log("Error editing review", error.response);
    throw error;
  }
};

export const deleteReviewBike = async (reviewId) => {
  const http = AppHttp();
  try {
    const res = await http.delete(`/api/configurator/review/${reviewId}`);
    return res.data;
  } catch (error) {
    console.log("Error deleting review", error.response);
    throw error;
  }
};

export const getQuickViewBikeModal = async (productId, sizeId, colorId) => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.get(
      `/api/configurator/quick-view/${productId}` ///${sizeId}/${colorId}
    );
    return res.data;
  } catch (error) {
    console.log(
      "Error in getting bike shipping and delivery date",
      error,
      error.response
    );
    throw error;
  }
};
