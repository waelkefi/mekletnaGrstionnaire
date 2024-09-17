import React from 'react';
import './Layout.css'
import SideBar from '../Navigation/SideBar';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <SideBar />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;