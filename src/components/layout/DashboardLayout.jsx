import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';
import BottomNav from './BottomNav';
import Navbar from './Navbar';
import ActiveStreak from '../stats/ActiveStreak';
import MilestonesPanel from '../ui/MilestonePanel';
import AddHabitModal from '../habit/AddHabitModal';
import useDashboard from '../../hooks/useDashboard';
import useHabits from '../../hooks/useHabits';

export default function DashboardLayout() {
  const [showAddModal, setShowAddModal] = useState(false);
  const { dashboard, reload: reloadDashboard } = useDashboard();
  const { habits, loading: habitsLoading, toggleComplete, removeHabit, reload: reloadHabits } = useHabits();

  const handleCreated = () => {
    reloadHabits();
    reloadDashboard();
  };

  const handleToggleComplete = async (id) => {
    await toggleComplete(id);
    reloadDashboard();
  };

  const handleRemoveHabit = async (id) => {
    await removeHabit(id);
    reloadDashboard();
  };

  const streak = dashboard?.longestStreak ?? 0;
  const level = dashboard?.level ?? 1;
  const progress =
    dashboard?.totalHabits > 0
      ? Math.round((dashboard.completedToday / dashboard.totalHabits) * 100)
      : 0;

  const outletContext = {
    habits,
    habitsLoading,
    toggleComplete: handleToggleComplete,
    removeHabit: handleRemoveHabit,
    reloadHabits,
    dashboard,
    reloadDashboard,
    openAddModal: () => setShowAddModal(true),
  };

  return (
    <div className="h-screen bg-surface text-textMain flex flex-col overflow-hidden">
      <Navbar onAddHabit={() => setShowAddModal(true)} level={level} streak={streak} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar level={level} />

        <main className="flex-1 px-4 md:px-10 py-8 overflow-y-auto pb-20 md:pb-8">
          <Outlet context={outletContext} />
        </main>

        <div className="hidden lg:block w-[280px] shrink-0 border-l border-white/5 px-6 py-8 overflow-y-auto">
          <ActiveStreak streak={streak} progress={progress} />
          <MilestonesPanel dashboard={dashboard} />
        </div>
      </div>

      <BottomNav />

      {showAddModal && (
        <AddHabitModal
          onClose={() => setShowAddModal(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
}
