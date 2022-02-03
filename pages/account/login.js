import Seo from '@/components/Utils/Seo';
import { useContext, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/account/AuthForm.module.css';
import { Container } from 'react-bootstrap';
import { StateContext } from 'context/StateProvider';
import Error from '@/components/Utils/Error';

const LoginPage = () => {
  const { login, generateOTP, OTPgen, error, errorOTP } =
    useContext(StateContext);

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
  };

  const handleSubmitOTP = (e) => {
    e.preventDefault();
    login({ userName: number, password: OTP, loginVia });
  };

  return (
    <>
      <Seo title='Login' />
      <Container className='my-5'>
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

                <input type='submit' value='Login' className='button' />
              </form>
            </div>
          </>
        ) : (
          <div className={styles.auth}>
            <h2 className='my-3 fw-bold text-center'>Log In</h2>
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
                      type='password'
                      id='password'
                      name='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <Error error={error} />}
                  <input type='submit' value='Login' className='button' />
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
                  <input type='submit' value='Send OTP' className='button' />
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
      </Container>
    </>
  );
};

export default LoginPage;
