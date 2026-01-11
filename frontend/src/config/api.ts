
// Ortak backend dosya/görsel URL fonksiyonu
export function getBackendUrl(path: string) {
  // Eğer tam URL ise dokunma (CDN vs.)
  if (/^https?:\/\//.test(path)) return path;

  // Normalize et
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }

  // Use configured API URL
  const baseUrl = import.meta.env.VITE_API_URL;

  // Clean up double slashes if any
  return `${baseUrl}${path}`;
}

import axios from 'axios';

// Strict usage of VITE_API_URL
const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  console.error('VITE_API_URL is not defined in .env!');
}

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
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
  baseURL: API_BASE_URL,
});


export default api;
