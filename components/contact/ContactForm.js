import { useState } from 'react';
import styles from '@/styles/contact/ContactForm.module.css';
import { API_URL } from 'config';

const ContactForm = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    mobile: '',
    message: 'Enter your message',
  });

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
      console.log(data);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <input
          type='text'
          name='name'
          placeholder='Your Name'
          className={styles.input}
          value={values.name}
          onChange={handleInputChange}
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
        />
      </div>
      <div>
        <textarea
          name='message'
          className={styles.input}
          value={values.message}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className='text-center'>
        <button className='button-rounded'>SEND</button>
      </div>
    </form>
  );
};

export default ContactForm;
