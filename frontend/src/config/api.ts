// Ortak backend dosya/görsel URL fonksiyonu
// SADECE Vite proxy üzerinden çalışır
export function getBackendUrl(path: string) {
  // Eğer tam URL ise dokunma (CDN vs.)
  if (/^https?:\/\//.test(path)) return path;

  // Normalize et
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }

  // Backend'e proxy üzerinden git
  // Örn: /uploads/abc.jpg -> /api/uploads/abc.jpg
  return `/api${path}`;
}


import axios from 'axios';
const API_BASE_URL = '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);
export const publicApi = axios.create({
  baseURL: '/api',
});


export default api;

