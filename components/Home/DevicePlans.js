import React, { useState } from 'react';
import styles from '@/styles/home/Tab.module.css';
import { Row, Col } from 'react-bootstrap';
import Products from './Products';

const DevicePlans = () => {
  const [index, setIndex] = useState(0);

  return (
    <section>
      <h1 className='color text-center'>DEVICES/PLANS</h1>
      <div className={styles.tab}>
        <Row className={`g-0 ${styles.tabBtnGroup}`}>
          <Col lg={4}>
            <button
              className={`${styles.tabBtn} ${styles.tabBtn1} ${
                index === 0 && styles.active
              }`}
              onClick={() => setIndex(0)}
            >
              Mobile
            </button>
          </Col>
          <Col lg={4}>
            <button
              className={`${styles.tabBtn} ${styles.tabBtn3} ${
                index === 1 && styles.active
              } `}
              onClick={() => setIndex(1)}
            >
              Portable
            </button>
          </Col>
          <Col lg={4}>
            <button
              className={`${styles.tabBtn} ${styles.tabBtn2} ${
                index === 2 && styles.active
              } `}
              onClick={() => setIndex(2)}
            >
              Durable
            </button>
          </Col>
        </Row>
        {index === 0 ? (
          <>
            <Products />
          </>
        ) : (
          <>
            <h1 className='text-center'>Coming soon...</h1>
          </>
        )}
      </div>
    </section>
  );
};

export default DevicePlans;
