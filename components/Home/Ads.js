import Image from 'next/image';
import { Col, Row } from 'react-bootstrap';
import Globe from '/public/images/Globe.png';
import illustration from '/public/images/Victory.png';

const Ads = () => {
  return (
    <section>
      <Row className='justify-content-center align-items-center mt-5'>
        <Col lg={6}>
          <Image
            src={illustration}
            alt='illustration'
            placeholder='blur'
            width={470}
            height={470}
          />
        </Col>
        <Col lg={6}>
          <h1 className='color'>Why Reego?</h1>
          <p>
            Reego offers a unique solution based on the values of honesty,
            transparency and efficiency. Hence delivering the promise to our
            customers of upmost quality service in the quickest time using only
            the genuine parts, if required.
          </p>
        </Col>
      </Row>
      <Row className='justify-content-center align-items-center'>
        <Col lg={6} className='order-2 order-lg-1'>
          <h1 className='color'>How To Reach us?</h1>
          <p>Your can reach us via (website, Email, Customer care number)</p>
        </Col>
        <Col
          lg={6}
          className='d-flex justify-content-end my-3 order-1 order-lg-2'
        >
          <Image
            src={Globe}
            alt='illustration'
            placeholder='blur'
            width={470}
            height={470}
          />
        </Col>
      </Row>
    </section>
  );
};

export default Ads;
