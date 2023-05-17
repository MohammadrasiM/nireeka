import { MONTHS } from "../app/constants/time";

export const convertMetricToImperial = {
  km2mile: (value) => +(value / 1.609).toFixed(2),
  kmph2mph: (value) => +(value / 1.609).toFixed(2),
  kg2lb: (value) => +(value * 2.205).toFixed(2),
  cm2ft: (value) => +(value / 30.48).toFixed(2),
};

export const convertImperialToMetic = {
  mile2km: (value) => +(value * 1.609).toFixed(2),
  mph2kmph: (value) => +(value * 1.609).toFixed(2),
  lb2kg: (value) => +(value / 2.205).toFixed(2),
  ft2cm: (value) => +(value * 30.48).toFixed(2),
};

export const getPrettyDate = (date) => {
  if (!date) return null;

  let dateObj;
  if (date instanceof Date) dateObj = date;
  else if (typeof date === "number") dateObj = new Date(date);
  else if (typeof date === "string")
    dateObj = new Date(date.includes("/") ? date.replaceAll("/", "-") : date);
  else dateObj = date;

  return MONTHS[dateObj.getMonth()] + " " + dateObj.getDate() + ", " + dateObj.getFullYear();
};

export const toTitleCase = (str) =>
  str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

export const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

// Configurator
export const getPreUpgradeMap = (preUpgradeParts) => {
  const preUpgradePartsMap = new Map();

  let upgrades;
  if (preUpgradeParts) {
    for (let preUpgradePart of preUpgradeParts) {
      upgrades = preUpgradePartsMap.get(preUpgradePart.category_id);

      if (!upgrades) preUpgradePartsMap.set(preUpgradePart.category_id, preUpgradePart.part_id);
      else {
        if (Array.isArray(upgrades))
          preUpgradePartsMap.set(preUpgradePart.category_id, [...upgrades, preUpgradePart.part_id]);
        else preUpgradePartsMap.set(preUpgradePart.category_id, [upgrades, preUpgradePart.part_id]);
      }
    }
  }

  return preUpgradePartsMap;
};


const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }))


function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

export const convertUrlToFile = async (url, filename) => {
  const dataUrl = await toDataURL(url);
  return dataURLtoFile(dataUrl, filename);
}
