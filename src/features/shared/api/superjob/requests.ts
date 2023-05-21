import qs from "qs";
import { axiosInstance } from "@/features/shared/api/superjob/axiosInstance";
import { TokenResponse, SearchResponse, CataloguesResponse } from "./types";
import { AxiosRequestConfig } from "axios";

export const getVacancies = (config?: AxiosRequestConfig) => {
  return axiosInstance<SearchResponse>({
    url: `/vacancies/`,
    method: "get",
    paramsSerializer: (p) => {
      return qs.stringify(p, { arrayFormat: "brackets" });
    },
    ...config,
  });
};

export const getToken = (config?: AxiosRequestConfig) => {
  return axiosInstance<TokenResponse>({
    url: `/oauth2/password/`,
    method: "get",
    paramsSerializer: (p) => {
      return qs.stringify(p, { arrayFormat: "brackets" });
    },
    ...config,
  });
};

export const getCatalogues = (config?: AxiosRequestConfig) => {
  return axiosInstance<CataloguesResponse>({
    url: `/catalogues/`,
    method: "get",
    paramsSerializer: (p) => {
      return qs.stringify(p, { arrayFormat: "brackets" });
    },
    ...config,
  });
};
