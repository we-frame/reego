import Seo from '@/components/Utils/Seo';
import React, { useState } from 'react';
import styles from '@/styles/account/AuthForm.module.css';
import { Container } from 'react-bootstrap';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useContext } from 'react';
import { StateContext } from 'context/StateProvider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

const SignupPage = () => {
  const { register } = useContext(StateContext);

  const [values, setValues] = useState({
    name: '',
    email: '',
    mobile: '',
    dob: '',
    gender: 'male',
    address: '',
    city: '',
    state: '',
    pincode: '',
    password: '',
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values) {
      register(values);
    } else {
      toast.error('Please fill all the fields');
    }
  };

  return (
    <>
      <Seo title='Signup' />
      <Container className='my-5'>
        <div className={styles.auth}>
          <h2 className='my-3 fw-bold text-center'>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                name='name'
                value={values.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                value={values.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='mobile'>Mobile</label>
              <input
                type='number'
                name='mobile'
                value={values.mobile}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='dob'>DOB</label>
              <input
                type='date'
                max={moment().format('YYYY-MM-DD')}
                name='dob'
                value={values.dob}
                onChange={handleInputChange}
                required
                placeholder='2000-01-13'
              />
            </div>
            <div>
              <label htmlFor='gender'>Gender</label>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='gender'
                  id='male'
                  value='male'
                  checked={values.gender === 'male'}
                  onChange={handleInputChange}
                />
                <label className='form-check-label' htmlFor='male'>
                  Male
                </label>
              </div>

              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='gender'
                  id='female'
                  value='female'
                  checked={values.gender === 'female'}
                  onChange={handleInputChange}
                />
                <label className='form-check-label' htmlFor='female'>
                  Female
                </label>
              </div>
            </div>
            <div>
              <label htmlFor='address'>Address</label>
              <input
                type='text'
                name='address'
                value={values.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='city'>City</label>
              <input
                type='text'
                name='city'
                value={values.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='state'>State</label>
              <input
                type='text'
                name='state'
                value={values.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='pincode'>Pin code</label>
              <input
                type='number'
                name='pincode'
                value={values.pincode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                type={passwordShown ? 'text' : 'password'}
                name='password'
                value={values.password}
                onChange={handleInputChange}
                required
              />
              {passwordShown ? (
                <AiFillEye
                  fontSize='1.3rem'
                  className='my-pos'
                  onClick={() => setPasswordShown(!passwordShown)}
                />
              ) : (
                <AiFillEyeInvisible
                  fontSize='1.3rem'
                  className='my-pos'
                  onClick={() => setPasswordShown(!passwordShown)}
                />
              )}
            </div>
            <input type='submit' value='Sign up' className='button' />
          </form>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default SignupPage;
