import { create } from 'zustand';

function readToken() {
  const raw = localStorage.getItem('token');
  // Guard against "null" / "undefined" strings written by bad setToken calls
  if (!raw || raw === 'null' || raw === 'undefined') return null;
  return raw;
}

export const useAuthStore = create((set) => ({
  token: readToken(),

  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({ token: token || null });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null });
  },
}));
