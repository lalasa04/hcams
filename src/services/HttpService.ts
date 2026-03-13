import { AuthService } from './AuthService';

export const HttpService = {
  getHeaders() {
    const token = AuthService.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  },

  async get<T>(url: string): Promise<T> {
    console.log(`[GET] ${url}`, this.getHeaders());
    return {} as T;
  },

  async post<T>(url: string, data: unknown): Promise<T> {
    console.log(`[POST] ${url}`, data, this.getHeaders());
    return {} as T;
  },

  async put<T>(url: string, data: unknown): Promise<T> {
    console.log(`[PUT] ${url}`, data, this.getHeaders());
    return {} as T;
  },
};
