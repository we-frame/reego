import { useState } from 'react';
import styles from '@/styles/contact/ContactForm.module.css';

const ContactForm = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    number: '',
    message: 'Enter your message',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          name='number'
          placeholder='Your Mobile'
          className={styles.input}
          value={values.number}
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
