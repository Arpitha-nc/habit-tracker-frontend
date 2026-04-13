import { useEffect, useState } from 'react';
import { getWeeklyProgress, getHeatmap } from '../services/progressService';
import { useToastStore } from '../store/toastStore';

export default function useProgress() {
  const [weeklyData, setWeeklyData] = useState([]);
  const [heatmap, setHeatmap] = useState([]);
  const [loading, setLoading] = useState(true);
  const addToast = useToastStore((s) => s.addToast);

  useEffect(() => {
    Promise.all([getWeeklyProgress(), getHeatmap()])
      .then(([weekly, heat]) => {
        setWeeklyData(weekly);
        setHeatmap(heat);
      })
      .catch(() => {
        addToast('Failed to load progress data.', 'error');
      })
      .finally(() => setLoading(false));
  }, []);

  return { weeklyData, heatmap, loading };
}
