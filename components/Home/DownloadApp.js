import Image from 'next/image';
import { Col, Row } from 'react-bootstrap';
import download from '/public/images/download.png';
import ps from '/public/images/play-store.png';

const DownloadApp = () => {
  return (
    <section>
      <Row className='justify-content-center align-items-center mt-5'>
        <Col lg={6}>
          <h1 className='color'>Download the App</h1>
          <p>
            Reego offers a unique solution based on the values of honesty,
            transparency and efficiency. Hence delivering the promise to our
            customers of upmost quality service in the quickest time using only
            the genuine parts, if required.
          </p>
          <p className='my-3'>Get the App</p>
          <a
            href='https://play.google.com/store/apps/details?id=com.reego.consumer'
            style={{ cursor: 'pointer' }}
          >
            <Image src={ps} alt='play-store' height={50} width={130} />
          </a>
        </Col>
        <Col lg={6} className='d-flex justify-content-end'>
          <Image
            src={download}
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

export default DownloadApp;
