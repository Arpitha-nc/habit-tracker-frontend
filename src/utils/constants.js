export const XP_PER_COMPLETION = 10;
export const XP_PER_LEVEL = 100;

export const ACHIEVEMENT_DEFS = [
  {
    id: 1,
    icon: '🗓️',
    title: '7 Days of Code',
    desc: 'Completed all habits for 7 consecutive days',
    check: (d) => d.longestStreak >= 7,
    progress: (d) => Math.min(Math.round(((d.longestStreak ?? 0) / 7) * 100), 100),
  },
  {
    id: 2,
    icon: '🧬',
    title: 'DNA Master',
    desc: 'Accumulated 200 total habit completions',
    check: (d) => Math.floor((d.xp ?? 0) / XP_PER_COMPLETION) >= 200,
    progress: (d) => Math.min(Math.round((Math.floor((d.xp ?? 0) / XP_PER_COMPLETION) / 200) * 100), 100),
  },
  {
    id: 3,
    icon: '🌙',
    title: 'Deep Work',
    desc: 'Accumulated 500 XP through habit completions',
    check: (d) => (d.xp ?? 0) >= 500,
    progress: (d) => Math.min(Math.round(((d.xp ?? 0) / 500) * 100), 100),
  },
  {
    id: 4,
    icon: '🌐',
    title: 'Habit Builder',
    desc: 'Track 5 or more active habits simultaneously',
    check: (d) => (d.totalHabits ?? 0) >= 5,
    progress: (d) => Math.min(Math.round(((d.totalHabits ?? 0) / 5) * 100), 100),
  },
  {
    id: 5,
    icon: '⚡',
    title: 'Streak Master',
    desc: 'Maintain a streak of at least 14 consecutive days',
    check: (d) => (d.longestStreak ?? 0) >= 14,
    progress: (d) => Math.min(Math.round(((d.longestStreak ?? 0) / 14) * 100), 100),
  },
  {
    id: 6,
    icon: '🏆',
    title: 'Legendary Coder',
    desc: 'Maintain a 30-day streak across all habits',
    check: (d) => (d.longestStreak ?? 0) >= 30,
    progress: (d) => Math.min(Math.round(((d.longestStreak ?? 0) / 30) * 100), 100),
  },
];
