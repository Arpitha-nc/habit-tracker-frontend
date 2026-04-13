import { createBrowserRouter, redirect } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import DashboardLayout from '../components/layout/DashboardLayout';
import DailyProtocolsPage from '../pages/dashboard/DailyProtocolsPage';
import WeeklyStatsPage from '../pages/dashboard/WeeklyStatsPage';
import ProfilePage from '../pages/profile/ProfilePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';

// Runs before rendering — throws a redirect if no token exists.
// Uses getState() (not a hook) so it's safe to call outside React.
function requireAuth() {
  const token = useAuthStore.getState().token;
  if (!token) throw redirect('/login');
  return null;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    loader: requireAuth,
    children: [
      { index: true, element: <DailyProtocolsPage /> },
      { path: 'stats', element: <WeeklyStatsPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
