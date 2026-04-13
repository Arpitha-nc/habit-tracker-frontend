import { Check, Pencil, Trash2 } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';

function streakBadge(days) {
  const n = parseInt(days) || 0;
  if (n >= 30) return `🔥🔥🔥 ${n}D`;
  if (n >= 14) return `🔥🔥 ${n}D`;
  if (n >= 7)  return `🔥 ${n}D`;
  if (n >= 1)  return `⚡ ${n}D`;
  return `— 0D`;
}

const accentStyles = {
  cyan:   'linear-gradient(to bottom, #81ecff, #2ff801)',
  green:  'linear-gradient(to bottom, #2ff801, #81ecff)',
  purple: 'linear-gradient(to bottom, #d277ff, #81ecff)',
};

export default function HabitCard({ habit, onComplete, onEdit, onDelete }) {
  const accent = accentStyles[habit.color] ?? accentStyles.cyan;

  return (
    <div
      className={`relative bg-surfaceLow border rounded-xl p-5 hover:border-primary/20 transition flex flex-col gap-4 ${
        habit.completedToday
          ? 'border-primary/25 shadow-[0_0_16px_rgba(129,236,255,0.06)]'
          : 'border-white/5'
      }`}
    >
      {/* Left accent line */}
      <div
        className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl"
        style={{ background: accent }}
      />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex gap-3 items-start">
          <div className="w-10 h-10 bg-surfaceHigh rounded-lg flex items-center justify-center text-lg shrink-0">
            {habit.icon}
          </div>
          <div>
            <h3 className="font-semibold text-sm leading-tight">{habit.title}</h3>
            <p className="text-xs text-textSubtle mt-0.5 leading-tight">{habit.description}</p>
          </div>
        </div>

        {/* Completion button — click to complete, click again to undo */}
        <button
          onClick={() => onComplete(habit.id)}
          title={habit.completedToday ? 'Undo completion' : 'Mark complete'}
          className={`w-7 h-7 rounded-md flex items-center justify-center transition shrink-0 ml-2 ${
            habit.completedToday
              ? 'bg-secondary text-black hover:bg-secondary/60 cursor-pointer'
              : 'border border-white/20 hover:border-primary/50 cursor-pointer'
          }`}
        >
          {habit.completedToday && <Check size={14} />}
        </button>
      </div>

      {/* Progress */}
      <ProgressBar value={habit.progress} showLabel={false} />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span
          className={`text-[10px] tracking-widest border px-2 py-0.5 rounded ${
            habit.completedToday
              ? 'border-secondary/30 text-secondary'
              : 'border-white/10 text-textSubtle'
          }`}
        >
          {habit.completedToday ? 'TODAY ✓' : streakBadge(habit.streak)}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(habit)}
            className="text-textSubtle hover:text-primary transition"
            title="Edit habit"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="text-textSubtle hover:text-red-400 transition"
            title="Delete habit"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
