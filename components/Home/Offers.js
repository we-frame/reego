import Link from 'next/link';
import { Row, Col } from 'react-bootstrap';
import styles from '@/styles/home/Offers.module.css';

const Offers = () => {
  return (
    <section>
      <h1 className='color text-center'>Offers</h1>
      <p className='text-center w-50 mx-auto'>
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown
      </p>
      <Row className='my-3'>
        <Col lg={4}>
          <div className={styles.card}>
            <h4 className='text-center my-5'>Free Pick & Drop At Rs 99</h4>
            <ul className='mb-5'>
              <li className={styles.li}>Doorstep pick & drop</li>
              <li className={styles.li}>Hassle free</li>
              <li className={styles.li}>Get free estimation</li>
              <li className={styles.li}>At No extra cost of reaching to you</li>
            </ul>
            <h3 className='text-center'>₹99</h3>
            <div className='d-flex justify-content-center'>
              <Link href='/'>
                <a className={styles.button1}>BUY NOW</a>
              </Link>
              <Link href='/'>
                <a className={styles.button}>Add to cart</a>
              </Link>
            </div>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`${styles.card} ${styles.card2}`}>
            <h4 className='text-center my-5'>Repair and Service</h4>
            <ul className='mb-5'>
              <li className={styles.li}>Free Pick & Drop</li>
              <li className={styles.li}>No extra Service charges</li>
              <li className={styles.li}>Only Spare parts cost, included</li>
              <li className={styles.li}>Hassle Free and stress free</li>
              <li className={styles.li}>Free estimation and quality checks</li>
            </ul>
            <h3 className='text-center'>₹450</h3>
            <div className='d-flex justify-content-center'>
              <Link href='/'>
                <a className={styles.button1}>BUY NOW</a>
              </Link>
              <Link href='/'>
                <a className={styles.button}>Add to cart</a>
              </Link>
            </div>
          </div>
        </Col>
        <Col lg={4}>
          <div className={styles.card}>
            <h4 className='text-center my-5'>
              Doosra Subscription with Free Pick and Drop
            </h4>
            <ul className='mb-5'>
              <li className={styles.li}>Get 1-month Doosra Subscription</li>
              <li className={styles.li}>At No Extra Cost</li>
              <li className={styles.li}>Get free estimation</li>
              <li className={styles.li}>Free Pick & Drop and Estimation</li>
            </ul>
            <h3 className='text-center'>₹99</h3>
            <div className='d-flex justify-content-center'>
              <Link href='/'>
                <a className={styles.button1}>BUY NOW</a>
              </Link>
              <Link href='/'>
                <a className={styles.button}>Add to cart</a>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default Offers;
