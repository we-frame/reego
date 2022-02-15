import Image from 'next/image';
import Link from 'next/link';
import profilePic from '/public/images/profile-pic.png';
import styles from '@/styles/account/Profile.module.css';

const Profile = ({ profile }) => {
  return (
    <section>
      <div className={styles.circle}>
        <Image src={profilePic} alt='profilePic' width={100} height={100} />
      </div>
      <hr />
      <div>
        <div className={styles.profile}>
          <p className='my-bold'>Full Name</p>
          <p>{profile[0]?.custName}</p>
        </div>
        {/* <div className={styles.profile}>
          <p>Mobile Number</p>
          <p>8105434634</p>
        </div> */}
        <div className={styles.profile}>
          <p className='my-bold'>Email ID</p>
          <p className={styles.specialP}>{profile[0]?.custEmail}</p>
        </div>
        <div className={styles.profile}>
          <p className='my-bold'>Gender</p>
          <p>{profile[0]?.custGender}</p>
        </div>
        <div className={styles.profile}>
          <p className='my-bold'>Date of Birth</p>
          <p>{profile[0]?.dateOfBirth}</p>
        </div>
        <div className={styles.profile}>
          <p className='my-bold'>Location</p>
          <p>
            {profile[0]?.custAddress}, {profile[0]?.custCity},{' '}
            {profile[0]?.custState}
          </p>
        </div>
        {/* <div className={styles.profile}>
          <p>Alternate Mobile </p>
          <p> - not added -</p>
        </div> */}
      </div>
      <div className='text-center my-3'>
        <Link href='/account/edit' passHref>
          <button className='button'>Edit</button>
        </Link>
      </div>
    </section>
  );
};

export default Profile;
