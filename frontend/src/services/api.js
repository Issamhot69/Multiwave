import axios from 'axios';

const API_URL = 'https://9ced-105-155-43-142.ngrok-free.app/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  }
});

// Ajouter le token JWT automatiquement
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = (email, password) =>
  api.post('/users/login', { email, password });

export const register = (username, email, password, extra = {}) =>
  api.post('/users/register', { username, email, password, ...extra });
  

export default api;// Wed Jul 29 12:51:01 +01 2026
