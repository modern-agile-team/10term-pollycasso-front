import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';

import { RootLayout } from '@/shared/ui/RootLayout';
import { Spinner } from '@/shared/ui/Spinner';
import PrivateRoute from './PrivateRoute';
import { WaitingSocketProvider } from '@/shared/api/socket/WaitingSocketProvider';

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const LoginCallbackPage = lazy(() => import('@/pages/LoginCallbackPage'));
const SignupPage = lazy(() => import('@/pages/SignupPage'));
const WelcomePage = lazy(() => import('@/pages/WelcomePage'));
const MainPage = lazy(() => import('@/pages/MainPage'));
const GamePage = lazy(() => import('@/pages/GamePage'));
const GameWidget = lazy(() => import('@/widgets/game/ui/GameWidget'));
const FriendPage = lazy(() => import('@/pages/FriendPage'));
const ShopPage = lazy(() => import('@/pages/ShopPage'));
const WardrobePage = lazy(() => import('@/pages/WardrobePage'));
const RankingPage = lazy(() => import('@/pages/RankingPage'));
const MyPage = lazy(() => import('@/pages/MyPage'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

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

      {
        element: <PrivateRoute />,
        children: [
          {
            element: <Outlet />,
            children: [
              { path: '/', element: <MainPage /> },
              { path: '/friend', element: <FriendPage /> },
              { path: '/shop', element: <ShopPage /> },
              { path: '/wardrobe', element: <WardrobePage /> },
              { path: '/ranking', element: <RankingPage /> },
              { path: '/mypage', element: <MyPage /> },
              { path: '/dev/gameWidget', element: <GameWidget /> },
              {
                path: '/rooms/:roomId',
                element: (
                  <WaitingSocketProvider>
                    <Outlet />
                  </WaitingSocketProvider>
                ),
                children: [
                  { index: true, element: <GamePage /> },
                  { path: 'shop', element: <ShopPage /> },
                  { path: 'wardrobe', element: <WardrobePage /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <Suspense
        fallback={<Spinner fixed size="xl" message="관리자 로딩중..." />}
      >
        <div className="bg-[#f0f0f0] min-h-screen">
          <AdminPage />
        </div>
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense
        fallback={<Spinner fixed size="xl" message="길을 찾는 중..." />}
      >
        <div className="bg-white min-h-screen">
          <NotFoundPage />
        </div>
      </Suspense>
    ),
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
