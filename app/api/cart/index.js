import AppHttp from "../AppHttp";

export const getCartRequest = async () => {
  let http = AppHttp();
  return await http.get("/api/cart");
};

export const addItemsToCart = async (items) => {
  let http = AppHttp();
  return await http.post("/api/cart", { items });
};

export const updateItemCountRequest = async (cartId, count) => {
  let http = AppHttp();
  return await http.put("/api/cart/count", { id: cartId, count: count });
};

export const removeCartItemRequest = async (cartId) => {
  let http = AppHttp();

  return await http.delete(`/api/cart/${cartId}`);
};

export const getItemCountRequest = async () => {
  let http = AppHttp();
  return await http.get("/api/cart/count");
};
