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

  static postNote(data: TodoRequest, id: string): Promise<Todo> {
    return apiFetcher.post(`todos/${id}`, data);
  }

  static deleteNote(id: string): Promise<Todo> {
    return apiFetcher.delete(`todos/${id}`, id);
  }

  static updateNote(data: TodoRequest, id: string): Promise<Todo> {
    return apiFetcher.put(`todos/${id}`, data);
  }
}
