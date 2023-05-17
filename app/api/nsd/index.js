import CookiesService from "../../../services/CookiesService";
import { NSD_SERVER } from "../../constants/servers";
import AppHttp from "../AppHttp";

export const getMacByOrderId = async (orderId) => {
  const http = AppHttp({ serverURL: NSD_SERVER });
  const token = CookiesService.get("access_token");
  try {
    const res = await http.post(`/api/bike/getMacByOrderId`, {
      token,
      order_bike_id: orderId,
    });

    return res.data;
  } catch (error) {
    console.log("Error getting mac by orderid", error);
    throw error;
  }
};

export const getStatusByMac = async (mac) => {
  const http = AppHttp({ serverURL: NSD_SERVER });
  const token = CookiesService.get("access_token");
  try {
    const res = await http.post(`/api/bike/getStatusByMac`, {
      token,
      mac_id: mac,
    });

    return res.data;
  } catch (error) {
    console.log("Error getting mac by mac id", error);
    throw error;
  }
};

export const getBikeSettingsByMac = async (mac) => {
  const http = AppHttp({ serverURL: NSD_SERVER });
  const token = CookiesService.get("access_token");
  try {
    const res = await http.post("/api/bike/getSettingsByMac", {
      token,
      mac_id: mac,
    });
    return res.data;
  } catch (error) {
    console.log("Error getting bike settings.", error.response);
    throw error;
  }
};

export const setBikeSettingsByMac = async (mac, settings) => {
  const http = AppHttp({ serverURL: NSD_SERVER });
  const token = CookiesService.get("access_token");
  try {
    const res = await http.post("/api/bike/setSettingsByMac", {
      mac_id: mac,
      token,
      settings,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getRideSlicesData = async (macId, sliceIndex, sliceSize) => {
  const http = AppHttp({ serverURL: NSD_SERVER });
  const token = CookiesService.get("access_token");
  const date = new Date();
  const localOffsetMins = date.getTimezoneOffset();

  try {
    const res = await http.post(`/api/bike/getRideSlices`, {
      mac_id: macId,
      slice_index: sliceIndex,
      slide_size: sliceSize,
      local_offset_mins: localOffsetMins,
      token,
    });

    return res.data;
  } catch (error) {
    console.log("Error getting ride slices:", error.response);
    throw error;
  }
};

export const getRidesData = async (macId, fromDate, toDate) => {
  const http = AppHttp({ serverURL: NSD_SERVER });
  const token = CookiesService.get("access_token");
  const date = new Date();
  const localOffsetMins = date.getTimezoneOffset();

  try {
    const res = await http.post(`/api/bike/getRides`, {
      mac_id: macId,
      from_date: fromDate,
      to_date: toDate,
      local_offset_mins: localOffsetMins,
      token,
    });

    return res.data;
  } catch (error) {
    console.log("Error getting ride slices:", error.response);
    throw error;
  }
};

export const getBikeLastLocation = async (macId) => {
  const http = AppHttp({ serverURL: NSD_SERVER });
  const token = CookiesService.get("access_token");
  try {
    const res = await http.post("/api/bike/getLocByMac", {
      mac_id: macId,
      token,
    });
    return res.data;
  } catch (error) {
    console.log("couldn't get loc status", error, error.response);
    throw error;
  }
};

export const getBikeStatByOrderId = async (orderId) => {
  const http = AppHttp({ serverURL: NSD_SERVER });
  try {
    const res = await http.post("/api/general/getStatByOrderId", {
      order_id: `${orderId}`,
    });
    return res.data;
  } catch (error) {
    console.log("Couldn't bike stats by order id", error, error.response);
    throw error;
  }
};
