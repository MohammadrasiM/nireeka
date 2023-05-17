import { timestamps } from "../app/constants/time";

export const getDateDiffInDays = (date1, date2) => {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return Math.floor((utc2 - utc1) / timestamps.day);
};

export const convertSecondsToHMS = (totalSeconds) => {
  const HMS = [0, 0, 0];
  while (totalSeconds >= 3600) {
    HMS[0] += 1;
    totalSeconds -= 3600;
  }
  while (totalSeconds >= 60) {
    HMS[1] += 1;
    totalSeconds -= 60;
  }
  while (totalSeconds > 0) {
    HMS[2] += 1;
    totalSeconds -= 1;
  }
  return HMS;
};