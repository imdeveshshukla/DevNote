import { Route, Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const isAuthenticated = history;
  const location = useLocation();

  return (
    <Route {...rest}>
      {isAuthenticated ? (
        <Component />
      ) : (
        <Navigate to="/login" state={{ from: location }} />
      )}
    </Route>
  );
}

