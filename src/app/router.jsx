import { createBrowserRouter } from 'react-router-dom';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import DailyProtocolsPage from '../pages/dashboard/DailyProtocolsPage';
import WeeklyStatsPage from '../pages/dashboard/WeeklyStatsPage';
import ProfilePage from '../pages/profile/ProfilePage';
import DashboardLayout from '../components/layout/DashboardLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <DailyProtocolsPage /> },
      { path: '/stats', element: <WeeklyStatsPage /> },
      { path: '/profile', element: <ProfilePage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
]);
