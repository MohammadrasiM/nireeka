import { addItemsToCart } from "../app/api/cart";
import { toast } from "react-toastify";
import { addConfiguredBikeToCart } from "../app/api/configurator";
import { cartKeys, dashboard as dashboardLocalStorage } from "../app/constants/localStorageKeys";
import CookiesService from "./CookiesService";
import { ComparatorService } from "./comparator";

const submitSavedCartDataToServer = async () => {
  const cartItems = window.localStorage.getItem(cartKeys.CART_ITEMS);
  if (!cartItems) return;

  let savedCart = null;
  try {
    savedCart = JSON.parse(cartItems);
  } catch (error) {
    console.log(error)
  }

  const cartItemsWithoutBikes = [];
  try {
    for (let item of savedCart) {
      if (item.type === "bike" && item.server) await addConfiguredBikeToCart(item.server);
      else cartItemsWithoutBikes.push({ product_id: item.id, count: item.cartQuantity || 1 });
    }

    if (cartItemsWithoutBikes.length > 0) await addItemsToCart(cartItemsWithoutBikes);

    window.localStorage.removeItem(cartKeys.CART_ITEMS);
  } catch (error) {
    console.log("Error saving configurator data:", error, error.response);
  }
};

// Do actions after login in this function
const doAfterLogin = async () => {
  window.localStorage.removeItem(dashboardLocalStorage.SELECTED_BIKE_MAC_ID);
  await submitSavedCartDataToServer();
};

export const handleLoginSuccess = async (accessToken, email, password, shouldRemember = false) => {
  const options = { path: "/", secure: true };
  if (shouldRemember) options.expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30); // 30 days
  CookiesService.set("access_token", accessToken, options);
  window.localStorage.setItem("email", email);
  window.localStorage.setItem("password", password);

  await doAfterLogin();
};

export const savePaymentAccessToken = async (accessToken) => {
  const options = { path: "/", secure: true };
  options.expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30); // 30 days
  CookiesService.set("access_token_payment", accessToken, options);
};

export const handleLoginByGoogleSuccess = async (accessToken) => {
  const options = { path: "/" };
  CookiesService.set("access_token", accessToken, options);

  await doAfterLogin();
};

export const handleLogoutSuccess = async () => {
  CookiesService.remove("access_token");
  window.localStorage.removeItem("email");
  window.localStorage.removeItem("password");
  window.localStorage.removeItem(dashboardLocalStorage.SELECTED_BIKE_MAC_ID);

  const comparator = new ComparatorService();
  comparator.destroy();
};

export const handleRefreshTokenSuccess = async (accessToken) => {
  const options = { path: "/" };
  CookiesService.set("access_token", accessToken, options);
};
