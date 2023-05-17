import { NSD_SERVER } from "../../constants/servers";
import AppHttp from "../AppHttp";

export const getLeaderboardData = async () => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.get("/api/leader-board");
    return res.data;
  } catch (error) {
    console.log("Error in getting leaderboard data", error.response);
    throw error;
  }
};

export const getAllLeaderboardData = async () => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.get("/api/leader-board/all");
    return res.data;
  } catch (error) {
    console.log("Error in getting leaderboard data", error.response);
    return error;
  }
};

export const getNSDLeaderboard = async (base = "time", count = 6) => {
  const http = AppHttp({ serverURL: NSD_SERVER, noToken: true });

  if (base !== "odo" && base !== "time" && base !== "speed") {
    return new Error("Base is not defined");
  }

  try {
    const res = await http.post(`/api/general/getLeaderboard`, {
      base,
      count,
    });
    return res.data;
  } catch (error) {
    console.log("Error in getting NSD leaderboard data", error.response);
    return error;
  }
};
