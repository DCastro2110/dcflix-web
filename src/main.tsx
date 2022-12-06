import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';

import './styles/global.css';

import { AppRoutes } from './routers/app.routes';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={AppRoutes} />
  </QueryClientProvider>
);
