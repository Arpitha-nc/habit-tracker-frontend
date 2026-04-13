import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { loginUser } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import { useToastStore } from '../../store/toastStore';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function LoginPage() {
  const navigate = useNavigate();
  const setToken = useAuthStore((s) => s.setToken);
  const addToast = useToastStore((s) => s.addToast);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(form);
      setToken(data.token);

      addToast('ACCESS_GRANTED: Session synchronized', 'success');
      navigate('/');
    } catch (err) {
      // 3. Extract message from Backend (e.g., "User not found")
      const message =
        err.response?.data?.message || 'AUTH_FAILURE: Unknown error';

      // Use your existing toast system
      addToast(message.toUpperCase(), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-textMain flex flex-col">
      <div className="scanline" />

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-12 py-4 bg-surface/80 backdrop-blur border-b border-white/5">
        <div className="font-display font-semibold text-primary text-xl tracking-wide">
          HABIT_OS
        </div>
        <div className="flex gap-10 text-sm tracking-widest text-textSubtle">
          <span className="cursor-pointer hover:text-textMain transition">
            LOGS
          </span>
          <span className="cursor-pointer hover:text-textMain transition">
            DOCUMENTATION
          </span>
          <span className="text-primary">AUTHENTICATE</span>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-1">
        {/* Form side */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="relative hud-frame w-115 bg-surfaceLow/90 backdrop-blur-xl p-10 rounded-xl border border-white/5 shadow-2xl">
            <div className="text-xs tracking-widest text-textSubtle mb-5">
              <span className="text-secondary mr-2 animate-pulse">●</span>
              SYSTEM STATUS: AWAITING_AUTH
            </div>

            <h1 className="font-display text-[42px] font-semibold tracking-wide mb-2 leading-none">
              ACCESS_<span className="text-primary">SYSTEM</span>
            </h1>
            <p className="text-sm text-textSubtle mb-8">
              Enter credentials to synchronize habit protocols.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                label="IDENTITY_STRING"
                name="email"
                icon={Mail}
                placeholder="user_email@habit_os"
                value={form.email}
                onChange={handleChange}
              />
              <Input
                label="CRYPTOGRAPHIC_KEY"
                name="password"
                type="password"
                icon={Lock}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'SYNCHRONIZING...' : 'INITIALIZE_SESSION →'}
              </Button>

              <div className="text-center text-[10px] tracking-[0.4em] text-textSubtle">
                AUTH_NODE_01
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  disabled
                  title="Coming soon"
                  className="flex items-center justify-center gap-2 py-3 text-xs tracking-widest border border-white/5 bg-surfaceHigh/50 text-textSubtle/40 cursor-not-allowed"
                >
                  ⊕ GITHUB
                </button>
                <button
                  type="button"
                  disabled
                  title="Coming soon"
                  className="flex items-center justify-center gap-2 py-3 text-xs tracking-widest border border-white/5 bg-surfaceHigh/50 text-textSubtle/40 cursor-not-allowed"
                >
                  {'</>'} GITLAB
                </button>
              </div>
            </form>

            <div className="text-sm text-textSubtle mt-8 text-center">
              New Architect?{' '}
              <span
                className="text-secondary cursor-pointer hover:underline"
                onClick={() => navigate('/register')}
              >
                Create Account
              </span>
            </div>
          </div>
        </div>

        {/* Right data panel */}
        <div className="w-75 border-l border-white/5 p-10 flex flex-col justify-center gap-8">
          <div className="space-y-2">
            <div className="h-0.5 bg-white/10 w-full" />
            <div className="h-0.5 bg-white/10 w-[70%]" />
          </div>

          <div>
            <p className="text-[10px] tracking-widest text-textSubtle mb-3">
              EFFICIENCY_RATE
            </p>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-1.25 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full w-[98%]" />
              </div>
              <span className="text-secondary font-semibold text-sm">98%</span>
            </div>
          </div>

          <div className="text-xs space-y-2">
            <p className="tracking-widest text-textSubtle mb-3">
              SESSION_METADATA
            </p>
            <p className="text-primary">0x882_AUTH_PENDING</p>
            <p className="text-primary">UID:772-AD-91</p>
            <p className="text-primary">KERNEL:SYNTH_CORE</p>
          </div>
        </div>
      </div>

      {/* BOTTOM STATUS BAR */}
      <div className="flex justify-between items-center px-8 py-2 border-t border-white/5 text-[10px] tracking-widest text-textSubtle">
        <div className="flex items-center gap-2">
          <span className="text-secondary animate-pulse">●</span>
          GLOBAL_PROTOCOL_ACTIVE
        </div>
        <div className="flex gap-8">
          <span>OS_VERSION: 4.2.0-STABLE</span>
          <span>SECURE_LAYER: TLS_v1.8_ENCRYPTED</span>
          <span>LATENCY: 14ms</span>
        </div>
        <div className="flex gap-6">
          <span className="cursor-pointer hover:text-textMain transition">
            PRIVACY_SHIELD
          </span>
          <span className="cursor-pointer hover:text-textMain transition">
            LICENSE_AGREEMENT
          </span>
        </div>
      </div>
    </div>
  );
}
