import { TStatus } from '../../lib/types';
import { MetaResponse, Todo, TodoInfo, TodoRequest } from '../../lib/types';
import { api } from '../api';

export const getNotes = async (
  status: TStatus
): Promise<MetaResponse<Todo, TodoInfo>> => {
  const response = await api.get(`todos?filter=${status}`);
  return response.data;
};

export const postNote = async (data: TodoRequest): Promise<Todo> => {
  const response = await api.post(`todos`, data);
  return response.data;
};

export const deleteNote = async (id: number): Promise<Todo> => {
  const response = await api.delete(`todos/${id}`);
  return response.data;
};

export const updateNote = async (
  data: TodoRequest,
  id: number
): Promise<Todo> => {
  const response = await api.put(`todos/${id}`, data);
  return response.data;
};
