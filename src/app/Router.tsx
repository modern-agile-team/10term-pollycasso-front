import { createBrowserRouter, RouterProvider } from 'react-router';
import { lazy, Suspense } from 'react';
import { RootLayout, Spinner } from '@/shared/ui';

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const SignUpPage = lazy(() => import('@/pages/SignUpPage'));
const WelcomePage = lazy(() => import('@/pages/WelcomePage'));

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Spinner message="페이지를 불러오는 중..." />}>
        <RootLayout />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
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
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
