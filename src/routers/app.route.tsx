import { createBrowserRouter, useParams } from 'react-router-dom';

import { Home, About, Search, Filter } from '../pages';

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
    path: '/search',
    element: <Search />,
  },
  {
    path: '/filter/:slug',
    element: <FilterWrapper />,
  },
]);
