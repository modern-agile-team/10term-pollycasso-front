import { createBrowserRouter, RouterProvider } from 'react-router';
import { lazy, Suspense } from 'react';
import { RootLayout, Spinner } from '@/shared/ui';
import PrivateRoute from './PrivateRoute';

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const SignUpPage = lazy(() => import('@/pages/SignUpPage'));
const WelcomePage = lazy(() => import('@/pages/WelcomePage'));
const MainPage = lazy(() => import('@/pages/MainPage'));
const RoomPage = lazy(() => import('@/pages/RoomPage'));

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Spinner message="로딩중..." />}>
        <RootLayout />
      </Suspense>
    ),
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: '/welcome',
        element: <WelcomePage />,
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
        ],
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
