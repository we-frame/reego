import Image from 'next/image';
import Link from 'next/link';
import profilePic from '/public/images/profile-pic.png';
import styles from '@/styles/account/Profile.module.css';

const Profile = () => {
  return (
    <section>
      <div className={styles.circle}>
        <Image src={profilePic} alt='profilePic' width={100} height={100} />
      </div>
      <hr />
      <div>
        <div className={styles.profile}>
          <p>Full Name</p>
          <p>Thammaiah</p>
        </div>
        <div className={styles.profile}>
          <p>Full Name</p>
          <p>Thammaiah</p>
        </div>
        <div className={styles.profile}>
          <p>Mobile Number</p>
          <p>8105434634</p>
        </div>
        <div className={styles.profile}>
          <p>Email ID</p>
          <p className={styles.specialP}>kechamadavipul@gmail.com</p>
        </div>
        <div className={styles.profile}>
          <p>Gender</p>
          <p>MALE</p>
        </div>
        <div className={styles.profile}>
          <p>Date of Birth</p>
          <p> - not added -</p>
        </div>
        <div className={styles.profile}>
          <p>Location</p>
          <p> - not added -</p>
        </div>
        <div className={styles.profile}>
          <p>Alternate Mobile </p>
          <p> - not added -</p>
        </div>
      </div>
      <div className='text-center my-3'>
        <Link href='/account/edit'>
          <button className='button'>Edit</button>
        </Link>
      </div>
    </section>
  );
};

export default Profile;
