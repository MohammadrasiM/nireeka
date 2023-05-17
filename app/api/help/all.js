import AppHttp from "../AppHttp";

const getAllCategory = async (category) => {
  const http = AppHttp();
  const { data } = await http.get(`/api/help-center/category/all/${category}/${category}`);
  return data;
};

export { getAllCategory };
