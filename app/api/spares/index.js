import AppHttp from "../AppHttp";

export const getSpares = async (query) => {
  const http = AppHttp({ noToken: true });

  const payload = {};

  for (let property in query) {
    // Checks if property has a falsy value like "", undefined or null
    if (!query[property]) {
      continue;
    }

    // If the property was an array
    if (Array.isArray(query[property]) && query[property].length !== 0) {
      const arrayWithTruthyValue = query[property].filter((item) => !!item);
      for (let index = 0; index < arrayWithTruthyValue.length; index++) {
        payload[`${property}[${index}]`] = arrayWithTruthyValue[index];
      }
    } else payload[property] = query[property];
  }

  try {
    const res = await http.get("/api/spares", {
      params: payload,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching spares.", error.response);
    return error;
  }
};
// spares?parent=${parent}&spare_category=${spare_category}

export const getSpareCategories = async () => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.get("/api/spares/category-part");
    return res.data;
  } catch (error) {
    console.log("Error in getting spare categories");
    throw error;
  }
};
