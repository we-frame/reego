import Seo from '@/components/Utils/Seo';
import React, { useState } from 'react';
import styles from '@/styles/account/AuthForm.module.css';
import { Container } from 'react-bootstrap';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Seo title='Signup' />
      <Container className='my-5'>
        <div className={styles.auth}>
          <h2 className='my-3 fw-bold text-center'>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor='email'>User name</label>
              <input
                type='text'
                id='name'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <input type='submit' value='Sign up' className='button' />
          </form>
        </div>
      </Container>
    </>
  );
};

export default SignupPage;
