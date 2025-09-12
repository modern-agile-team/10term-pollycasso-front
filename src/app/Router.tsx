import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';
import { lazy, Suspense } from 'react';
import Spinner from '@/shared/ui/Spinner';

const SamplePage = lazy(() => import('@/pages/SamplePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));

const RootLayout = () => <Outlet />;

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
        element: <SamplePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
