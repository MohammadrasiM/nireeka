import AppHttp from "../AppHttp";

export const getAddressAutoComplete = async (
  searchQuery,
  countryTwoLetterAbbreviation
) => {
  const http = AppHttp();
  try {
    const res = await http.get("/api/checkout/address", {
      params: { search: searchQuery, country: countryTwoLetterAbbreviation },
    });
    return res.data;
  } catch (error) {
    console.log(
      "Error in getting address auto complete:",
      error,
      error.response
    );
    throw error;
  }
};

export const getAddressDetailsByPlaceId = async (placeId) => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/checkout/address/place/${placeId}`);
    return res.data;
  } catch (error) {
    console.log(
      "Error in getting place id details:",
      error,
      error.response
    );
    throw error;
  }
};
