import AppHttp from "../AppHttp";

const getSearch = async (search) => {
  const http = AppHttp();
  const { dataSearch } = await http.get(
    `/api/help-center/searching?keyword=${search}`
  );
  return dataSearch;
};

export { getSearch };
