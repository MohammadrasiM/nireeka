import sanitizeHtml from "sanitize-html";
import { sanitizeHtmlOptions } from "../configs/sanitizeHtmlOptions";

export const inputSanitizer = (dirtyString) => {
  let sanitizedString = sanitizeHtml(dirtyString, sanitizeHtmlOptions);
  sanitizedString = sanitizedString.trim();

  return sanitizedString;
}
