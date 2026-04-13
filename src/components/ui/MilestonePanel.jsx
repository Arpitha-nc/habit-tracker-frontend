import ProgressBar from './ProgressBar';
import { ACHIEVEMENT_DEFS } from '../../utils/constants';

export default function MilestonesPanel({ dashboard }) {
  const d = dashboard ?? {};

  // Show the 2 in-progress (not yet unlocked, evaluable) achievements with highest progress
  const milestones = ACHIEVEMENT_DEFS
    .filter((a) => !a.check(d) && a.progress(d) > 0)
    .map((a) => ({ ...a, pct: a.progress(d) }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 2);

  // Fall back to first 2 defs if none have progress yet
  const display =
    milestones.length > 0
      ? milestones
      : ACHIEVEMENT_DEFS.filter((a) => !a.check(d))
          .slice(0, 2)
          .map((a) => ({ ...a, pct: 0 }));

  return (
    <div className="bg-surfaceLow border border-white/5 rounded-xl p-6">
      <h3 className="text-[10px] tracking-widest text-textSubtle mb-6">ACTIVE MILESTONES</h3>

      <div className="space-y-5">
        {display.map((m) => (
          <div key={m.id}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold">{m.title}</p>
              <span className="text-[10px] text-textSubtle">{m.pct}%</span>
            </div>
            <ProgressBar value={m.pct} showLabel={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
