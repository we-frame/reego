import Seo from '@/components/Utils/Seo';
import { useContext, useEffect, useState } from 'react';
import styles from '@/styles/account/AuthForm.module.css';
import { Container } from 'react-bootstrap';
import { StateContext } from 'context/StateProvider';
import Error from '@/components/Utils/Error';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LoginPage = () => {
  const { login, generateOTP, OTPgen, error, errorOTP, loading, backToNumber } =
    useContext(StateContext);

  const [passwordShown, setPasswordShown] = useState(false);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [OTP, setOTP] = useState('');
  const [loginVia, setLoginVia] = useState(1);
  const [timer, setTimer] = useState(false);
  const [timingNumber, setTimingNumber] = useState(40);

  const { query } = useRouter();

  const redirect = query?.redirect?.includes('checkout');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loginVia === 1) {
      login({ userName: name, password, loginVia });
    } else {
      generateOTP({ userName: number });
      setTimer(true);
      typeof window !== 'undefined' && localStorage.setItem('number', number);
    }
  };

  const handleSubmitOTP = (e) => {
    e.preventDefault();
    login({ userName: number, password: OTP, loginVia });
  };

  useEffect(() => {
    if (timer) {
      const x = setInterval(() => {
        setTimingNumber(timingNumber - 1);
      }, 1000);

      if (timingNumber <= 0) {
        setTimer(false);
        setTimingNumber(40);
      }

      return () => clearInterval(x);
    }
  }, [timer, timingNumber]);

  return (
    <>
      <Seo title='Login' />
      <Container className='my-5'>
        {OTPgen ? (
          <>
            <div className={styles.auth}>
              <BiArrowBack fontSize='1.3rem' onClick={backToNumber} />
              <h2 className='my-3 fw-bold text-center'>Enter OTP</h2>
              <form onSubmit={handleSubmitOTP}>
                <div>
                  <label htmlFor='email'>Enter OTP</label>
                  <input
                    type='number'
                    id='number'
                    name='number'
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
                    required
                  />
                </div>
                {timer ? (
                  <p>Resend OTP in : {timingNumber}</p>
                ) : (
                  <p
                    style={{ color: '#f53838', cursor: 'pointer' }}
                    onClick={() => {
                      generateOTP({
                        userName: JSON.parse(
                          typeof window !== 'undefined' &&
                            localStorage.getItem('number')
                        ),
                      });
                      setTimer(true);
                    }}
                  >
                    Resend OTP
                  </p>
                )}

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
                  {errorOTP ? <Error error={errorOTP} /> : ''}
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
            {redirect ? (
              <span>
                New Customer?{' '}
                <Link href='/account/register?redirect=checkout'>
                  <a className='text-decoration-underline'>Register</a>
                </Link>
              </span>
            ) : (
              <span>
                New Customer?{' '}
                <Link href='/account/register'>
                  <a className='text-decoration-underline'>Register</a>
                </Link>
              </span>
            )}
          </div>
        )}
      </Container>
    </>
  );
};

export default LoginPage;
