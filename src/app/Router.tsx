import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { RootLayout } from '@/shared/ui/RootLayout';
import { Spinner } from '@/shared/ui/Spinner';
import PrivateRoute from './PrivateRoute';

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const LoginCallbackPage = lazy(() => import('@/pages/LoginCallbackPage'));
const SignupPage = lazy(() => import('@/pages/SignupPage'));
const WelcomePage = lazy(() => import('@/pages/WelcomePage'));
const MainPage = lazy(() => import('@/pages/MainPage'));
const RoomPage = lazy(() => import('@/pages/RoomPage'));
// TODO: 페이지에서 대기실, 로딩, 게임 위젯을 교체하는 방식으로 추후 작성 예정
const GameWidget = lazy(() => import('@/widgets/game/ui/GameWidget'));
const FriendPage = lazy(() => import('@/pages/FriendPage'));
const ShopPage = lazy(() => import('@/pages/ShopPage'));

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Spinner fixed size="xl" message="로딩중..." />}>
        <RootLayout />
      </Suspense>
    ),
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/auth/callback',
        element: <LoginCallbackPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/welcome',
        element: <WelcomePage />,
      },
      {
        path: '/friend',
        element: <FriendPage />,
      },
      {
        path: '/shop',
        element: <ShopPage />,
      },
      {
        path: '/dev/gameWidget',
        element: <GameWidget />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/',
            element: <MainPage />,
          },
          {
            path: '/rooms/:roomId',
            element: <RoomPage />,
          },
          {
            path: '/dev/gameWidget',
            element: <GameWidget />,
          },
          // {
          //   path: '/dev/loading',
          //   element: <LoadingPage />,
          // },
        ],
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
