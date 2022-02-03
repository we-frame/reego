import Layout from '../components/Utils/Layout';
import SSRProvider from 'react-bootstrap/SSRProvider';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StateProvider from '../context/StateProvider';

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <StateProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StateProvider>
    </SSRProvider>
  );
}

export default MyApp;
