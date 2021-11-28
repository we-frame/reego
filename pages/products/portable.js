import Image from 'next/image';
import Seo from '@/components/Utils/Seo';
import { Container } from 'react-bootstrap';
import soon from '/public/images/coming-soon.png';

const PortablePage = () => {
  return (
    <>
      <Seo title='Portable' />
      <Container className='my-5'>
        <h1 className='text-center'>Coming Soon</h1>
        <div className='text-center'>
          <Image src={soon} alt='coming-soon' placeholder='blur' />
        </div>
      </Container>
    </>
  );
};

export default PortablePage;
