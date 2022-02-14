import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/account/OverView.module.css';
import orders from '/public/images/orders.png';
import devices from '/public/images/devices.png';
import ew from '/public/images/ew.png';
import reedem from '/public/images/reedem.png';
import profile from '/public/images/profile.png';
import profilePic from '/public/images/profile-pic.png';
import { useContext } from 'react';
import { StateContext } from 'context/StateProvider';
import { useRouter } from 'next/dist/client/router';

const OverView = ({ data }) => {
  const { logout } = useContext(StateContext);

  const router = useRouter();

  const handleLogOut = () => {
    logout();
    localStorage.removeItem('requestform');
    router.push('/');
  };

  return (
    <section>
      <div className={styles.accountDet}>
        <div className='d-flex flex-column flex-lg-row text-center text-lg-start align-items-center'>
          <Image src={profilePic} alt='profilePic' width={100} height={100} />
          <div className='ms-0 my-3 my-lg-0 ms-lg-4'>
            <h5>{data[0]?.custName}</h5>
            <p>{data[0]?.custEmail}</p>
          </div>
        </div>
        <Link href='/account/edit'>
          <a className={styles.buttonOutline}>Edit Profile</a>
        </Link>
      </div>
      <div className={styles.accountOptions}>
        <Link href='/account/orders'>
          <a className={styles.accountOption}>
            <Image src={orders} alt='orders' />
            <p>Orders</p>
          </a>
        </Link>
        <Link href='/account/add'>
          <a className={styles.accountOption}>
            <Image src={devices} alt='devices' />
            <p>Add devices</p>
          </a>
        </Link>
        <Link href='/account/insurance'>
          <a className={styles.accountOption}>
            <Image src={ew} alt='ew' />
            <p>Insurance and Extended Warranty</p>
          </a>
        </Link>

        <Link href='/account/redeem'>
          <a className={styles.accountOption}>
            <Image src={reedem} alt='reedem' />
            <p>Redeem</p>
          </a>
        </Link>
        <Link href='/account/profile'>
          <a className={styles.accountOption}>
            <Image src={profile} alt='profile' />
            <p>Profile Details</p>
          </a>
        </Link>
      </div>
      <div className='mt-5 text-center'>
        <button className='button' onClick={handleLogOut}>
          Logout
        </button>
      </div>
    </section>
  );
};

export default OverView;
