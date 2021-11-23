import Image from 'next/image';
import { Col, Row } from 'react-bootstrap';
import illustration from '/public/images/track.png';

const Tracker = () => {
  return (
    <Row className='justify-content-center align-items-center'>
      <Col lg={6}>
        <Image src={illustration} alt='illustration' placeholder='blur' />
      </Col>
      <Col lg={6}>
        <h1>Tracker comes here!</h1>
      </Col>
    </Row>
  );
};

export default Tracker;
