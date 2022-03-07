import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/images/logo.png';
import insta from '/public/images/insta.png';
import twitter from '/public/images/twitter.png';
import fb from '/public/images/fb.png';
import ps from '/public/images/play-store.png';
import styles from '@/styles/utils/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <Image src={logo} alt='logo' width={70} height={50} />
      </div>
      <div className='d-flex my-3'>
        <div className='me-4'>
          <a href='#'>
            <Image src={insta} alt='instagram' width={50} height={50} />
          </a>
        </div>
        <div className='me-4'>
          <a href='#'>
            <Image src={twitter} alt='twitter' width={50} height={50} />
          </a>
        </div>
        <div className='me-0 lg:me-4'>
          <a href='#'>
            <Image src={fb} alt='fb' width={50} height={50} />
          </a>
        </div>
      </div>
      <div className='d-flex my-3 p-3 flex-column align-items-center flex-lg-row'>
        <div className='me-lg-4 my-2 my-lg-0'>
          {/* <Link href='/about'>
            <a className='text-white'>About</a>
          </Link> */}
        </div>
        {/* <div className='me-lg-4 my-2 my-lg-0'>
          <a className='text-white' href='#'>
            Careers
          </a>
        </div> */}
        {/* <div className='me-lg-4 my-2 my-lg-0'>
          <a className='text-white' href='#'>
            Help
          </a>
        </div> */}
        <div className='me-lg-4 my-2 my-lg-0'>
          <a className='text-white' href='https://reego.in/terms_condn.html'>
            Terms & Conditions
          </a>
        </div>
        {/* <div className='me-lg-4 my-2 my-lg-0'>
          <a className='text-white' href='#'>
            License
          </a>
        </div> */}
      </div>
      <p className='text-white'>Get the App</p>
      <a href='https://play.google.com/store/apps/details?id=com.reego.consumer'>
        <Image src={ps} alt='play-store' height={50} width={130} />
      </a>
      <p className='text-white'>&copy; {new Date().getFullYear()} Reego</p>
    </footer>
  );
};

export default Footer;
