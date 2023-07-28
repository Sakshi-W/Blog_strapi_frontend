import React from 'react';
import { Outlet } from 'react-router-dom';

import AppHeader from './AppHeader/AppHeader';
import Footer from './AppFooter/AppFooter';

const mainContentStyle = {
  paddingBottom: '170px',
  paddingTop: '50px', // Adjust this value as needed
};

const Layout = () => {
  return (
    <>
      <AppHeader />
      <div style={mainContentStyle}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
