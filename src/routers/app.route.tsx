import { createBrowserRouter } from 'react-router-dom';

import { Home } from '../pages';

export const AppRoute = createBrowserRouter([
  {
    path: '/browse',
    element: <Home />,
  },
]);
