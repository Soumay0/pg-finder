import axios from 'axios';
import { Message, Notice } from '../types';

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

export const getMessages = async (): Promise<Message[]> => {
  const response = await api.get('/messages');
  return response.data;
};

export const sendMessage = async (receiverId: string, content: string): Promise<Message> => {
  const response = await api.post('/messages', { receiverId, content });
  return response.data;
};

export const markAsRead = async (messageId: string): Promise<void> => {
  await api.put(`/messages/${messageId}/read`);
};

export const getNotices = async (): Promise<Notice[]> => {
  const response = await api.get('/notices');
  return response.data;
};

export const createNotice = async (title: string, content: string): Promise<Notice> => {
  const response = await api.post('/notices', { title, content });
  return response.data;
};

export const deleteNotice = async (id: string): Promise<void> => {
  await api.delete(`/notices/${id}`);
};
