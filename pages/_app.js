import Layout from '../components/Utils/Layout';
import SSRProvider from 'react-bootstrap/SSRProvider';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StateProvider from '../context/StateProvider';
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress color='#f53855' height={2} />
      <SSRProvider>
        <StateProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StateProvider>
      </SSRProvider>
    </>
  );
}

export default MyApp;
