import { api } from './api';

export const getWeeklyProgress = async () => {
  const res = await api.get('/api/v1/habits/progress/weekly');
  return res.data;
};

export const getHeatmap = async () => {
  const res = await api.get('/api/v1/habits/progress/heatmap');
  return res.data;
};
