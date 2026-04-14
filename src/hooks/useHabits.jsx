import { useEffect, useState } from 'react';
import { getHabits, completeHabit, uncompleteHabit, deleteHabit } from '../services/habitService';
import { useToastStore } from '../store/toastStore';

function getIconForHabit(id) {
  return localStorage.getItem(`habit-icon-${id}`) ?? '🎯';
}

function getColorForHabit(id) {
  // Deterministic from last hex char of UUID — stable across reorders
  const lastChar = (id ?? '').replace(/-/g, '').slice(-1);
  const n = parseInt(lastChar, 16) || 0;
  if (n < 6) return 'cyan';
  if (n < 11) return 'green';
  return 'purple';
}

export default function useHabits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const addToast = useToastStore((s) => s.addToast);

  const loadHabits = async () => {
    setLoading(true);
    try {
      const data = await getHabits();
      const mapped = data.map((h) => ({
        id: h.id,
        title: h.name,
        description: h.description,
        streak: h.streak,
        progress: Math.min(100, h.streak * 5),
        completedToday: h.completedToday,
        icon: getIconForHabit(h.id),
        color: getColorForHabit(h.id),
      }));
      setHabits(mapped);
    } catch {
      addToast('Failed to load habits. Check your connection.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const toggleComplete = async (id) => {
    const habit = habits.find((h) => h.id === id);
    if (!habit) return;
    const wasCompleted = habit.completedToday;
    try {
      if (wasCompleted) {
        await uncompleteHabit(id);
      } else {
        await completeHabit(id);
      }
      setHabits((prev) =>
        prev.map((h) =>
          h.id === id ? { ...h, completedToday: !wasCompleted } : h,
        ),
      );
    } catch {
      addToast(
        wasCompleted ? 'Failed to undo completion.' : 'Failed to mark habit as complete.',
        'error',
      );
    }
  };

  const removeHabit = async (id) => {
    try {
      await deleteHabit(id);
      setHabits((prev) => prev.filter((h) => h.id !== id));
      addToast('Protocol removed.', 'success');
    } catch {
      addToast('Failed to delete habit.', 'error');
    }
  };

  return { habits, loading, toggleComplete, removeHabit, reload: loadHabits };
}
