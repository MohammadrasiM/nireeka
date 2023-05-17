import AppHttp from "../AppHttp";

const getResult = async (search) => {
  const http = AppHttp();
  const { getResult } = await http.get(`/api/help-center/search?q=${search}`);
  return getResult;
};

export { getResult };
