import axios from 'axios';
import { useUserStore } from '../store/userStore';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// add Authorization header dynamically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// interceptor to handle expired tokens (401 errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Token expired. Logging out...');
      useUserStore.getState().logoutUser();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
