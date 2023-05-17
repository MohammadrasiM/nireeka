import axios from "axios";
import { isSameOrigin } from "./validators";

export const createFileFromPath = async (path) => {
  try {
    if (isSameOrigin(path) || window.location.hostname === "localhost") {
      const res = await axios.get(path, { responseType: "blob" });
      let metadata = {
        type: res.data.type,
      };
      let file = new File([res.data], `${new Date().getTime()}.jpg`, metadata);
      return file;
    }
    return null;
  } catch (error) {
    console.log("Error fetching path.", error);
    return null;
  }
};
