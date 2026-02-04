import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';

import { RootLayout } from '@/shared/ui/RootLayout';
import { Spinner } from '@/shared/ui/Spinner';
import PrivateRoute from './PrivateRoute';
import { GameSocketProvider } from '@/shared/api/socket/GameSocketProvider';
import { ChatSocketProvider } from '@/shared/api/socket/ChatSocketProvider';

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
const RankingPage = lazy(() => import('@/pages/RankingPage'));
const MyPage = lazy(() => import('@/pages/MyPage'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));

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
      { path: '/friend', element: <FriendPage /> },
      { path: '/shop', element: <ShopPage /> },
      { path: '/Wardrobe', element: <WardrobePage /> },
      { path: '/dev/gameWidget', element: <GameWidget /> },
      { path: '/ranking', element: <RankingPage /> },
      { path: '/mypage', element: <MyPage /> },
      {
        path: '/admin',
        element: (
          <Suspense
            fallback={<Spinner fixed size="xl" message="관리자 로딩중..." />}
          >
            <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
              <AdminPage />
            </div>
          </Suspense>
        ),
      },

      {
        element: <PrivateRoute />,
        children: [
          {
            element: (
              <ChatSocketProvider>
                <Outlet />
              </ChatSocketProvider>
            ),
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
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
