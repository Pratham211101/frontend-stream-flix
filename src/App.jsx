
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Navbar} from './components/index';




const App = ({children}) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default App;
