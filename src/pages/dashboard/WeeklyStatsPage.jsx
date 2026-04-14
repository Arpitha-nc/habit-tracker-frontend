import { Trophy, TrendingUp, Lock } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import ProgressBar from '../../components/ui/ProgressBar';
import useProgress from '../../hooks/useProgress';
import { ACHIEVEMENT_DEFS } from '../../utils/constants';

const DAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function parseDayLabel(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return DAY_LABELS[new Date(year, month - 1, day).getDay()];
}

const STREAK_COLORS = ['primary', 'secondary', 'tertiary'];

const colorMap = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
};

export default function WeeklyStatsPage() {
  const { habits, dashboard } = useOutletContext();
  const { weeklyData } = useProgress();

  const totalHabits = dashboard?.totalHabits ?? 0;
  const xp = dashboard?.xp ?? 0;
  const level = dashboard?.level ?? 1;
  const longestStreak = dashboard?.longestStreak ?? 0;

  // Bar values as completion % per day
  const barValues = weeklyData.map((d) =>
    totalHabits > 0 ? Math.round((d.completedHabits / totalHabits) * 100) : 0,
  );
  const maxBar = Math.max(...barValues, 1);
  const completionRate =
    barValues.length > 0
      ? (barValues.reduce((s, v) => s + v, 0) / barValues.length).toFixed(1)
      : '0.0';

  // XP progress within current level
  const xpInLevel = xp % 100;
  const xpToNextLevel = 100 - xpInLevel;

  // Per-habit streaks
  const currentStreaks = habits
    .map((h, i) => ({
      name: h.title,
      days: parseInt(h.streak) || 0,
      color: STREAK_COLORS[i % STREAK_COLORS.length],
    }))
    .sort((a, b) => b.days - a.days)
    .slice(0, 5);

  // Achievements evaluated against real data
  const d = dashboard ?? {};
  const achievements = ACHIEVEMENT_DEFS.map((a) => ({
    ...a,
    unlocked: a.check(d),
  }));

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[10px] tracking-widest text-textSubtle mb-1">
            HABIT_COMPLETION_BASE
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight">
            Weekly Velocity
          </h1>
        </div>
        <div className="flex gap-4">
          <div className="text-right border border-white/5 bg-surfaceLow px-4 py-3 rounded-lg">
            <div className="flex items-center gap-1 justify-end">
              <TrendingUp size={12} className="text-secondary" />
              <span className="font-display text-2xl font-bold text-secondary">
                {completionRate}%
              </span>
            </div>
            <p className="text-[10px] tracking-widest text-textSubtle">
              COMPLETION
            </p>
          </div>
          <div className="text-right border border-white/5 bg-surfaceLow px-4 py-3 rounded-lg">
            <span className="font-display text-2xl font-bold text-tertiary">
              {longestStreak}
            </span>
            <p className="text-[10px] tracking-widest text-textSubtle">
              DAY STREAK
            </p>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-6">
        {/* Bar chart */}
        <div className="bg-surfaceLow border border-white/5 rounded-xl p-6">
          <p className="text-[10px] tracking-widest text-textSubtle mb-6">
            HABIT_COMPLETION_GRAPH
          </p>
          <div className="flex items-end gap-3 h-48">
            {weeklyData.length > 0
              ? weeklyData.map((item, i) => {
                  const val = barValues[i];
                  const isMax = val === maxBar && val > 0;
                  return (
                    <div
                      key={item.date}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <span className="text-[10px] text-textSubtle">
                        {val}%
                      </span>
                      <div
                        className="w-full flex flex-col justify-end"
                        style={{ height: '160px' }}
                      >
                        <div
                          className="w-full rounded-t-sm"
                          style={{
                            height: `${Math.max((val / maxBar) * 100, 2)}%`,
                            background: isMax
                              ? 'linear-gradient(to top, #2ff801, #81ecff)'
                              : 'rgba(129,236,255,0.25)',
                          }}
                        />
                      </div>
                      <span className="text-[9px] tracking-widest text-textSubtle">
                        {parseDayLabel(item.date)}
                      </span>
                    </div>
                  );
                })
              : DAY_LABELS.slice(1)
                  .concat('SUN')
                  .map((day) => (
                    <div
                      key={day}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <span className="text-[10px] text-textSubtle">0%</span>
                      <div
                        className="w-full flex flex-col justify-end"
                        style={{ height: '160px' }}
                      >
                        <div
                          className="w-full rounded-t-sm"
                          style={{
                            height: '2%',
                            background: 'rgba(129,236,255,0.1)',
                          }}
                        />
                      </div>
                      <span className="text-[9px] tracking-widest text-textSubtle">
                        {day}
                      </span>
                    </div>
                  ))}
          </div>
        </div>

        {/* Right: XP + Streaks */}
        <div className="space-y-5">
          <div className="bg-surfaceLow border border-white/5 rounded-xl p-5">
            <p className="text-[10px] tracking-widest text-textSubtle mb-2">
              TOTAL_XP
            </p>
            <p className="font-display text-3xl font-bold text-primary mb-3">
              {xp} XP
            </p>
            <ProgressBar value={xpInLevel} showLabel={false} />
            <p className="text-[10px] text-textSubtle mt-1">
              {xpToNextLevel} XP to level {level + 1}
            </p>
          </div>

          <div className="bg-surfaceLow border border-white/5 rounded-xl p-5">
            <p className="text-[10px] tracking-widest text-textSubtle mb-4">
              CURRENT_STREAKS
            </p>
            {currentStreaks.length > 0 ? (
              <div className="space-y-3">
                {currentStreaks.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${colorMap[s.color]}`}
                      />
                      <span className="text-xs text-textSubtle truncate max-w-35">
                        {s.name}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-textMain">
                      {s.days}D
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-textSubtle">No active streaks yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-8">
        <div className="flex items-center gap-3 mb-5">
          <Trophy size={16} className="text-primary" />
          <p className="text-[10px] tracking-widest text-textSubtle">
            ACHIEVEMENTS
          </p>
          <span className="text-xs text-secondary border border-secondary/30 px-2 py-0.5 rounded-full">
            {achievements.filter((a) => a.unlocked).length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {achievements.map((a) => (
            <div
              key={a.id}
              className={`relative border rounded-xl p-5 transition ${
                a.unlocked
                  ? 'bg-surfaceLow border-white/10 hover:border-primary/30'
                  : 'bg-surfaceLow/40 border-white/5 opacity-50'
              }`}
            >
              {!a.unlocked && (
                <Lock
                  size={12}
                  className="absolute top-3 right-3 text-textSubtle"
                />
              )}
              <span className="text-2xl mb-3 block">{a.icon}</span>
              <p className="text-sm font-semibold mb-1">{a.title}</p>
              <p className="text-[11px] text-textSubtle leading-relaxed">
                {a.desc}
              </p>
              {a.unlocked && (
                <span className="mt-3 inline-block text-[10px] tracking-widest text-secondary border border-secondary/30 px-2 py-0.5 rounded-full">
                  UNLOCKED
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
