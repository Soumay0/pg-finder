import axios from 'axios';
import { PG } from '../types';

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

export const getPGs = async (filters?: { location?: string; maxRent?: number }): Promise<PG[]> => {
  const response = await api.get('/pgs', { params: filters });
  return response.data;
};

export const getPGById = async (id: string): Promise<PG> => {
  const response = await api.get(`/pgs/${id}`);
  return response.data;
};

export const createPG = async (pgData: Omit<PG, 'id' | 'createdAt'>): Promise<PG> => {
  const response = await api.post('/pgs', pgData);
  return response.data;
};

export const updatePG = async (id: string, pgData: Partial<PG>): Promise<PG> => {
  const response = await api.put(`/pgs/${id}`, pgData);
  return response.data;
};

export const deletePG = async (id: string): Promise<void> => {
  await api.delete(`/pgs/${id}`);
};

export const getMyPGs = async (): Promise<PG[]> => {
  const response = await api.get('/pgs/my-listings');
  return response.data;
};
