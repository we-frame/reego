import Link from 'next/link';
import { Row, Col } from 'react-bootstrap';
import styles from '@/styles/home/Product.module.css';

const Products = () => {
  return (
    <Row>
      <Col lg={4}>
        <div className={styles.card}>
          <h3 className='text-center my-5'>Screen Damage Insurance</h3>
          <ul className='mb-5'>
            <li className={styles.li}>
              Broken, Cracked, Shattered Screens Covered
            </li>
            <li className={styles.li}>Easy Claim, Hassle Free</li>
            <li className={styles.li}>Repair or replacement guaranteed</li>
          </ul>
          <div className='d-flex justify-content-center'>
            <Link href='/'>
              <a className={styles.buttonRounded}>Read More</a>
            </Link>
          </div>
        </div>
      </Col>
      <Col lg={4}>
        <div className={styles.card}>
          <h3 className='text-center my-5'>
            Accidental Damage and Liquid Damage
          </h3>
          <ul className='mb-5'>
            <li className={styles.li}>Any Physical and Liquid damage</li>
            <li className={styles.li}>Easy Claim, Hassler</li>
            <li className={styles.li}>Free Pick & Drop</li>
            <li className={styles.li}>Repair or Replacement</li>
            <li className={styles.li}>
              Depreciation applicable in case of Replacement.
            </li>
          </ul>
          <div className='d-flex justify-content-center'>
            <Link href='/'>
              <a className={styles.buttonRounded}>Read More</a>
            </Link>
          </div>
        </div>
      </Col>
      <Col lg={4}>
        <div className={styles.card}>
          <h3 className='text-center my-5'>Extended Warranty</h3>
          <ul className='mb-5'>
            <li className={styles.li}>
              Extends your warranty of your Mobile Phone for additional one year
            </li>
            <li className={styles.li}>Covers Malfunctions & Breakdowns</li>
            <li className={styles.li}>Easy process, hassle-free</li>
            <li className={styles.li}>Free Pick & Drop</li>
          </ul>
          <div className='d-flex justify-content-center'>
            <Link href='/'>
              <a className={styles.buttonRounded}>Read More</a>
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Products;
