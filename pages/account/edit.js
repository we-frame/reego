import { useState } from 'react';
import Layout2 from '@/components/Utils/Layout2';
import Seo from '@/components/Utils/Seo';
import styles from '@/styles/home/RequestForm.module.css';

const EditPage = () => {
  const [values, setValues] = useState({
    name: '',
    number: '',
    email: '',
    dob: '',
    address: '',
    alternateMobile: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <label htmlFor='number'>Number</label>
          <input
            type='number'
            name='number'
            className={styles.input}
            value={values.number}
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
          <label htmlFor='alternate-mobile'>Alternate Number</label>
          <input
            type='number'
            name='number'
            className={styles.input}
            value={values.alternateMobile}
            onChange={handleInputChange}
          />
        </div>
        <div className='text-center'>
          <button className='button'>Save Details</button>
        </div>
      </form>
    </Layout2>
  );
};

export default EditPage;
