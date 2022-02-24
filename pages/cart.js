import Seo from '@/components/Utils/Seo';
import Image from 'next/image';
import { Col, Container, Row } from 'react-bootstrap';
import styles from '@/styles/account/Cart.module.css';
import styles2 from '@/styles/home/RequestForm.module.css';
import phone from '/public/images/phone.png';
import { GiCancel } from 'react-icons/gi';
import { useState } from 'react';

const CartPage = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    imei: '',
    brand: '',
    model: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Seo title='Cart' />
      <Container className='my-4'>
        <div className={styles.cartComp}>
          <Row className='justify-content-center align-items-center'>
            <Col lg={2}></Col>
            <Col lg={2}>
              <h6>Product Name</h6>
            </Col>
            <Col lg={2}>
              <h6>Device Price</h6>
            </Col>
            <Col lg={2}>
              <h6>Plan Duration</h6>
            </Col>
            <Col lg={2}>
              <h6>Total Amount</h6>
            </Col>
            <Col lg={2}></Col>
          </Row>
          <hr />
          <Row className='justify-content-center align-items-center'>
            <Col lg={2}>
              <Image src={phone} alt='phone' height={50} width={50} />
            </Col>
            <Col lg={2}>
              <p>Mobile Phone Extended Warranty</p>
            </Col>
            <Col lg={2}>
              <p>₹15,000</p>
            </Col>
            <Col lg={2}>
              <p>1 Year</p>
            </Col>
            <Col lg={2}>
              <p>₹749</p>
            </Col>
            <Col lg={2}>
              <GiCancel
                color='red'
                fontSize='1.3rem'
                style={{ cursor: 'pointer' }}
              />
            </Col>
          </Row>
          <div className='d-flex justify-content-end my-4 gap-4'>
            <p>Total(Inc.taxes)</p>
            <h5>₹2247</h5>
          </div>
        </div>
        <div className='my-5'>
          <div className={styles.cartComp}>
            <h5>Enter Personal Details</h5>
            <hr />
            <form className={styles.form} onSubmit={handleSubmit}>
              <div>
                <input
                  type='text'
                  name='name'
                  placeholder='Name'
                  className={styles2.input}
                  value={values.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  className={styles2.input}
                  value={values.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  type='text'
                  name='brand'
                  placeholder='Mobile Brand'
                  className={styles2.input}
                  value={values.brand}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  type='text'
                  name='model'
                  placeholder='Mobile Model'
                  className={styles2.input}
                  value={values.model}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  type='number'
                  name='imei'
                  placeholder='IMEI NUMBER'
                  className={styles2.input}
                  value={values.imei}
                  onChange={handleInputChange}
                />
              </div>
              <div className='d-flex my-4 justify-content-center'>
                <button className='button'>Proceed to Payment</button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CartPage;
