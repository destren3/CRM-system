import { API_CONFIG } from '../config';

class ApiFetcher {
  private baseurl: string;

  constructor(baseUrl: string) {
    this.baseurl = baseUrl;
  }

  private handleResponse = async (response: Response) => {
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  private getHeaders() {
    return {
      'Content-type': 'application/json',
    };
  }

  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseurl}/${path}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async post<T, R>(path: string, data: R): Promise<T> {
    const response = await fetch(`${this.baseurl}/${path}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async put<T, R>(path: string, data: R): Promise<T> {
    const response = await fetch(`${this.baseurl}/${path}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async delete<T, R>(path: string, data: R): Promise<T> {
    const response = await fetch(`${this.baseurl}/${path}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }
}

export const apiFetcher = new ApiFetcher(API_CONFIG.BASE_URL);
