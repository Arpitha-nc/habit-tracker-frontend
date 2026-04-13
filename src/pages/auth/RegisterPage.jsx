import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { registerUser } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import { useToastStore } from '../../store/toastStore';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function RegisterPage() {
  const navigate = useNavigate();
  const setToken = useAuthStore((s) => s.setToken);
  const addToast = useToastStore((s) => s.addToast);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await registerUser(form);
      setToken(data.token);
      addToast('ARCHITECT_INITIALIZED: Welcome to HABIT_OS', 'success');
      navigate('/');
    } catch (err) {
      const backendMessage =
        err.response?.data?.message || 'REGISTRATION_FAILED';

      if (
        backendMessage.includes('Invalid request payload') ||
        err.response?.status === 400
      ) {
        addToast('PROTOCOL_VIOLATION: PASSWORD_MIN_LENGTH_8', 'error');
      } else {
        addToast(backendMessage.toUpperCase(), 'error');
      }
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
          <Link to="/login" className="text-primary">
            AUTHENTICATE
          </Link>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-1">
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="relative hud-frame w-[460px] bg-surfaceLow/90 backdrop-blur-xl p-10 rounded-xl border border-white/5 shadow-2xl">
            <div className="text-xs tracking-widest text-textSubtle mb-5">
              <span className="text-secondary mr-2 animate-pulse">●</span>
              SYSTEM STATUS: REGISTRATION_OPEN
            </div>

            <h1 className="font-display text-[38px] font-semibold tracking-wide mb-2 leading-none">
              CREATE_<span className="text-primary">ARCHITECT</span>
            </h1>
            <p className="text-sm text-textSubtle mb-8">
              Initialize your identity in the habit protocol network.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="ARCHITECT_ID"
                name="name"
                icon={User}
                placeholder="your_handle"
                value={form.name}
                onChange={handleChange}
              />
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

              <Button type="submit" className="w-full mt-2">
                INITIALIZE_ARCHITECT →
              </Button>
            </form>

            <div className="text-sm text-textSubtle mt-8 text-center">
              Existing Architect?{' '}
              <Link to="/login" className="text-secondary hover:underline">
                Authenticate
              </Link>
            </div>
          </div>
        </div>

        {/* Right data panel */}
        <div className="w-[300px] border-l border-white/5 p-10 flex flex-col justify-center gap-8">
          <div className="space-y-2">
            <div className="h-[2px] bg-white/10 w-full" />
            <div className="h-[2px] bg-white/10 w-[40%]" />
          </div>
          <div>
            <p className="text-[10px] tracking-widest text-textSubtle mb-2">
              NEW_NODE_PROTOCOL
            </p>
            <p className="text-xs text-primary">SLOT_AVAILABLE: TRUE</p>
            <p className="text-xs text-primary mt-1">NODE_CAPACITY: 94%</p>
          </div>
          <div className="text-xs space-y-2">
            <p className="tracking-widest text-textSubtle mb-3">
              REGISTRATION_META
            </p>
            <p className="text-primary">ARCH_CLASS: INITIATE</p>
            <p className="text-primary">PROTOCOL_VER: 4.2</p>
            <p className="text-primary">REGION: GLOBAL</p>
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
        </div>
        <div className="flex gap-6">
          <span className="cursor-pointer hover:text-textMain">
            PRIVACY_SHIELD
          </span>
          <span className="cursor-pointer hover:text-textMain">
            LICENSE_AGREEMENT
          </span>
        </div>
      </div>
    </div>
  );
}
