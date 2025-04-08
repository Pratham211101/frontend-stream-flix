import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayoutPage = () => {
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
};

export default AuthLayoutPage;
