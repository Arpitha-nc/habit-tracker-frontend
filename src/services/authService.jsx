import { api } from './api';

export const loginUser = async (data) => {
  const response = await api.post('/api/v1/auth/login', data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await api.post('/api/v1/auth/register', data);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/api/v1/auth/me');
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.patch('/api/v1/auth/me', data);
  return response.data;
};
