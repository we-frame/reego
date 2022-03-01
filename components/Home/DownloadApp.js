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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
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
