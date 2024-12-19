import axios from 'axios';
import { getCookie, removeCookie } from '../lib/utils';
import { refreshToken } from './services';
import { tokenService } from './services/token.service';

export const api = axios.create({
  baseURL: 'https://easydev.club/api/v1',
});

api.interceptors.request.use((config) => {
  const accessToken = tokenService.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const storedRefreshToken = getCookie('refreshToken')
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
        removeCookie('refreshToken');
        window.location.href = '/login';
      }
    }
  }
);
