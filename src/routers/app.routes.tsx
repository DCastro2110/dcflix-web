import { createBrowserRouter, useParams, Navigate } from 'react-router-dom';

import {
  Home,
  Browse,
  About,
  Search,
  Filter,
  Play,
  SignIn,
  SignUp,
} from '../pages';

function FilterWrapper() {
  const { slug } = useParams();

  return <Filter key={slug} />;
}

export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/browse',
    element: <Browse />,
  },
  {
    path: '/about/:id',
    element: <About />,
  },
  {
    path: '/play/:id',
    element: <Play />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/filter/:slug',
    element: <FilterWrapper />,
  },
  {
    path: '*',
    element: <Navigate to="browse" />,
  },
]);
