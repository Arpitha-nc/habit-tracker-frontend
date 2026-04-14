# Habit Tracker Frontend

React 19 + Vite frontend for a gamified habit tracking app.

Full-stack: this repo is the frontend; backend is Spring Boot (Java) in a sibling repo.

See also: `CLAUDE_FRONTEND.md` (UI/design rules), `AI_RULES.md` (coding standards).

---

## Commands

```bash
npm run dev       # Vite dev server (http://localhost:5173)
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

---

## Tech Stack

| Tool | Version |
|---|---|
| React | 19 |
| Vite | 8 |
| React Router | v7 (`createBrowserRouter`) |
| Zustand | v5 |
| TanStack Query | v5 |
| Framer Motion | v12 |
| Tailwind CSS | v4 (Vite plugin) |
| Axios | latest |
| Lucide React | latest |

---

## Project Structure

```
src/
  app/           # App.jsx, router.jsx, providers.jsx
  components/
    habit/       # HabitCard, AddHabitModal
    layout/      # DashboardLayout, Navbar, SideBar, BottomNav
    stats/       # ActiveStreak, WeeklyCalibration
    ui/          # Button, Input, Card, ProgressBar, MilestonePanel
  hooks/         # useAuth, useHabits, useProgress
  pages/
    auth/        # LoginPage, RegisterPage (RegisterPage commented out in router)
    dashboard/   # DailyProtocolsPage, WeeklyStatsPage (WeeklyStats commented out)
    profile/     # ProfilePage (commented out)
  services/      # api.jsx (axios instance), authService, habitService, progressService
  store/         # authStore.jsx (Zustand)
  styles/        # global.css
  utils/         # cn.js (clsx helper), constants.js
```

---

## Active Routes

- `/` — DailyProtocolsPage (inside DashboardLayout)
- `/login` — LoginPage

Routes for `/stats`, `/profile`, `/register` are implemented but commented out in `src/app/router.jsx`.

---

## API / Auth

- Base URL from `VITE_API_URL` env var (`src/services/api.jsx`)
- JWT token stored in `localStorage` under key `"token"`; auto-attached as `Authorization: Bearer <token>` via axios interceptor
- Auth state via `useAuthStore` (Zustand) — `token`, `setToken()`, `logout()`
- Pages use hooks; hooks use services; services use `api.jsx` — do not call services directly from pages

---

## Design Concept

**Terminal Kinetic UI** — neon cyberpunk dashboard aesthetic.

See `CLAUDE_FRONTEND.md` for the full design system (tokens, typography, component rules).
