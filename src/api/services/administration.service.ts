import {
  MetaResponseUsers,
  User,
  UserFilters,
  UserRequest,
  UserRolesRequest,
} from '../../lib/types';
import { api } from '../api';

export const getUsers = async (
  data?: UserFilters
): Promise<MetaResponseUsers<User>> => {
  try {
    const users = await api.get('/admin/users', {
      params: data
        ? Object.fromEntries(
            Object.entries(data).filter(
              ([key, value]) => value !== undefined && value !== null
            )
          )
        : undefined,
    });
    return users.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUser = async (id: number): Promise<User> => {
  try {
    const user = await api.get(`/admin/users/${id}`);
    return user.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUserRights = async (
  role: UserRolesRequest,
  id: number
): Promise<User> => {
  try {
    const user = await api.post(`/admin/users/${id}/rights`, role);
    return user.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUserData = async (
  userData: UserRequest,
  id: number
): Promise<User> => {
  try {
    const user = await api.put(`/admin/users/${id}`, userData);
    return user.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const blockUser = async (id: number): Promise<User> => {
  try {
    const user = await api.post(`/admin/users/${id}/block`);
    return user.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const unblockUser = async (id: number): Promise<User> => {
  try {
    const user = await api.post(`/admin/users/${id}/unblock`);
    return user.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    const user = await api.delete(`/admin/users/${id}`);
    return user.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
