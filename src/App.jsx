
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Navbar} from './components/index';




const App = () => {
  const authStatus = useSelector((state) => state.auth.status);


  return (
    <div>
      {authStatus && <Navbar />}
      <Outlet />
    </div>
  );
};

export default App;
