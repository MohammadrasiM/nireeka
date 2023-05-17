import AppHttp from "../AppHttp";

export const getHomePageData = async () => {
  const http = AppHttp();

  try {
    const res = await http.get(`/api/home-page`);
    return res.data;
  } catch (error) {
    console.log("Couldn't get homepage data:", error, error.response);
    throw error;
  }
};

export const getStatisticsData = async () => {
  const http = AppHttp();

  try {
    const res = await http.get(`/api/statistics`);
    return res.data;
  } catch (error) {
    console.log("Couldn't get statistics data:", error, error.response);
    throw error;
  }
};


export const subscribeEmail = async (data) => {
  const http = AppHttp({ noToken: true });

  try {
    const res = await http.post(`/api/newsletter/subscribe`, data);
    return res.data;
  } catch (error) {
    console.error("Error checking contact-Us.", error, error.response);

    return error;
  }
};


export const getHomePageDataSlider = async () => {
  const http = AppHttp();

  try {
    const res = await http.get(`/api/slider-hero`);
    return res.data;
  } catch (error) {
    console.log("Couldn't get homepage data:", error, error.response);
    throw error;
  }
};