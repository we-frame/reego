import Link from 'next/link';
import Seo from '@/components/Utils/Seo';
import Lottie from 'react-lottie-player';
import lottieJson from '../public/payment-failed.json';

const FailPage = () => {
  return (
    <>
      <Seo title='Payment Failed' />
      <div className='jumbotron text-center height: 100%;'>
        <div className='d-flex justify-content-center'>
          <Lottie
            animationData={lottieJson}
            play
            style={{ width: 500, height: 500 }}
          />
        </div>
        <h1 className='display-4'>Transaction Failed!</h1>
        <p className='lead'>
          There was some problem in completing your payment
        </p>
        <p>
          <Link href='/'>
            <a className='button text-white'>Continue to Home</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default FailPage;
