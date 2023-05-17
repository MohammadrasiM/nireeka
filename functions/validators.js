import axios from "axios";

export const isSameOrigin = (path) => {
  const url = new URL(path);
  if (url && window) {
    const { location } = window;

    return (
      url.hostname == location.hostname &&
      url.port == location.port &&
      url.protocol == location.protocol
    );
  } else return false;
};

export const URL_REGEX =
  /(\b(https|http):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]+[-A-Z0-9+&@#\/%=~_|])/gi;

export const isValidHttpUrl = (string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

export const isValidVimeoUrlAsync = async (urlToCheck) => {
  try {
    const res = await axios.get(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(urlToCheck)}`,
      { timeout: 5000 }
    );
    if (res.status === 200) return true;
    else return false;
  } catch (error) {
    console.log("An error occurred validating Vimeo url:", error);
    return false;
  }
};

export const isValidVimeoUrlRegex = (url) => {
  var regex = /^(http\:\/\/|https\:\/\/)?(www\.)?(vimeo\.com\/)([0-9]+)$/;
  if (url.match(regex)) {
    return url.match(regex)[1];
  }
  return false;
};

export const isValidYoutubeUrlAsync = async (urlToCheck) => {
  try {
    const res = await axios.get(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(
        urlToCheck
      )}&format=json`,
      { timeout: 5000 }
    );
    if (res.status === 200) return true;
    else return false;
  } catch (error) {
    console.log("An error occurred validating YouTube url:", error);
    return false;
  }
};

export const isValidYoutubeUrlRegex = (url) => {
  var p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(p)) {
    return url.match(p)[1];
  }
  return false;
};
