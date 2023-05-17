import { dashboard as localStorageDashboard } from "../app/constants/localStorageKeys";

const selectAMacId = (userBikes = []) => {
  // Checking for previously selected bike for dashboard
  let latestSelectedBikeMacId = null;
  if (typeof window !== "undefined")
    latestSelectedBikeMacId = window.localStorage.getItem(
      localStorageDashboard.SELECTED_BIKE_MAC_ID
    );

  // if not found, selecting the first smart bike from user bikes as the default dashboard bike
  if (!latestSelectedBikeMacId) {
    for (let i = 0; i < userBikes.length; i++) {
      if (!userBikes[i].is_smart) continue;

      latestSelectedBikeMacId = userBikes[i].mac_id;
      window.localStorage.setItem(
        localStorageDashboard.SELECTED_BIKE_MAC_ID,
        latestSelectedBikeMacId
      );
      return latestSelectedBikeMacId;
    }
  } else {
    return latestSelectedBikeMacId;
  }

  // If user didn't have any smart bike
  return null;
};

export default selectAMacId;
