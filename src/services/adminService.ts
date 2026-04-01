import axios from 'axios';
import type { AdminRequest } from '../types';

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

export const getAdminRequests = async (): Promise<AdminRequest[]> => {
  const response = await api.get('/admin-requests');
  return response.data;
};

export const approveAdminRequest = async (id: string): Promise<AdminRequest> => {
  const response = await api.put(`/admin-requests/${id}/approve`);
  return response.data;
};

export const rejectAdminRequest = async (id: string): Promise<AdminRequest> => {
  const response = await api.put(`/admin-requests/${id}/reject`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getAllPGs = async () => {
  const response = await api.get('/pgs/all');
  return response.data;
};
