import AppHttp from "../AppHttp";

export const getAbout = async () => {
  const http = AppHttp();

  try {
    const res = await http.get(`api/page/about-us`);
    return res.data;
  } catch (error) {
    console.log("Couldn't get about us data:", error, error.response);
    throw error;
  }
};

export const getTerms = async () => {
  const http = AppHttp();

  try {
    const res = await http.get(`api/page/termsconditions`);
    return res.data;
  } catch (error) {
    console.log("Couldn't get terms data:", error, error.response);
    throw error;
  }
};
export const getWarranty = async () => {
  const http = AppHttp();

  try {
    const res = await http.get(`api/page/warranty`);
    return res.data;
  } catch (error) {
    console.log("Couldn't get warranty data:", error, error.response);
    throw error;
  }
};
export const getFaq = async () => {
  const http = AppHttp();

  try {
    const res = await http.get(`api/page/faq`);
    return res.data;
  } catch (error) {
    console.log("Couldn't get getFaq data:", error, error.response);
    throw error;
  }
};
export const getRRPolicy = async () => {
  const http = AppHttp();

  try {
    const res = await http.get(`api/page/returnrefund-policy`);
    return res.data;
  } catch (error) {
    console.log(
      "Couldn't get returnrefund-policy data:",
      error,
      error.response
    );
    throw error;
  }
};
export const getPrivacyPolicy = async () => {
  const http = AppHttp();

  try {
    const res = await http.get(`api/page/privacy-policy`);
    return res.data;
  } catch (error) {
    console.log("Couldn't get privacy-policy data:", error, error.response);
    throw error;
  }
};

export const editStaticPages = async (data) => {
  const http = AppHttp();
  try {
    const res = await http.post(`/api/page/update`, data);
    return res.data;
  } catch (error) {
    console.error("Error edit topic.", error, error.response);

    throw error;
  }
};
