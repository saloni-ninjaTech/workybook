import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

function PrivateRoutes() {
  const location = useLocation();
  const user = localStorage.getItem('user');

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to='/sign-in'
      state={{
        from: location
      }}
      replace
    />
  );
}

export default PrivateRoutes;
