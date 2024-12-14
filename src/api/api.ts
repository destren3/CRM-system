import axios from 'axios';
import { getCookie } from '../lib/utils';

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
