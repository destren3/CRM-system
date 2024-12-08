import {
  MetaResponse,
  TStatus,
  Todo,
  TodoInfo,
  TodoRequest,
} from '../../types';
import { apiFetcher } from '../core/fetcher';

export class NotesService {
  static getNotes(status: TStatus): Promise<MetaResponse<Todo, TodoInfo>> {
    return apiFetcher.get(`todos?filter=${status}`);
  }

  static postNote(data: TodoRequest): Promise<Todo> {
    return apiFetcher.post(`todos`, data);
  }

  static deleteNote(id: number): Promise<Todo> {
    return apiFetcher.delete(`todos/${id}`, id);
  }

  static updateNote(data: TodoRequest, id: number): Promise<Todo> {
    return apiFetcher.put(`todos/${id}`, data);
  }
}
