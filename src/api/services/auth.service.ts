import {
  AuthData,
  PasswordRequest,
  Profile,
  ProfileRequest,
  RefreshToken,
  Token,
  UserRegistration,
} from '../../lib/types';
import { removeCookie, setCookie } from '../../lib/utils';
import { api } from '../api';
import { tokenService } from './token.service';

export const registerUser = async (
  data: UserRegistration
): Promise<Profile> => {
  try {
    const response = await api.post('/auth/signup', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginUser = async (data: AuthData): Promise<Token> => {
  try {
    const response = await api.post('/auth/signin', data);
    tokenService.setAccessToken(response.data.accessToken);
    setCookie('refreshToken', response.data.refreshToken, 3000);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const refreshToken = async (data: RefreshToken): Promise<Token> => {
  try {
    const response = await api.post('/auth/refresh', data);
    tokenService.setAccessToken(response.data.accessToken);
    setCookie('refreshToken', response.data.refreshToken, 3000);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserProfile = async (): Promise<Profile> => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUserProfile = async (
  data: ProfileRequest
): Promise<Profile> => {
  try {
    const response = await api.put('/user/profile', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const changePassword = async (data: PasswordRequest): Promise<void> => {
  try {
    await api.put('/user/profile/reset-password', data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await api.post('/user/logout');
    tokenService.clearAccessToken();
    removeCookie('refreshToken');
  } catch (error) {
    console.log(error);
    throw error;
  }
};
