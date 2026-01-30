import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';

import { RootLayout } from '@/shared/ui/RootLayout';
import { Spinner } from '@/shared/ui/Spinner';
import PrivateRoute from './PrivateRoute';
import { GameSocketProvider } from '@/shared/api/socket/GameSocketProvider';

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const LoginCallbackPage = lazy(() => import('@/pages/LoginCallbackPage'));
const SignupPage = lazy(() => import('@/pages/SignupPage'));
const WelcomePage = lazy(() => import('@/pages/WelcomePage'));
const MainPage = lazy(() => import('@/pages/MainPage'));
const RoomPage = lazy(() => import('@/pages/RoomPage'));
const GameWidget = lazy(() => import('@/widgets/game/ui/GameWidget'));
const FriendPage = lazy(() => import('@/pages/FriendPage'));
const ShopPage = lazy(() => import('@/pages/ShopPage'));
const WardrobePage = lazy(() => import('@/pages/WardrobePage'));

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Spinner fixed size="xl" message="로딩중..." />}>
        <RootLayout />
      </Suspense>
    ),
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/auth/callback', element: <LoginCallbackPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/welcome', element: <WelcomePage /> },
      // 테스트용 외부 라우트
      { path: '/friend', element: <FriendPage /> },
      { path: '/shop', element: <ShopPage /> },
      { path: '/Wardrobe', element: <WardrobePage /> },
      { path: '/dev/gameWidget', element: <GameWidget /> },

      {
        element: <PrivateRoute />,
        children: [
          { path: '/', element: <MainPage /> },
          {
            path: '/rooms/:roomId',
            element: (
              <GameSocketProvider>
                <Outlet />
              </GameSocketProvider>
            ),
            children: [
              {
                index: true,
                element: <RoomPage />,
              },
              {
                path: 'shop',
                element: <ShopPage />,
              },
              {
                path: 'wardrobe',
                element: <WardrobePage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
