import AppHttp from "../AppHttp";
import CookiesService from "../../../services/CookiesService";
import { NSD_SERVER } from "../../constants/servers";

export const getPersonalData = async () => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/me`);
    return res.data;
  } catch (error) {
    console.log("Error in ME API", error, error.response);
    throw error;
  }
};

export const getUserBikes = async () => {
  const http = AppHttp({ serverURL: NSD_SERVER });
  const token = CookiesService.get("access_token");
  try {
    const res = await http.post(`/api/user/getUserBikes`, { token });
    return res.data;
  } catch (error) {
    console.log("Error in getUserBikes()", { ...error.response });
    throw error;
  }
};

export const getUserModalData = async (userId) => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/user/${userId}/info`);
    return res.data;
  } catch (error) {
    console.log("Error in getting user data", error);
    return error;
  }
};

export const toggleUserPreferredUnitSystem = async () => {
  const http = AppHttp();
  try {
    const res = await http.get("/api/set-unit");
    return res.data;
  } catch (error) {
    console.log("Error in toggling unit");
    throw error;
  }
}