import React from 'react';
import Footer from '@/components/Utils/Footer';
import Header from '@/components/Utils/Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
