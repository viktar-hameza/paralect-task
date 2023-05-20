import Axios, { AxiosRequestConfig, AxiosError } from 'axios';
import {
  authRequestInterceptor,
  authResponseInterceptor,
} from '../../helpers/auth';

const DEFAULT_HEADERS = {
  'x-secret-key': process.env.NEXT_PUBLIC_SUPERJOB_X_SECRET_KEY,
  'X-Api-App-Id': process.env.NEXT_PUBLIC_SUPERJOB_CLIENT_SECRET,
};

export const AXIOS_INSTANCE = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SUPERJOB_API_URL}/${process.env.NEXT_PUBLIC_SUPERJOB_API_VERSION}`,
  headers: DEFAULT_HEADERS,
});

// add auth interceptors
AXIOS_INSTANCE.interceptors.request.use(authRequestInterceptor);
AXIOS_INSTANCE.interceptors.response.use(null, authResponseInterceptor);

const axiosInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data
  );

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled by React Query');
  };

  return promise;
};

export { axiosInstance };
