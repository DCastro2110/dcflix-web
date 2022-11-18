import { createBrowserRouter } from 'react-router-dom';

import { Home, About } from '../pages';

export const AppRoute = createBrowserRouter([
  {
    path: '/browse',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
]);
