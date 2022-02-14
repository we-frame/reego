import { useState } from 'react';
import styles from '@/styles/contact/ContactForm.module.css';
import { API_URL } from 'config';
import { useRouter } from 'next/dist/client/router';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const ContactForm = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/postContactUs.php`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (data.ok) {
        toast.success('Will contact soon');
        router.push('/thank-you');
      } else {
        toast.error('Something went wrong');
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            name='name'
            placeholder='Your Name'
            className={styles.input}
            value={values.name}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div>
          <input
            type='email'
            name='email'
            placeholder='Your Email'
            className={styles.input}
            value={values.email}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div>
          <input
            type='number'
            name='mobile'
            placeholder='Your Mobile'
            className={styles.input}
            value={values.mobile}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div>
          <textarea
            name='message'
            className={styles.input}
            value={values.message}
            onChange={handleInputChange}
            placeholder='Enter your message'
            readOnly
          ></textarea>
        </div>
        <div className='text-center'>
          <button className='button-rounded'>SEND</button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default ContactForm;
