import { apiFetcher } from '../core/fetcher';

export class NotesService {
  static getNotes(): Promise<void> {
    return apiFetcher.get('todos');
  }

  static postNote(id: string): Promise<any> {
    return apiFetcher.post(`todos/${id}`, id);
  }

  static deleteNote(id: string): Promise<void> {
    return apiFetcher.delete(`todos/${id}`, id);
  }

  static updateNote(id: string): Promise<void> {
    return apiFetcher.put(`todos/${id}`, id);
  }
}
