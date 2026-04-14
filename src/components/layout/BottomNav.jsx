import { NavLink } from 'react-router-dom';
import { Activity, BarChart2, User } from 'lucide-react';

export default function BottomNav() {
  const base = 'flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[10px] tracking-widest transition';
  const active = 'text-primary';
  const inactive = 'text-textSubtle hover:text-textMain';

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex border-t border-white/5 bg-surfaceLow/95 backdrop-blur-md">
      <NavLink to="/" end className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        <Activity size={18} />
        HABITS
      </NavLink>
      <NavLink to="/stats" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        <BarChart2 size={18} />
        STATS
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        <User size={18} />
        PROFILE
      </NavLink>
    </nav>
  );
}
