# Habit Tracker — Frontend

React 19 frontend for a gamified habit tracking app with a Terminal Kinetic UI aesthetic.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI framework |
| Vite | 8 | Build tool & dev server |
| React Router | v7 | Client-side routing |
| Zustand | v5 | Auth & toast state |
| TanStack Query | v5 | Server state (available, not yet wired) |
| Framer Motion | v12 | Animations |
| Tailwind CSS | v4 | Styling (Vite plugin) |
| Axios | latest | HTTP client |
| Lucide React | latest | Icons |

---

## Prerequisites

- Node.js 18+
- Backend running at `http://localhost:8081` (see `habittracker-backend/README.md`)

---

## Setup

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8081
```

---

## Scripts

```bash
npm run dev       # Start Vite dev server → http://localhost:5173
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

---

## Routes

| Path | Page | Auth Required |
|------|------|:---:|
| `/` | Daily Protocols | Yes |
| `/stats` | Weekly Velocity | Yes |
| `/profile` | Profile | Yes |
| `/login` | Login | No |
| `/register` | Register | No |

Protected routes redirect to `/login` when no JWT token is present in `localStorage`.

---

## Project Structure

```
src/
  app/              # App.jsx, router.jsx, providers.jsx
  components/
    habit/          # HabitCard, AddHabitModal, EditHabitModal
    layout/         # DashboardLayout, Navbar, SideBar, BottomNav
    stats/          # ActiveStreak, WeeklyCalibration
    ui/             # Button, Input, ProgressBar, MilestonePanel, ToastContainer
  hooks/            # useAuth, useHabits, useProgress, useDashboard, useProfile
  pages/
    auth/           # LoginPage, RegisterPage
    dashboard/      # DailyProtocolsPage, WeeklyStatsPage
    profile/        # ProfilePage
  services/         # api.jsx (axios instance), authService, habitService, progressService
  store/            # authStore (Zustand), toastStore (Zustand)
  styles/           # global.css
  utils/            # cn.js
```

---

## API Layer

All HTTP calls go through `src/services/api.jsx`:

- **Base URL** — read from `VITE_API_URL` env var
- **Auth** — JWT token auto-attached as `Authorization: Bearer <token>` via Axios request interceptor
- **Token storage** — `src/store/authStore.jsx` persists to `localStorage`

| Service | Endpoints covered |
|---------|------------------|
| `authService.jsx` | `POST /api/v1/auth/login`, `POST /api/v1/auth/register`, `GET /api/v1/auth/me` |
| `habitService.jsx` | Habit CRUD, `POST /{id}/complete`, `GET /dashboard` |
| `progressService.jsx` | `GET /progress/weekly`, `GET /progress/heatmap` |

---

## Design System — Terminal Kinetic

Developer terminal meets gaming HUD, neon cyberpunk aesthetic.

| Token | Value | Role |
|-------|-------|------|
| `primary` | `#81ecff` | Cyan — actions, labels |
| `secondary` | `#2ff801` | Lime green — success, streaks |
| `tertiary` | `#d277ff` | Purple — XP, accents |
| `surface` | `#0f141a` | Page background |
| `surfaceLow` | `#141a21` | Card background |
| `surfaceHigh` | `#20262f` | Input background |

**Typography**: Space Grotesk (display/headings) · Manrope (body)

Full design rules and component tokens: `CLAUDE_FRONTEND.md`

---

## Known Gaps

| Area | Gap |
|------|-----|
| UX | No loading states / skeleton screens during API calls |
| UX | No confirmation dialog before deleting a habit |
| UX | No empty state on Daily Protocols when habit list is empty |
| Routing | No 404 catch-all route |
| Auth | No 401 interceptor — expired tokens don't auto-redirect to `/login` |
| Components | `BottomNav.jsx` — file exists but is not implemented |
| Components | `MilestonePanel.jsx` — hardcoded static data |
| Layout | No mobile / responsive breakpoints |
| Auth | GitHub / GitLab OAuth buttons on LoginPage are decorative only |
