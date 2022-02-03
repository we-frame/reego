import React, { useContext } from 'react';
import styles from '@/styles/products/Plans.module.css';
import { Col, Row } from 'react-bootstrap';
import { StateContext } from 'context/StateProvider';

const Plans = ({ short, title, points }) => {
  const { products, testFunc } = useContext(StateContext);

  console.log(products);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className='my-5'>
      <Row className='align-items-center'>
        <Col lg={5}>
          <div className={styles.card}>
            <div className='text-center'>
              <button className='button-rounded'>{short}</button>
            </div>
            <h3 className='text-center my-5'>{title}</h3>
            <ul className='mb-5'>
              {points.map((item) => {
                return (
                  <li className={styles.li} key={item.id}>
                    {item.point}
                  </li>
                );
              })}
            </ul>
          </div>
        </Col>
        <Col lg={7}>
          <>
            <h4 className='my-4 text-center'>Explore Plans for your device</h4>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div>
                <input
                  type='text'
                  name='date'
                  placeholder='Date of Purchase'
                  className={styles.input}
                />
              </div>
              <div>
                <input
                  type='number'
                  name='price'
                  placeholder='Device Price'
                  className={styles.input}
                />
              </div>
              <div className='d-grid gap-2'>
                <button className='button'>View Plans</button>
              </div>
            </form>
          </>
        </Col>
      </Row>
      <h2 className='my-5 text-center fw-bold'>Plans for your device</h2>
      <div className={styles.card2}>
        <h3>Device Price</h3>
        <h4>₹10,000</h4>
        <div className={styles.highlight}>₹1,000/year</div>
        <p>
          Note: These plans only covers Mobile Phones that have been purchased
          on 12th November 2021.
        </p>
      </div>
      <div className='text-center my-4'>
        <button className='button' onClick={testFunc}>
          Add to Cart
        </button>
      </div>
    </section>
  );
};

export default Plans;
