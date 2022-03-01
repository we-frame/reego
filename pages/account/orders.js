import Orders from '@/components/account/Orders';
import Layout2 from '@/components/Utils/Layout2';
import Seo from '@/components/Utils/Seo';
import { API_URL } from 'config';
import { parseCookies } from 'helpers';

const OrdersPage = ({ token, id, orders }) => {
  return (
    <Layout2>
      <Seo title='Orders' />
      <Orders orders={orders} token={token} id={id} />
    </Layout2>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  const { id } = parseCookies(req);

  const res = await fetch(`${API_URL}/getOrderList.php`, {
    headers: {
      Authorization: `${token}`,
      'API-KEY': `${id}`,
    },
  });
  const data = await res.json();

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      orders: data.data ? data.data : [],
      token,
      id,
    },
  };
};

export default OrdersPage;
