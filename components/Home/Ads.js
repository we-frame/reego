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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </Col>
      </Row>
      <Row className='justify-content-center align-items-center'>
        <Col lg={6} className='order-2 order-lg-1'>
          <h1 className='color'>How To Reach us?</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
          </p>
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
