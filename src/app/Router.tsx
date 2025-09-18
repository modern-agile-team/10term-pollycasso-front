import { createBrowserRouter, RouterProvider } from 'react-router';
import { lazy, Suspense } from 'react';
import Spinner from '@/shared/ui/Spinner';
import RootLayout from '@/shared/ui/RootLayout';

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
