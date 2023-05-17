import AppHttp from "../AppHttp";
import Router from "next/router";
import { loginFail } from "../../store/authSlice";
import store from "../../store/store";
import axios from "axios";
import { handleLogoutSuccess, handleRefreshTokenSuccess } from "../../../services/AuthService";
import { NIREEKA_SERVER } from "../../constants/servers";

export const sendLoginRequest = async ({ email, password }) => {
  try {
    const res = await axios.post(NIREEKA_SERVER + "/api/login", { email, password });
    return res.data;
  } catch (error) {
    console.log("Error in login:", error, error.response);
    throw error;
  }
};

export const sendRefreshTokenRequest = async ({ email, password }) => {
  try {
    const res = await axios.post(NIREEKA_SERVER + "/api/user/login", { email, password });
    return res.data;
  } catch (error) {
    console.log("Error in getting a new token with refresh token", error, error.response);
    throw error;
  }
};

export const handleUnauthenticatedResponse = async () => {
  const email = window.localStorage.getItem("email");
  const password = window.localStorage.getItem("password");
  if (!email || !password) {
    store.dispatch(loginFail({ message: "" }));
    handleLogoutSuccess();
    Router.push("/login");
    return Promise.reject({ message: "" });
  }
  try {
    const refreshTokenRes = await sendRefreshTokenRequest({ email, password });
    if (refreshTokenRes.data.token) handleRefreshTokenSuccess(refreshTokenRes.data.token);
    return Promise.resolve(refreshTokenRes);
  } catch (error) {
    store.dispatch(loginFail({ message: "Your login is expired. Try logging in again." }));
    handleLogoutSuccess();
    Router.push("/login");
    return Promise.reject(error);
  }
};

export const sendRegisterRequest = async ({
  name,
  lastname,
  email,
  password,
  password_confirmation,
}) => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.post("/api/register", {
      name,
      lastname,
      email,
      password,
      password_confirmation,
    });
    return res.data;
  } catch (error) {
    // if statusCode === 200: "Registered successfully"
    // if statusCode === 403: "Validation Error (inc. email already exist)"
    // if statusCode === 500: "Server error"
    console.log("Error in register request", error, error.response);
    throw error;
  }
};

export const sendLogoutRequest = async () => {
  const http = AppHttp();
  try {
    const res = await http.get("/api/logout");
    return res.data;
  } catch (error) {
    console.log("Error in logout:", error, error.response);
    throw error;
  }
};

export const requestChangePassword = async (currentPassword, newPassword, confirmNewPassword) => {
  const http = AppHttp();
  try {
    const res = await http.post("/api/change-password", {
      old_password: currentPassword,
      password: newPassword,
      password_confirmation: confirmNewPassword,
    });
    return res.data;
  } catch (error) {
    // if statusCode === 404: "Confirmation passwords does not match"
    // if statusCode === 402: "Old password is incorrect"
    // if statusCode === 400: "New password and old password are the same"
    console.log("Error in change password request", error, error.response);
    throw error;
  }
};

export const setInitialPassword = async (newPassword, confirmNewPassword) => {
  const http = AppHttp();
  try {
    const res = await http.post("/api/set-password", {
      password: newPassword,
      password_confirmation: confirmNewPassword,
    });
    return res.data;
  } catch (error) {
    // if statusCode === 400: "Password has been set before, can not reset it"
    // if statusCode === 200: "Success"
    console.log("Cannot set initial password,", error, error.response);
    throw error;
  }
};

export const getSocialMediaAuthOptions = async () => {
  const http = AppHttp();
  try {
    const res = await http.get("/api/auth/socials");
    return res.data;
  } catch (error) {
    console.log("Error in getting social media authentication options", error, error.response);
    throw error;
  }
};

export const postSocialMediaAuthInfo = async ({ state, accessToken }) => {
  const http = AppHttp();
  try {
    const res = await http.post("/api/auth/socials", {
      provider_name: state,
      access_token: accessToken,
    });
    return res.data;
  } catch (error) {
    console.log("Error in posting social media callback info to server", error, error.response);
    throw error;
  }
};

export const sendForgottenPasswordRequest = async (email) => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.post("/api/forget-password", { email });
    return res.data;
  } catch (error) {
    console.log("Error sending forgotten password request.", error, error.response);
    throw error;
  }
};

export const validatePasswordResetTokenAndEmail = async (email, token) => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.get("/api/reset-password", { params: { token, email } });
    return res.data;
  } catch (error) {
    console.log("Error validating token and email to reset password.", error, error.response);
    throw error;
  }
};

/**
 * requestData: {
    email,
    token,
    password,
    password_confirmation
  }
  */
export const postPasswordResetData = async (requestData) => {
  const http = AppHttp({ noToken: true });
  try {
    const res = await http.post("/api/reset-password", requestData);
    return res.data;
  } catch (error) {
    console.log("Error sending forgotten password request.", error, error.response);
    throw error;
  }
};
