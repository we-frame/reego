import Seo from '@/components/Utils/Seo';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import thankYou from '../public/images/thank-you.svg';

const ThankYouPage = () => {
  return (
    <>
      <Seo title='Thank you' />
      <Container className='my-5'>
        <Row className='justify-content-center align-items-center'>
          <Col
            lg={6}
            className='my-5 my-lg-0 d-flex d-lg-block flex-column justify-content-center align-items-center order-2 order-lg-1'
          >
            <h2>Thank you for contacting</h2>
            <p>We will get back to you as soon as possible</p>
            <Link href='/'>
              <a className='button text-white'>Home</a>
            </Link>
          </Col>
          <Col lg={6} className='order-1 order-lg-2'>
            <Image
              src={thankYou}
              blurDataURL={thankYou}
              alt='thank-you'
              placeholder='blur'
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ThankYouPage;
