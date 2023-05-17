import Cookies from "universal-cookie";

const cookies = new Cookies();

class CookiesService {
  get(key) {
    return cookies.get(key);
  }

  set(key, value, options) {
    return cookies.set(key, value, { sameSite: "strict",  ...options });
  }

  remove(key) {
    return cookies.remove(key, { path: "/" });
  }
}

const cookieService = new CookiesService();

export default cookieService;
