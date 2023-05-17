import AppHttp from "../AppHttp";

export const getBikeUpgradesByOrderId = async (orderBikeId) => {
  // orderBikeId is order_bike_id in order APIs
  const http = AppHttp();
  try {
    const res = await http.post(`/api/configurator/edit-upgrades`, {
      order_bike_id: orderBikeId,
    });
    return res.data;
  } catch (error) {
    console.log("Error getting bike upgrade for edit", error, error.response);
    throw error;
  }
};

export const getBikeUpgradesByCartId = async (cartId) => {
  const http = AppHttp();
  try {
    const res = await http.post(`/api/configurator/edit`, {
      cart_id: cartId,
    });
    return res.data;
  } catch (error) {
    console.log("Error getting bike upgrade for edit", error, error.response);
    throw error;
  }
};
