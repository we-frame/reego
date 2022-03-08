import React, { useState, useContext } from 'react';
import styles from '@/styles/home/Tab.module.css';
import { Row, Col } from 'react-bootstrap';
import RequestForm from '@/components/Home/RequestForm';
import Tracker from './Tracker';
import { StateContext } from 'context/StateProvider';
import { useRouter } from 'next/router';

const Tab = ({ brandList, gadgetList, problems, token, id }) => {
  const { query } = useRouter();

  const [index, setIndex] = useState(
    query?.trackingID && query?.callType ? 1 : 0
  );

  const { isLoggedIn } = useContext(StateContext);

  return (
    <section className={styles.tab} id='tracker'>
      <Row className={`g-0 ${styles.tabBtnGroup}`}>
        {isLoggedIn ? (
          <>
            <Col lg={6}>
              <button
                className={`${styles.tabBtn} ${styles.tabBtn1} ${
                  index === 0 && styles.active
                }`}
                onClick={() => setIndex(0)}
              >
                Raise a request
              </button>
            </Col>
            <Col lg={6}>
              <button
                className={`${styles.tabBtn} ${styles.tabBtn2} ${
                  index === 1 && styles.active
                } `}
                onClick={() => setIndex(1)}
              >
                Track your device
              </button>
            </Col>
          </>
        ) : (
          <Col lg={12}>
            <button
              className={`${styles.tabBtn} ${styles.tabBtn1} ${
                index === 0 && styles.active
              }`}
              onClick={() => setIndex(0)}
            >
              Raise a request
            </button>
          </Col>
        )}
      </Row>
      {index === 0 ? (
        <>
          <RequestForm
            brandList={brandList}
            gadgetList={gadgetList}
            problems={problems}
            token={token}
            id={id}
          />
        </>
      ) : (
        <>{isLoggedIn && <Tracker token={token} id={id} />}</>
      )}
    </section>
  );
};

export default Tab;
