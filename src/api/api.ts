import axios from 'axios';
import { getCookie } from '../lib/utils';
import { refreshToken } from './services';

export const api = axios.create({
  baseURL: 'https://easydev.club/api/v1',
});

api.interceptors.request.use((config) => {
  const accessToken = getCookie('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (error.response.status === 401 && storedRefreshToken) {
      try {
        if (!isRefreshing) {
          isRefreshing = true;
          await refreshToken({ refreshToken: storedRefreshToken });
          isRefreshing = false;
        }
        return api(error.config);
      } catch (error) {
        console.log(error);
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
  }
);
