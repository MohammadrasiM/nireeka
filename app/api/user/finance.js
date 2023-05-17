import AppHttp from "../AppHttp";

export const getUserOrders = async () => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/orders`);
    return res.data;
  } catch (error) {
    console.log("Error getting user orders", error.response);
    throw error;
  }
};
export const getUserOrdersWithDetails = async (page) => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/orders/bike?page=${page}`);

    return res.data;
  } catch (error) {
    console.log("Error getting user orders", error.response);

    throw error;
  }
};

export const getOrderDetailsData = async (orderId) => {
  const http = AppHttp();
  if (!orderId) {
    return new Error("Order id is not specified");
  }
  try {
    const res = await http.get(`/api/order-details/${orderId}`);
    return res.data;
  } catch (error) {
    console.log("Error getting order details. orderId:", orderId, "Error:", error, error.response);
    throw error;
  }
};

export const getOrderInvoiceData = async (orderId) => {
  const http = AppHttp();
  if (!orderId) {
    return new Error("Order id is not specified");
  }
  try {
    const res = await http.get(`/api/invoice-details/${orderId}`);
    return res.data;
  } catch (error) {
    console.log("Error in getting order invoice, order id:", orderId, error.response);
    return error;
  }
};

export const getOrderTimeLineData = async (orderBikeId) => {
  const http = AppHttp();

  try {
    const res = await http.get(`/api/time-line/${orderBikeId}`);
    return res.data;
  } catch (error) {
    console.log("Error in getting order time line data, order bike id:", orderId, error.response);
    return error;
  }
};

export const getUserPaymentsData = async () => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/payments`);
    return res.data;
  } catch (error) {
    console.log("Error in getting payments", error.response);
    return error;
  }
};

export const getSparePartOrders = async () => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/orders/spare`);
    return res.data;
  } catch (error) {
    console.log("Error in getting spare part orders", error, error.response);
    return error;
  }
};

export const getAccessoryOrders = async () => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/orders/accessory`);
    return res.data;
  } catch (error) {
    console.log("Error in getting accessory orders", error, error.response);
    return error;
  }
};

export const getWarrantyOrders = async () => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/orders/warranty`);
    return res.data;
  } catch (error) {
    console.log("Error in getting warranty orders", error, error.response);
    return error;
  }
};

/**
 * In response:
 * type == 0 : spent
 * type == 1 : balance
 */
export const getUserCredits = async () => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/credits`);
    return res.data;
  } catch (error) {
    console.log("Error in getting user credits", error, error.response);
    return error;
  }
};

export const deletePaymentByOrderId = async (orderId) => {
  const http = AppHttp();
  try {
    const res = await http.delete(`/api/delete-order/${orderId}`);
    return res.data;
  } catch (error) {
    console.log("Error in payment deletion ", error, error.response);
    throw error;
  }
};

export const tryToPayUnpaidOrderByOrderId = async (orderId) => {
  const http = AppHttp();
  try {
    const res = await http.post(`/api/try-pay`, { order_id: orderId });
    return res.data;
  } catch (error) {
    console.log("Error in unpaid payment retry ", error, error.response);
    throw error;
  }
};

export const getShippedOrders = async () => {
  const http = AppHttp();
  try {
    const res = await http.get("/api/orders-shipped");
    return res.data;
  } catch (error) {
    console.log("Error in getting shipped orders");
    throw error;
  }
};
