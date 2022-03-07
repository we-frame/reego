import ReedemForm from '@/components/Home/ReedemForm';
import Layout2 from '@/components/Utils/Layout2';
import Seo from '@/components/Utils/Seo';
import styles from '@/styles/account/Reedem.module.css';
import { API_URL } from 'config';
import { parseCookies } from 'helpers';
import { useState } from 'react';

const RedeemPage = ({
  myData,
  problems,
  profileData,
  gadgetList,
  token,
  id,
}) => {
  const [modalShow, setModalShow] = useState(false);

  const [redeemId, setRedeemId] = useState('');

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
                <button
                  className='button'
                  onClick={() => {
                    setModalShow(true);
                    setRedeemId(item?.transactionNo);
                  }}
                >
                  Redeem
                </button>
              ) : (
                <button className='button'>Redeemed</button>
              )}
            </div>
          );
        })}
      </section>
      {modalShow && (
        <ReedemForm
          redeemId={redeemId}
          reedemDet={myData}
          profileData={profileData}
          modalShow={modalShow}
          setModalShow={setModalShow}
          problems={problems}
          gadgetList={gadgetList}
          token={token}
          id={id}
        />
      )}
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

  // USER DATA
  const userRes = await fetch(`${API_URL}/getUserDetails.php`, {
    headers: {
      Authorization: `${token}`,
      'API-KEY': `${id}`,
    },
  });
  const userData = await userRes.json();

  // PROBLEM LIST
  const problemRes = await fetch(`${API_URL}/getDeviceProblemList.php`);
  const problemData = await problemRes.json();

  // GADGET LIST
  const gadgetRes = await fetch(`${API_URL}/getGadgetList.php`);
  const gadgetData = await gadgetRes.json();

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
      profileData: userData.data ? userData.data : [],
      problems: problemData.data,
      myData: data?.data ? data?.data : [],
      gadgetList: gadgetData.data,
      token,
      id,
    },
  };
};

export default RedeemPage;
