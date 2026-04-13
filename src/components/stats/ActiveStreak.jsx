export default function ActiveStreak({ streak = 0, progress = 0 }) {
  return (
    <div className="mb-8">
      <p className="text-[10px] tracking-widest text-textSubtle mb-3">OPERATIONAL_STATUS</p>
      <div className="flex items-end gap-3">
        <span className="font-display text-[56px] font-bold leading-none text-tertiary">{streak}</span>
        <div className="text-xs text-textSubtle tracking-widest pb-2 leading-tight">
          DAY<br />STREAK
        </div>
      </div>
      <div className="mt-3 h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-tertiary to-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
