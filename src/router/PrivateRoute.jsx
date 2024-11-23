import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { LOGIN } from './paths/Paths';

const PrivateRoute = () => {

  const isAuthenticated = localStorage.getItem('accessToken') ? true : false;
  return isAuthenticated ? <Outlet /> : <Navigate to={LOGIN} />;
};

export default PrivateRoute;

