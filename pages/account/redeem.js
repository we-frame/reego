import Layout2 from '@/components/Utils/Layout2';
import Seo from '@/components/Utils/Seo';
import styles from '@/styles/account/Reedem.module.css';

const RedeemPage = () => {
  return (
    <Layout2>
      <Seo title='Redeem' />
      <section>
        <div className={styles.redeemCard}>
          <h3 className='my-3'>Plan : Screen Damage Insurance </h3>
          <p>Device : Iphone 13</p>
          <p>Validity : 1 Year</p>
          <button className='button'>Redeem</button>
        </div>
        <div className={styles.redeemCard}>
          <h3 className='my-3'>Plan : Screen Damage Insurance </h3>
          <p>Device : Mi 10</p>
          <p>Validity : 1 Year</p>
          <button className='button'>Redeem</button>
        </div>
      </section>
    </Layout2>
  );
};

export default RedeemPage;
