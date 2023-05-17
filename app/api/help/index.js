import AppHttp from "../AppHttp";

const getHelp = async () => {
  const http = AppHttp();
  const { data } = await http.get(`/api/help-center`);
  return data;
};

export { getHelp };
