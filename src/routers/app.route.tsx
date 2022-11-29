import { createBrowserRouter, useParams } from 'react-router-dom';

import { Home, About, Search, Filter, Play } from '../pages';

function FilterWrapper() {
  const { slug } = useParams();

  return <Filter key={slug} />;
}

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
]);
