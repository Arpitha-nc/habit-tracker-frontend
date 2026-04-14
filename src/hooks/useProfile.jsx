import { useEffect, useState } from 'react';
import { getMe } from '../services/authService';
import { useToastStore } from '../store/toastStore';

export default function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const addToast = useToastStore((s) => s.addToast);

  const load = () => {
    setLoading(true);
    getMe()
      .then(setProfile)
      .catch(() => {
        addToast('Failed to load profile.', 'error');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return { profile, loading, reload: load };
}
