import { lazy, Suspense, type LazyExoticComponent } from 'react';
import {
  type RouteObject,
  createBrowserRouter,
  redirect,
  useRouteError,
} from 'react-router-dom';

import Layout from '../components/Layout';
import { refreshSession } from '../features/auth/session';
import { sessionRestored } from '../features/auth/authSlice';
import { store } from './store';
import { backendEnabled } from '../features/backend';

const DashboardPage = lazy(() => import('../pages/dashboard/Dashboard'));
const ButtonsPage = lazy(() => import('../pages/buttons/Buttons'));
const ChartsPage = lazy(() => import('../pages/charts/Charts'));
const MapsPage = lazy(() => import('../pages/google/Google'));
const IconsPage = lazy(() => import('../pages/icons/Icons'));
const NotificationsPage = lazy(() => import('../pages/notifications/Notifications'));
const TablesPage = lazy(() => import('../pages/tables/Tables'));
const TypographyPage = lazy(() => import('../pages/typography/Typography'));
const LoginPage = lazy(() => import('../pages/login/Login'));
const RegisterPage = lazy(() => import('../pages/register/Register'));
const ProfilePage = lazy(() => import('../pages/profile/Profile'));
const PrivacyPage = lazy(() => import('../pages/privacy/Privacy'));
const PostListPage = lazy(() => import('../pages/posts/list/PostList'));
const PostNewPage = lazy(() => import('../pages/posts/new/PostNew'));
const NotFoundPage = lazy(() => import('../pages/notFound/NotFound'));
const TermsPage = lazy(() => import('../pages/terms/Terms'));

const hasActiveSession = async () => {
  const session = await refreshSession();
  store.dispatch(sessionRestored(session));
  return session !== null;
};

const routeLoader =
  (predicate: () => Promise<boolean>, targetPath: string) =>
  async () => {
    if (await predicate()) {
      return redirect(targetPath);
    }

    return null;
  };

const rootRedirectLoader = async () => redirect(await hasActiveSession() ? '/app/main' : '/login');

const PageFallback = () => (
  <div className="d-flex min-vh-100 align-items-center justify-content-center">
    <div className="text-center">
      <div className="spinner-border text-danger" role="status" />
      <p className="mt-3 mb-0 text-muted">Loading dashboard module...</p>
    </div>
  </div>
);

const renderLazyPage = (Page: LazyExoticComponent<() => React.JSX.Element>) => (
  <Suspense fallback={<PageFallback />}>
    <Page />
  </Suspense>
);

const RouteErrorBoundary = () => {
  const routeError = useRouteError();
  const message =
    routeError instanceof Error ? routeError.message : 'Unexpected routing error';

  return (
    <div className="d-flex min-vh-100 align-items-center justify-content-center p-4">
      <div className="text-center">
        <h1 className="display-6 mb-3">Something broke</h1>
        <p className="text-muted mb-4">{message}</p>
        <a className="btn btn-danger" href={`${import.meta.env.BASE_URL}app/main`}>
          Go back to the dashboard
        </a>
      </div>
    </div>
  );
};

export const routes: RouteObject[] = [
  {
    path: '/',
    loader: rootRedirectLoader,
    element: <PageFallback />,
    HydrateFallback: PageFallback,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/login',
    HydrateFallback: PageFallback,
    errorElement: <RouteErrorBoundary />,
    loader: routeLoader(hasActiveSession, '/app/main'),
    element: renderLazyPage(LoginPage),
  },
  {
    path: '/register',
    HydrateFallback: PageFallback,
    errorElement: <RouteErrorBoundary />,
    loader: routeLoader(hasActiveSession, '/app/main'),
    element: renderLazyPage(RegisterPage),
  },
  {
    path: '/app',
    HydrateFallback: PageFallback,
    loader: routeLoader(async () => !await hasActiveSession(), '/login'),
    element: <Layout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, loader: async () => redirect('/app/main') },
      { path: 'main', element: renderLazyPage(DashboardPage) },
      { path: 'typography', element: renderLazyPage(TypographyPage) },
      { path: 'tables', element: renderLazyPage(TablesPage) },
      { path: 'notifications', element: renderLazyPage(NotificationsPage) },
      { path: 'components/buttons', element: renderLazyPage(ButtonsPage) },
      { path: 'components/charts', element: renderLazyPage(ChartsPage) },
      { path: 'components/icons', element: renderLazyPage(IconsPage) },
      { path: 'components/maps', element: renderLazyPage(MapsPage) },
      { path: 'posts', element: renderLazyPage(PostListPage) },
      { path: 'posts/new', loader: () => backendEnabled ? redirect('/app/posts') : null, element: renderLazyPage(PostNewPage) },
      { path: 'profile', element: renderLazyPage(ProfilePage) },
      { path: 'privacy', element: renderLazyPage(PrivacyPage) },
      { path: 'tos', element: renderLazyPage(TermsPage) },
      { path: '*', element: renderLazyPage(NotFoundPage) },
    ],
  },
  {
    path: '*',
    element: renderLazyPage(NotFoundPage),
  },
];

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});
