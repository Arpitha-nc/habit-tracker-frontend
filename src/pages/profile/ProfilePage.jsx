import { useState } from 'react';
import { User, Pencil, X } from 'lucide-react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import ProgressBar from '../../components/ui/ProgressBar';
import useAuth from '../../hooks/useAuth';
import useProfile from '../../hooks/useProfile';
import useProgress from '../../hooks/useProgress';
import { updateProfile } from '../../services/authService';
import { useToastStore } from '../../store/toastStore';

const legendaryAchievements = [
  { icon: '🏆', title: 'PX King', desc: 'Ranked in the top 1% of all architects globally' },
  { icon: '🐛', title: 'Bug Hunter', desc: 'Identified and resolved critical security vulnerabilities' },
  { icon: '🌙', title: 'Night Owl', desc: 'Completed 50+ sessions after midnight' },
  { icon: '📊', title: 'Data Deity', desc: 'Analyzed and optimized 100+ performance metrics' },
];

const RANK_TITLES = [
  { minLevel: 31, title: 'LEAD PROTOCOL ARCHITECT' },
  { minLevel: 21, title: 'SENIOR ARCHITECT' },
  { minLevel: 11, title: 'PROTOCOL ENGINEER' },
  { minLevel: 6, title: 'SYSTEM ANALYST' },
  { minLevel: 1, title: 'PROTOCOL INITIATE' },
];

function getRankTitle(level) {
  return RANK_TITLES.find((r) => level >= r.minLevel)?.title ?? 'PROTOCOL INITIATE';
}

const heatColor = (level) => {
  if (level >= 3) return 'bg-secondary';
  if (level === 2) return 'bg-secondary/60';
  if (level === 1) return 'bg-secondary/25';
  return 'bg-white/5';
};

export default function ProfilePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { dashboard } = useOutletContext();
  const { profile, loading: profileLoading, reload: reloadProfile } = useProfile();
  const { weeklyData, heatmap } = useProgress();
  const addToast = useToastStore((s) => s.addToast);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', currentPassword: '', newPassword: '' });
  const [saving, setSaving] = useState(false);

  const openEdit = () => {
    setEditForm({ name: profile?.name ?? '', currentPassword: '', newPassword: '' });
    setEditing(true);
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { name: editForm.name };
      if (editForm.newPassword) {
        payload.currentPassword = editForm.currentPassword;
        payload.newPassword = editForm.newPassword;
      }
      await updateProfile(payload);
      addToast('PROFILE_UPDATED: Changes saved.', 'success');
      setEditing(false);
      reloadProfile();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update profile.';
      addToast(msg.toUpperCase(), 'error');
    } finally {
      setSaving(false);
    }
  };

  const name = profile?.name ?? '—';
  const xp = profile?.xp ?? 0;
  const level = profile?.level ?? 1;
  const xpInLevel = xp % 100;
  const xpToNextLevel = 100 - xpInLevel;
  const longestStreak = dashboard?.longestStreak ?? 0;
  const weeklyXp = weeklyData.reduce((sum, d) => sum + d.completedHabits * 10, 0);
  const totalHabits = dashboard?.totalHabits ?? 0;
  const weeklyCompletionRate =
    totalHabits > 0 && weeklyData.length > 0
      ? Math.round(
          (weeklyData.reduce((sum, d) => sum + d.completedHabits, 0) /
            (totalHabits * weeklyData.length)) *
            100,
        )
      : 0;

  // Reshape flat heatmap array into columns of 7 (weeks)
  const heatmapWeeks = [];
  for (let i = 0; i < heatmap.length; i += 7) {
    heatmapWeeks.push(heatmap.slice(i, i + 7));
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      {/* User card */}
      <div className="bg-surfaceLow border border-white/5 rounded-xl p-6 flex items-start gap-6 mb-6">
        <div className="w-16 h-16 rounded-xl bg-surfaceHigh border border-white/10 flex items-center justify-center shrink-0">
          <User size={28} className="text-textSubtle" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] tracking-widest text-textSubtle mb-1">
                {getRankTitle(level)}
              </p>
              <div className="flex items-center gap-3">
                <h1 className="font-display text-2xl font-bold truncate">{name}</h1>
                <button
                  onClick={openEdit}
                  title="Edit profile"
                  className="text-textSubtle hover:text-primary transition shrink-0"
                >
                  <Pencil size={14} />
                </button>
              </div>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="text-[10px] tracking-widest border border-primary/30 text-primary px-2 py-0.5 rounded">
                  LVL {level}
                </span>
                <span className="text-xs text-textSubtle truncate">{profile?.email ?? ''}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-display text-3xl font-bold text-primary">{xp.toLocaleString()}</p>
              <p className="text-[10px] tracking-widest text-textSubtle">TOTAL XP</p>
            </div>
          </div>

          <div className="mt-4">
            <ProgressBar value={xpInLevel} showLabel={false} />
            <p className="text-[10px] text-textSubtle mt-1">{xpToNextLevel} XP to Level {level + 1}</p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-surfaceLow border border-white/5 rounded-xl px-5 py-4">
          <p className="text-[10px] tracking-widest text-textSubtle mb-1">ACTIVE_STREAK</p>
          <p className="font-display text-3xl font-bold text-tertiary">{longestStreak}</p>
          <p className="text-xs text-textSubtle">days</p>
        </div>
        <div className="bg-surfaceLow border border-white/5 rounded-xl px-5 py-4">
          <p className="text-[10px] tracking-widest text-textSubtle mb-1">WEEKLY_XP</p>
          <p className="font-display text-3xl font-bold text-secondary">{weeklyXp.toLocaleString()}</p>
          <p className="text-xs text-textSubtle">this week</p>
        </div>
        <div className="bg-surfaceLow border border-white/5 rounded-xl px-5 py-4">
          <p className="text-[10px] tracking-widest text-textSubtle mb-1">COMPLETION_RATE</p>
          <p className="font-display text-3xl font-bold text-primary">{weeklyCompletionRate}%</p>
          <p className="text-xs text-textSubtle">this week</p>
        </div>
      </div>

      {/* Streak heatmap */}
      <div className="bg-surfaceLow border border-white/5 rounded-xl p-6 mb-6">
        <p className="text-[10px] tracking-widest text-textSubtle mb-4">STREAK_HISTORY</p>
        <div className="flex gap-1 overflow-x-auto pb-1">
          {heatmapWeeks.length > 0 ? (
            heatmapWeeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1 shrink-0">
                {week.map((item, di) => (
                  <div
                    key={di}
                    className={`w-3 h-3 rounded-sm ${heatColor(Math.min(item.count, 3))}`}
                    title={`${item.date}: ${item.count} completion${item.count !== 1 ? 's' : ''}`}
                  />
                ))}
              </div>
            ))
          ) : (
            Array.from({ length: 52 }, (_, wi) => (
              <div key={wi} className="flex flex-col gap-1 shrink-0">
                {Array.from({ length: 7 }, (_, di) => (
                  <div key={di} className="w-3 h-3 rounded-sm bg-white/5" />
                ))}
              </div>
            ))
          )}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[10px] text-textSubtle">Less</span>
          {[0, 1, 2, 3].map((l) => (
            <div key={l} className={`w-3 h-3 rounded-sm ${heatColor(l)}`} />
          ))}
          <span className="text-[10px] text-textSubtle">More</span>
        </div>
      </div>

      {/* Legendary achievements */}
      <div>
        <p className="text-[10px] tracking-widest text-textSubtle mb-4">LEGENDARY_ACHIEVEMENTS</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {legendaryAchievements.map((a) => (
            <div
              key={a.title}
              className="bg-surfaceLow border border-white/5 rounded-xl p-5 hover:border-primary/20 transition"
            >
              <span className="text-3xl block mb-3">{a.icon}</span>
              <p className="font-semibold text-sm mb-1">{a.title}</p>
              <p className="text-[11px] text-textSubtle leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleLogout}
          className="text-xs tracking-widest text-textSubtle border border-white/10 px-5 py-2 hover:border-red-400/50 hover:text-red-400 transition"
        >
          TERMINATE_SESSION
        </button>
      </div>

      {/* Edit Profile Modal */}
      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setEditing(false)}
        >
          <div className="relative hud-frame w-full max-w-[440px] mx-4 bg-surfaceLow border border-white/10 rounded-xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] tracking-widest text-textSubtle mb-1">MODIFY_ARCHITECT</p>
                <h2 className="font-display text-2xl font-semibold">
                  EDIT_<span className="text-primary">PROFILE</span>
                </h2>
              </div>
              <button
                onClick={() => setEditing(false)}
                className="w-8 h-8 flex items-center justify-center border border-white/10 text-textSubtle hover:border-primary/50 hover:text-primary transition rounded"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleEditSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] tracking-[0.3em] text-primary/90">ARCHITECT_ID</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="your_handle"
                  required
                  className="w-full bg-surfaceHigh border border-primary/60 px-4 py-2.5 text-sm text-textMain placeholder:text-textSubtle outline-none rounded-sm focus:border-primary focus:shadow-[0_0_12px_rgba(129,236,255,0.3)] transition"
                />
              </div>

              <div className="pt-2 border-t border-white/5">
                <p className="text-[10px] tracking-widest text-textSubtle mb-3">CHANGE_PASSWORD (optional)</p>
                <div className="space-y-3">
                  <input
                    type="password"
                    value={editForm.currentPassword}
                    onChange={(e) => setEditForm({ ...editForm, currentPassword: e.target.value })}
                    placeholder="Current password"
                    className="w-full bg-surfaceHigh border border-white/10 px-4 py-2.5 text-sm text-textMain placeholder:text-textSubtle outline-none rounded-sm focus:border-primary/60 transition"
                  />
                  <input
                    type="password"
                    value={editForm.newPassword}
                    onChange={(e) => setEditForm({ ...editForm, newPassword: e.target.value })}
                    placeholder="New password (min 8 chars)"
                    className="w-full bg-surfaceHigh border border-white/10 px-4 py-2.5 text-sm text-textMain placeholder:text-textSubtle outline-none rounded-sm focus:border-primary/60 transition"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex-1 py-3 text-xs tracking-widest border border-white/10 text-textSubtle hover:border-white/30 transition"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 text-xs tracking-widest bg-primary/10 border border-primary/50 text-primary hover:bg-primary/20 transition disabled:opacity-50"
                >
                  {saving ? 'SAVING...' : 'SAVE_CHANGES →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
