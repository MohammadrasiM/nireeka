import split from "lodash/split";
/**
 * 
 * @param {string} name 
 * @param {string} url 
 * @returns query string: ?foo=lorem&bar=&baz  
            'foo' => "lorem"  
            'bar' => "" (present with empty value)  
            'baz' => "" (present with no value)  
            'qux' => null (absent)   
 */

export function getParameterValueByNameInURL(name, url) {
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export const hashToArray = (hash) => {
  hash = hash.substring(1);
  return split(hash, '#');
};
