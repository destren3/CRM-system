import { TStatus } from '../../lib/types';
import { MetaResponse, Todo, TodoInfo, TodoRequest } from '../../lib/types';
import { api } from '../api';

export const getNotes = async (
  status: TStatus
): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const response = await api.get(`todos?filter=${status}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postNote = async (data: TodoRequest): Promise<Todo> => {
  try {
    const response = await api.post(`todos`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteNote = async (id: number): Promise<Todo> => {
  try {
    const response = await api.delete(`todos/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateNote = async (
  data: TodoRequest,
  id: number
): Promise<Todo> => {
  try {
    const response = await api.put(`todos/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
