import Link from 'next/link';
import Seo from '@/components/Utils/Seo';
import Lottie from 'react-lottie-player';
import lottieJson from '../public/payment-successful.json';

const SuccessPage = () => {
  return (
    <>
      <Seo title='Payment Successful' />
      <div className='jumbotron text-center height: 100%;'>
        <div className='d-flex justify-content-center'>
          <Lottie
            // loop={false}
            animationData={lottieJson}
            play
            style={{ width: 500, height: 500 }}
          />
        </div>
        <h1 className='display-4'>Thank You!</h1>
        <p className='lead'>Your payment was successfully completed</p>
        <p>
          <Link href='/account/dashboard'>
            <a className='button text-white'>Continue to Account</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default SuccessPage;
