import React from 'react'

// ProtectedRoute.tsx

import { Route, Navigate, RouteProps } from 'react-router-dom';

type ProtectedRouteProps = {
    component: React.ComponentType<any>;
  } & RouteProps;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = token ? true : false;

  return (
    <Route
      {...rest}
      element={token ? <Component /> : <Navigate to="/login" replace={true} />}
    />
  );
};




export default ProtectedRoute
