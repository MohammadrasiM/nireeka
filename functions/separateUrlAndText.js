import linkifyHtml from "linkify-html";
import { isValidVimeoUrlRegex, isValidYoutubeUrlRegex } from "./validators";

const separateStrByURL = (arrayOfURLs, str) => {
  // Separating URL and the rest of the text
  const result = [];
  let remainingText = str;

  if (arrayOfURLs.length === 0) return [remainingText];

  for (let url of arrayOfURLs) {
    const str1 = remainingText.substring(0, remainingText.indexOf(url));
    const str2 = remainingText.substr(remainingText.indexOf(url), url.length);

    result.push(str1, str2);

    remainingText = remainingText.substring(
      remainingText.indexOf(url) + url.length
    );
  }
  if (remainingText) result.push(remainingText);

  return result;
};

export const separateUrlAndText = (str) => {
  const urlsInStr = [];
  // Extracting all URLs
  linkifyHtml(str, {
    format: (value, type) => {
      if (type === "url") urlsInStr.push(value);
    },
  });

  return separateStrByURL(urlsInStr, str);
};

export const separateVideoUrlAndText = (str) => {
  const videoUrlsInStr = [];
  // Extracting all URLs
  linkifyHtml(str, {
    format: (value, type) => {
      if (type === "url") {
        const isYouTubeUrl = isValidYoutubeUrlRegex(value);
        const isVimeoUrl = !isYouTubeUrl && isValidVimeoUrlRegex(value);

        if (isYouTubeUrl || isVimeoUrl) {
          videoUrlsInStr.push(value);
        }
      }
    },
  });
  return separateStrByURL(videoUrlsInStr, str);
};
