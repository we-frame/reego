import React, { useState, useContext } from 'react';
import styles from '@/styles/account/AuthForm.module.css';
import { Modal } from 'react-bootstrap';
import Error from '@/components/Utils/Error';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { StateContext } from 'context/StateProvider';

const ModalLogin = ({ modalShow, setModalShow }) => {
  const { login, generateOTP, OTPgen, error, errorOTP, loading } =
    useContext(StateContext);

  const [passwordShown, setPasswordShown] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [OTP, setOTP] = useState('');
  const [loginVia, setLoginVia] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginVia === 1
      ? login({ userName: name, password, loginVia })
      : generateOTP({ userName: number });
    setModalShow(false);
  };

  const handleSubmitOTP = (e) => {
    e.preventDefault();
    login({ userName: number, password: OTP, loginVia });
    setModalShow(false);
  };

  return (
    <Modal
      onHide={() => setModalShow(false)}
      show={modalShow}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id='contained-modal-title-vcenter'
          className='color text-center'
        >
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {OTPgen ? (
          <>
            <div className={styles.auth}>
              <h2 className='my-3 fw-bold text-center'>Enter OTP</h2>

              <form onSubmit={handleSubmitOTP}>
                <div>
                  <label htmlFor='email'>OTP</label>
                  <input
                    type='number'
                    id='number'
                    name='number'
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
                    required
                  />
                </div>

                {loading ? (
                  <button className='button w-100 opacity-50' disabled>
                    Loading...
                  </button>
                ) : (
                  <input type='submit' value='Login' className='button' />
                )}
              </form>
            </div>
          </>
        ) : (
          <div className={styles.auth}>
            <h2 className='my-3 fw-bold text-center'>LOG IN</h2>
            <form onSubmit={handleSubmit}>
              {loginVia === 1 ? (
                <>
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
                      type={passwordShown ? 'text' : 'password'}
                      id='password'
                      name='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {passwordShown ? (
                      <AiFillEye
                        fontSize='1.3rem'
                        className=' my-pos'
                        onClick={() => setPasswordShown(!passwordShown)}
                      />
                    ) : (
                      <AiFillEyeInvisible
                        fontSize='1.3rem'
                        className=' my-pos'
                        onClick={() => setPasswordShown(!passwordShown)}
                      />
                    )}
                  </div>
                  {error && <Error error={error} />}
                  {loading ? (
                    <button className='button w-100 opacity-50' disabled>
                      Loading...
                    </button>
                  ) : (
                    <input type='submit' value='Login' className='button' />
                  )}
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor='email'>Number</label>
                    <input
                      type='number'
                      id='number'
                      name='number'
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      required
                    />
                  </div>
                  {errorOTP ? <Error error={error} /> : ''}
                  {loading ? (
                    <button className='button w-100 opacity-50' disabled>
                      Loading...
                    </button>
                  ) : (
                    <input type='submit' value='Send OTP' className='button' />
                  )}
                </>
              )}
            </form>

            {loginVia === 1 ? (
              <p className='my-3'>
                Log in through {'  '}
                <span
                  style={{ cursor: 'pointer', color: 'blue' }}
                  onClick={() => setLoginVia(2)}
                >
                  OTP
                </span>{' '}
              </p>
            ) : (
              <p className='my-3'>
                Log in through {'  '}
                <span
                  style={{ cursor: 'pointer', color: 'blue' }}
                  onClick={() => setLoginVia(1)}
                >
                  Password
                </span>{' '}
              </p>
            )}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalLogin;
