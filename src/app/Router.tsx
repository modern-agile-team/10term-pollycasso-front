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
const GameWidget = lazy(() => import('@/widgets/game-drawing/ui/GameWidget'));
const LoadingPage = lazy(() => import('@/widgets/game-loading'));
const DrawingWidget = lazy(
  () => import('@/widgets/game-drawing/ui/DrawingWidget'),
);

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
        path: '/dev/drawingWidget',
        element: <DrawingWidget />,
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
          {
            path: '/dev/loading',
            element: <LoadingPage />,
          },
        ],
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
