import { NavLink } from 'react-router-dom';
import { Plus, User } from 'lucide-react';

export default function Navbar({ onAddHabit, level = 1, streak = 0 }) {
  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-3 border-b border-white/5 bg-surfaceLow/60 backdrop-blur-md shrink-0">
      {/* LEFT — brand + level */}
      <div className="flex items-center gap-4">
        <div className="font-display text-primary text-base font-semibold tracking-wide">
          HABIT_OS
        </div>
        <div className="hidden sm:flex items-center gap-1 border border-primary/30 px-2 py-1 rounded text-xs tracking-widest text-primary font-semibold">
          LVL.<span className="text-textMain">{level}</span>
        </div>
      </div>

      {/* RIGHT — streak, add, profile */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Streak pill */}
        <div className="flex items-center gap-2 border border-white/10 bg-surfaceHigh px-3 py-1.5 rounded text-xs">
          <span className="text-xl font-display font-semibold text-tertiary leading-none">{streak}</span>
          <div className="text-[10px] text-textSubtle tracking-widest leading-tight">
            DAY<br />STREAK
          </div>
        </div>

        <button
          onClick={onAddHabit}
          className="w-7 h-7 rounded-md bg-primary flex items-center justify-center text-black hover:shadow-glow transition"
          title="Add new habit"
        >
          <Plus size={14} strokeWidth={2.5} />
        </button>

        <NavLink
          to="/profile"
          className="w-7 h-7 rounded-full bg-surfaceHigh flex items-center justify-center border border-white/10 hover:border-primary/40 transition"
          title="Profile"
        >
          <User size={14} />
        </NavLink>
      </div>
    </header>
  );
}
