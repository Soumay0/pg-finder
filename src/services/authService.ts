import axios from 'axios';
import { User, UserRole } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (email: string, password: string, name: string, role: UserRole) => {
  const response = await api.post('/auth/register', { email, password, name, role });
  return response.data;
};

export const getCurrentUser = async (token: string): Promise<User> => {
  const response = await api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
