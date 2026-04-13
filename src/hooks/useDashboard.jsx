import { useEffect, useState } from 'react';
import { getDashboard } from '../services/habitService';
import { useToastStore } from '../store/toastStore';

export default function useDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const addToast = useToastStore((s) => s.addToast);

  const load = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch {
      addToast('Failed to load dashboard stats.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { dashboard, loading, reload: load };
}
