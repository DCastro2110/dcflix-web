import { ReactElement, useContext } from 'react';
import { Routes, Route, useParams, Navigate } from 'react-router-dom';

import { AuthContextProvider, AuthContext } from '../contexts/AuthContext';

import { useAuth } from '@/hooks/useAuth';

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

import { Loading } from '@/components';

interface IPrivateRouteProps {
  children: ReactElement;
}

function FilterWrapper() {
  const { slug } = useParams();

  return <Filter key={slug} />;
}

function PrivateRoute({ children }: IPrivateRouteProps) {
  const { user } = useContext(AuthContext);
  const { isLoading } = useAuth();

  if (isLoading && !user.id) {
    return <Loading />;
  }

  if (user.id) {
    return children;
  }

  return <Navigate to="/" />;
}

export function AppRoutes() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/signin"
          element={<SignIn />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/browse"
          element={
            <PrivateRoute>
              <Browse />
            </PrivateRoute>
          }
        />
        <Route
          path="about/:id"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        <Route
          path="play/:id"
          element={
            <PrivateRoute>
              <Play />
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        />
        <Route
          path="/filter/:slug"
          element={
            <PrivateRoute>
              <FilterWrapper />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to="browse" />}
        />
      </Routes>
    </AuthContextProvider>
  );
}
