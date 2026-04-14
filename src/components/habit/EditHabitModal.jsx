import { useState } from 'react';
import { X } from 'lucide-react';
import { updateHabit } from '../../services/habitService';
import Button from '../ui/Button';
import Input from '../ui/Input';

const ICONS = ['🧭', '💻', '📄', '🏋️', '📚', '🎯', '🧠', '⚡', '🔥', '🌱'];

export default function EditHabitModal({ habit, onClose, onUpdated }) {
  const currentIcon = localStorage.getItem(`habit-icon-${habit.id}`) ?? '🎯';
  const [form, setForm] = useState({ name: habit.title, description: habit.description ?? '', icon: currentIcon });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setLoading(true);
    setError('');
    try {
      await updateHabit(habit.id, { name: form.name, description: form.description });
      localStorage.setItem(`habit-icon-${habit.id}`, form.icon);
      onUpdated?.();
      onClose();
    } catch {
      setError('Failed to update habit. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative hud-frame w-full max-w-[480px] mx-4 bg-surfaceLow border border-white/10 rounded-xl p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[10px] tracking-widest text-textSubtle mb-1">MODIFY_PROTOCOL</p>
            <h2 className="font-display text-2xl font-semibold">
              EDIT_<span className="text-primary">HABIT</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border border-white/10 text-textSubtle hover:border-primary/50 hover:text-primary transition rounded"
          >
            <X size={16} />
          </button>
        </div>

        {error && (
          <div className="mb-4 text-xs text-red-400 border border-red-400/20 bg-red-400/5 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="PROTOCOL_NAME"
            name="name"
            placeholder="e.g. Clean Architecture"
            value={form.name}
            onChange={handleChange}
          />

          <div className="space-y-2">
            <label className="text-[10px] tracking-[0.3em] text-primary/90">DESCRIPTION</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="What does this habit involve?"
              rows={3}
              className="w-full bg-surfaceHigh border border-primary/60 px-4 py-3 text-sm text-textMain placeholder:text-textSubtle outline-none rounded-sm resize-none focus:border-primary focus:shadow-[0_0_12px_rgba(129,236,255,0.3)] transition"
            />
          </div>

          {/* Icon picker */}
          <div className="space-y-2">
            <label className="text-[10px] tracking-[0.3em] text-primary/90">PROTOCOL_ICON</label>
            <div className="flex gap-2 flex-wrap">
              {ICONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setForm({ ...form, icon })}
                  className={`w-9 h-9 rounded-md text-lg flex items-center justify-center transition ${
                    form.icon === icon
                      ? 'bg-primary/20 border border-primary'
                      : 'bg-surfaceHigh border border-white/10 hover:border-white/30'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-xs tracking-widest border border-white/10 text-textSubtle hover:border-white/30 transition"
            >
              CANCEL
            </button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'UPDATING...' : 'UPDATE_PROTOCOL →'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
