export const getOrdinalSuffixOf = (num) => {
  if (!num) return "";

  let a = num % 10;
  let b = num % 100;

  if (a == 1 && b != 11) return num + "st";
  if (a == 2 && b != 12) return num + "nd";
  if (a == 3 && b != 13) return num + "rd";

  return num + "th";
};

export const commafy = (num) => {
  if (num === undefined || num === null) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Returns an int as it is, returns a float number with two digits after floating point
export const cleanNumberForUI = (dirtyNum) => {
  const num = parseFloat(dirtyNum);

  if (num !== parseInt(num)) return +num.toFixed(2);

  return num;
};
