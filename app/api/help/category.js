import AppHttp from "../AppHttp";

const getCategory = async (category) => {
  const http = AppHttp();
  const { data } = await http.get(`/api/help-center/category/${category}/${category}`);
  return data;
};

export { getCategory };
