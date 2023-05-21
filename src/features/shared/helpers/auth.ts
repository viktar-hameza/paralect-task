import { GetServerSidePropsContext } from "next";
import {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import cookie from "cookie";

import { getToken } from "../api/superjob/requests";
import { ErrorResponse } from "../api/superjob/types";
import { AXIOS_INSTANCE } from "../api/superjob/axiosInstance";

const ERROR_CODES = ["invalid_token", "token_not_found"];

export const authRequestInterceptor = async (
  config: InternalAxiosRequestConfig
) => {
  console.log("authRequestInterceptor - START");

  if (config.url === `/api/auth/`) {
    console.log("authRequestInterceptor - END");

    return config;
  }

  // add Authorization header on client side
  if (typeof window !== "undefined") {
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;

      console.log("authRequestInterceptor - END");

      return config;
    }
  }

  if (!config.headers.Authorization) {
    console.log("getToken - START");

    const { access_token, expires_in } = await getToken({
      baseURL:
        process.env.NODE_ENV === "production"
          ? process.env.URL
          : "http://localhost:3000",
      url: "/api/auth/",
    });

    console.log("getToken - END");

    config.headers.Authorization = `Bearer ${access_token}`;

    // save token to cookie on client side
    Cookies.set("token", access_token, {
      sameSite: "Lax",
      expires: expires_in / (60 * 60 * 24),
    });
  }

  console.log("authRequestInterceptor - END");
  return config;
};

export const authResponseInterceptor = async (
  error: AxiosError<ErrorResponse>
) => {
  console.log("authResponseInterceptor - START");
  console.log("authResponseInterceptor - END");

  if (
    error.config &&
    ERROR_CODES.includes(error.response?.data.error.error || "")
  ) {
    const headers = error.config?.headers.toJSON();
    delete headers.Authorization;
    Cookies.remove("token");
    return AXIOS_INSTANCE({ ...error.config, headers });
  }
  return Promise.reject(error);
};

export const getAuthAxiosConfig = (
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"]
) => {
  const token = req.cookies.token || "";

  return {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    transformRequest: (
      data: AxiosRequestConfig["data"],
      headers: AxiosHeaders
    ) => {
      const authHeader = String(headers?.Authorization) || "";
      const token = authHeader.split(" ")[1];

      // save token to response only if it's not equal to old token
      if (req.cookies.token !== token) {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 1 week
          })
        );
      }

      return data;
    },
  };
};
