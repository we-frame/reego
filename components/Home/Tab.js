import React, { useState } from 'react';
import styles from '@/styles/home/Tab.module.css';
import { Row, Col } from 'react-bootstrap';
import RequestForm from '@/components/Home/RequestForm';
import Tracker from './Tracker';

const Tab = ({ brandList,problems }) => {
  const [index, setIndex] = useState(0);

  return (
    <section className={styles.tab}>
      <Row className={styles.tabBtnGroup}>
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
      </Row>
      {index === 0 ? (
        <>
          <RequestForm brandList={brandList} problems={problems}/>
        </>
      ) : (
        <>
          <Tracker />
        </>
      )}
    </section>
  );
};

export default Tab;
