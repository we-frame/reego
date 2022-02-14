import { useState } from 'react';
import Layout2 from '@/components/Utils/Layout2';
import Seo from '@/components/Utils/Seo';
import styles from '@/styles/home/RequestForm.module.css';
import { API_URL } from 'config';
import { useRouter } from 'next/dist/client/router';
import { parseCookies } from 'helpers';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const EditPage = ({ token, id, userData }) => {
  const [values, setValues] = useState({
    name: userData?.data[0]?.custName,
    email: userData?.data[0]?.custEmail,
    dob: userData?.data[0]?.dateOfBirth,
    address: userData?.data[0]?.custAddress,
    city: userData?.data[0]?.custCity,
    pincode: '',
    gender: 'male',
    state: userData?.data[0]?.custState,
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/putUserDetails.php`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${token}`,
          'API-KEY': `${id}`,
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.ok) {
        router.push('/account/profile');
        toast.success('Profile updated successfully');
      } else {
        toast.error('Something went wrong');
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout2>
      <Seo title='Edit Profile' />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Full Name</label>
          <input
            type='text'
            name='name'
            className={styles.input}
            value={values.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            className={styles.input}
            value={values.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='dob'>Date of Birth</label>
          <input
            type='text'
            name='dob'
            className={styles.input}
            value={values.dob}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            name='address'
            className={styles.input}
            value={values.address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='city'>City</label>
          <input
            type='text'
            name='city'
            className={styles.input}
            value={values.city}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='pincode'>Pin code</label>
          <input
            type='number'
            name='pincode'
            className={styles.input}
            value={values.pincode}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='state'>State</label>
          <input
            type='text'
            name='state'
            className={styles.input}
            value={values.state}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='password'>Change Password</label>
          <input
            type='password'
            name='password'
            className={styles.input}
            value={values.password}
            onChange={handleInputChange}
          />
        </div>
        <div className='text-center'>
          <button className='button'>Save Details</button>
        </div>
      </form>
      <ToastContainer />
    </Layout2>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  const { id } = parseCookies(req);

  const res = await fetch(`${API_URL}/getUserDetails.php`, {
    headers: {
      Authorization: `${token}`,
      'API-KEY': `${id}`,
    },
  });
  const userData = await res.json();

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      userData,
      token,
      id,
    },
  };
};

export default EditPage;
