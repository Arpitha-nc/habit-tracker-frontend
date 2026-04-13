import { useState } from 'react';
import { Plus, Cpu } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import HabitCard from '../../components/habit/HabitCard';
import EditHabitModal from '../../components/habit/EditHabitModal';
import ConfirmModal from '../../components/ui/ConfirmModal';
import WeeklyCalibration from '../../components/stats/WeeklyCalibration';
import useProgress from '../../hooks/useProgress';

function HabitCardSkeleton() {
  return (
    <div className="relative bg-surfaceLow border border-white/5 rounded-xl p-5 flex flex-col gap-4 animate-pulse">
      <div className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl bg-white/10" />
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-surfaceHigh rounded-lg shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-surfaceHigh rounded w-3/4" />
          <div className="h-2 bg-surfaceHigh rounded w-1/2" />
        </div>
      </div>
      <div className="h-2 bg-surfaceHigh rounded-full w-full" />
      <div className="h-3 bg-surfaceHigh rounded w-1/3" />
    </div>
  );
}

export default function DailyProtocolsPage() {
  const { habits, habitsLoading, toggleComplete, removeHabit, reloadHabits, openAddModal } =
    useOutletContext();
  const { weeklyData } = useProgress();
  const [editingHabit, setEditingHabit] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleConfirmDelete = () => {
    if (deletingId) {
      removeHabit(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
          Daily Protocols
        </h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 text-xs tracking-widest border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition rounded"
        >
          <Plus size={14} />
          NEW_PROTOCOL
        </button>
      </div>

      {habitsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {[1, 2, 3].map((n) => (
            <HabitCardSkeleton key={n} />
          ))}
        </div>
      ) : habits.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Cpu size={40} className="text-textSubtle mb-4 opacity-40" />
          <p className="text-[10px] tracking-widest text-textSubtle mb-2">NO_PROTOCOLS_ACTIVE</p>
          <p className="text-sm text-textSubtle mb-6">
            No habits tracked yet. Initialize your first protocol.
          </p>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-5 py-2.5 text-xs tracking-widest border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition rounded"
          >
            <Plus size={14} />
            INITIALIZE_FIRST_PROTOCOL
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onComplete={toggleComplete}
              onEdit={setEditingHabit}
              onDelete={setDeletingId}
            />
          ))}
        </div>
      )}

      <div className="mt-8">
        <WeeklyCalibration weeklyData={weeklyData} />
      </div>

      {editingHabit && (
        <EditHabitModal
          habit={editingHabit}
          onClose={() => setEditingHabit(null)}
          onUpdated={reloadHabits}
        />
      )}

      {deletingId && (
        <ConfirmModal
          title="Delete Protocol"
          message="This habit and all its history will be permanently removed. This cannot be undone."
          confirmLabel="DELETE_PROTOCOL"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
}
