import Header from '@/components/Utils/Header';
import Footer from '@/components/Utils/Footer';

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
