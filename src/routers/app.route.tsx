import { createBrowserRouter } from 'react-router-dom';

import { Home, About, Search } from '../pages';

export const AppRoute = createBrowserRouter([
  {
    path: '/browse',
    element: <Home />,
  },
  {
    path: '/about/:id',
    element: <About />,
  },
  {
    path: '/search',
    element: <Search />,
  },
]);
