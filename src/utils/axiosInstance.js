import axios from 'axios';
import appStore from './appStore';
import { showLoader, hideLoader } from './loaderSlice';
import { BASE_URL } from './constants';

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  withCredentials: true,
});

// Request Interceptor: Show loader
axiosInstance.interceptors.request.use(
  (config) => {
    appStore.dispatch(showLoader());
    return config;
  },
  (error) => {
    appStore.dispatch(hideLoader());
    return Promise.reject(error);
  }
);

// Response Interceptor: Hide loader
axiosInstance.interceptors.response.use(
  (response) => {
    appStore.dispatch(hideLoader());
    return response;
  },
  (error) => {
    appStore.dispatch(hideLoader());
    return Promise.reject(error);
  }
);

export default axiosInstance;
