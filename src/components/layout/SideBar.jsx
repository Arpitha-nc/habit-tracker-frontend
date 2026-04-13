import { NavLink } from 'react-router-dom';
import { Activity, BarChart2, User } from 'lucide-react';

export default function Sidebar({ level = 1 }) {
  const linkBase = 'flex items-center gap-3 px-4 py-3 rounded-md text-sm transition';
  const activeClass = 'text-primary bg-surfaceHigh';
  const inactiveClass = 'text-textSubtle hover:text-textMain hover:bg-surfaceHigh/50';

  return (
    <aside className="hidden md:flex w-[220px] shrink-0 border-r border-white/5 px-4 py-8 bg-surfaceLow flex-col">
      <div className="mb-8 px-2">
        <p className="text-[10px] text-textSubtle tracking-widest">ROOT_USER</p>
        <p className="text-primary font-semibold text-sm mt-0.5">LVL {level} ARCHITECT</p>
      </div>

      <nav className="space-y-1 flex-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `${linkBase} ${isActive ? activeClass : inactiveClass}`}
        >
          <Activity size={16} />
          DAILY HABITS
        </NavLink>

        <NavLink
          to="/stats"
          className={({ isActive }) => `${linkBase} ${isActive ? activeClass : inactiveClass}`}
        >
          <BarChart2 size={16} />
          WEEKLY STATS
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) => `${linkBase} ${isActive ? activeClass : inactiveClass}`}
        >
          <User size={16} />
          PROFILE
        </NavLink>
      </nav>
    </aside>
  );
}
