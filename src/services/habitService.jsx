import { api } from './api';

export const getHabits = async () => {
  const res = await api.get('/api/v1/habits');
  return res.data;
};

export const createHabit = async (payload) => {
  const res = await api.post('/api/v1/habits', payload);
  return res.data;
};

export const updateHabit = async (id, payload) => {
  const res = await api.put(`/api/v1/habits/${id}`, payload);
  return res.data;
};

export const deleteHabit = async (id) => {
  await api.delete(`/api/v1/habits/${id}`);
};

export const completeHabit = async (id) => {
  await api.post(`/api/v1/habits/${id}/complete`);
};

export const uncompleteHabit = async (id) => {
  await api.delete(`/api/v1/habits/${id}/complete`);
};

export const getDashboard = async () => {
  const res = await api.get('/api/v1/habits/dashboard');
  return res.data;
};
