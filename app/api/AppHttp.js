import axios from "axios";
import CookiesService from "../../services/CookiesService";
import { NIREEKA_SERVER, NSD_SERVER } from "../constants/servers";
import { handleUnauthenticatedResponse } from "./auth";

let shouldQueueRequests = false;
const requestQueue = [];

const addRequestToQueue = (requestCallback) => {
  requestQueue.push(requestCallback);
};

const startQueue = (newToken) => {
  requestQueue.forEach((req) => req(newToken));
  requestQueue = [];
};

const replaceTokenInRequest = (requestConfig, newToken) => {
  if (requestConfig.headers.Authorization)
    requestConfig.headers.Authorization = `Bearer ${newToken}`;

  if (requestConfig.baseURL === NSD_SERVER && requestConfig.method === "post") {
    const requestBody = JSON.parse(requestConfig.data);
    if (requestBody.token) {
      requestBody.token = newToken;
      requestConfig.data = JSON.stringify(requestBody);
    }
  }
};

const AppHttp = ({
  noToken = false,
  accessToken = null,
  serverURL = NIREEKA_SERVER,
  headers = null,
} = {}) => {
  const token = CookiesService.get("access_token") || CookiesService.get("access_token_payment") || accessToken;

  let apiURL = NIREEKA_SERVER;
  if (serverURL) apiURL = serverURL;

  const instance = axios.create({
    baseURL: apiURL,
    timeout: 30 * 1000, // 30 seconds
  });

  instance.interceptors.request.use(
    (request) => {
      // Setting access token in header
      // If the authorization is already set (probably using replaceTokenInRequest after a refresh token request), ignore adding the token
      if (token && !noToken && !request.headers?.Authorization) {
        request.headers.Authorization = `Bearer ${token}`;
      }

      // Adding the custom headers to the instance
      for (let headerKey in headers) request.headers[headerKey] = headers[headerKey];

      return request;
    },
    (error) => error
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      /**
       * If the error was a 401 unauthenticated error,
       * we must refresh the token and try that again,
       * while enabling a queue to hold other requests which use the old token
       */
      if (
        error &&
        error.response &&
        error.response.status === 401 &&
        token &&
        !noToken &&
        error.config.url !== "/api/cart"
      ) {
        const request = error.config;

        if (!shouldQueueRequests) {
          shouldQueueRequests = true;

          try {
            // Refreshing the token
            const refreshTokenResponse = await handleUnauthenticatedResponse();

            const newToken = refreshTokenResponse.data.token;

            replaceTokenInRequest(request, newToken);
            const res = instance(request);

            // Running the queue
            shouldQueueRequests = false;
            startQueue(newToken);
            return Promise.resolve(res);
          } catch (refreshTokenError) {
            return Promise.reject(error);
          } finally {
            shouldQueueRequests = false;
          }
        }

        const queuedRequest = new Promise((resolve) => {
          addRequestToQueue((newToken) => {
            // Replacing the old token with the new one, in place
            replaceTokenInRequest(request, newToken);
            resolve(instance(request));
          });
        });
        return queuedRequest;
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default AppHttp;
