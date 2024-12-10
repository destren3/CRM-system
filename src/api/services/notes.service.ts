import { TStatus } from '../../components/tabs/status-types';
import { MetaResponse, Todo, TodoInfo, TodoRequest } from '../../lib/types';
import { apiFetcher } from '../core/fetcher';

export const getNotes = (
  status: TStatus
): Promise<MetaResponse<Todo, TodoInfo>> => {
  return apiFetcher.get(`todos?filter=${status}`);
};

export const postNote = (data: TodoRequest): Promise<Todo> => {
  return apiFetcher.post(`todos`, data);
};

export const deleteNote = (id: number): Promise<Todo> => {
  return apiFetcher.delete(`todos/${id}`, id);
};

export const updateNote = (data: TodoRequest, id: number): Promise<Todo> => {
  return apiFetcher.put(`todos/${id}`, data);
};
