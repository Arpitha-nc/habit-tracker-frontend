const DAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function parseDayLabel(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return DAY_LABELS[new Date(year, month - 1, day).getDay()];
}

export default function WeeklyCalibration({ weeklyData = [] }) {
  const maxCount = Math.max(...weeklyData.map((d) => d.completedHabits), 1);
  const totalCompletions = weeklyData.reduce((sum, d) => sum + d.completedHabits, 0);
  const todayCount = weeklyData.length > 0 ? weeklyData[weeklyData.length - 1].completedHabits : 0;
  const peakPct = Math.round((todayCount / maxCount) * 100);

  const bars =
    weeklyData.length > 0
      ? weeklyData.map((item) => ({
          day: parseDayLabel(item.date),
          height: Math.max(Math.round((item.completedHabits / maxCount) * 100), 4),
        }))
      : DAY_LABELS.map((day) => ({ day, height: 4 }));

  return (
    <div className="bg-surfaceLow border border-white/5 rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Info */}
        <div className="flex-1">
          <p className="text-[10px] tracking-widest text-textSubtle mb-2">WEEKLY_CALIBRATION</p>
          <h3 className="font-display text-lg font-semibold mb-1">Weekly Calibration</h3>
          <p className="text-sm text-textSubtle">
            {weeklyData.length > 0
              ? `You are performing ${peakPct}% of your typical daily peak.`
              : 'No activity recorded this week yet.'}
          </p>
        </div>

        {/* Bar chart */}
        <div className="flex items-end gap-2 h-16">
          {bars.map((bar) => (
            <div key={bar.day} className="flex flex-col items-center gap-1">
              <div
                style={{ height: `${bar.height}%`, minHeight: '3px' }}
                className="w-5 bg-secondary/80 rounded-sm"
              />
              <span className="text-[9px] text-textSubtle">{bar.day}</span>
            </div>
          ))}
        </div>

        {/* Stat pill */}
        <div className="sm:text-right">
          <span className="text-xs tracking-widest text-secondary border border-secondary/30 px-3 py-1 rounded-full whitespace-nowrap">
            {totalCompletions} THIS WEEK
          </span>
        </div>
      </div>
    </div>
  );
}
