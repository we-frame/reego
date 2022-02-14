import Layout2 from '@/components/Utils/Layout2';
import Seo from '@/components/Utils/Seo';
import styles from '@/styles/account/Reedem.module.css';
import { API_URL } from 'config';
import { parseCookies } from 'helpers';

const RedeemPage = ({ myData }) => {
  return (
    <Layout2>
      <Seo title='Redeem' />
      <section>
        {myData.length === 0 && <h4>No data to show</h4>}
        {myData?.map((item, i) => {
          return (
            <div className={styles.redeemCard} key={i}>
              <p>Device : {item?.brandName}</p>
              <p>Validity : 1 Year</p>
              {item?.isRedeem === '0' ? (
                <button className='button'>Redeem</button>
              ) : (
                <button className='button'>Redeemed</button>
              )}
            </div>
          );
        })}
      </section>
    </Layout2>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  const { id } = parseCookies(req);

  const res = await fetch(`${API_URL}/getMyOfferList.php`, {
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
      myData: data?.data ? data?.data : [],
      token,
      id,
    },
  };
};

export default RedeemPage;
