import { useAuthStore } from '../store/authStore';

export default function useAuth() {
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);
  return { isAuthenticated: !!token, logout };
}
