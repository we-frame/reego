import Layout2 from '@/components/Utils/Layout2';
import Seo from '@/components/Utils/Seo';
import styles from '@/styles/account/Insurance.module.css';
import styles2 from '@/styles/home/RequestForm.module.css';
import Image from 'next/image';
import { Modal } from 'react-bootstrap';
import barCode from '/public/images/barocde.png';
import warranty from '/public/images/ex-warranty.png';
import { AiFillCheckCircle } from 'react-icons/ai';
import { parseCookies } from 'helpers';
import { API_URL } from 'config';
import { useState } from 'react';
import { useContext } from 'react';
import { StateContext } from 'context/StateProvider';
import { useRouter } from 'next/dist/client/router';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const InsurancePage = ({ token, id, insuranceData }) => {
  const { user } = useContext(StateContext);

  const [modalShow, setModalShow] = useState(false);
  const [transactionNo, setTransactionNo] = useState('');
  const [spackServices, setSpackServices] = useState('');

  const router = useRouter();

  const [values, setValues] = useState({
    name: user && user[0]?.custName ? user[0]?.custName : '',
    mobile: user && user[0]?.custNumber ? user[0]?.custNumber : '',
    email: user && user[0]?.custEmail ? user[0]?.custEmail : '',
    policyNo: '',
    problem: '',
  });

  const [loading, setLoading] = useState(false);

  // HANDLING ALL INPUTS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/postInsuranceClaim.php`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${token}`,
          'API-KEY': `${id}`,
        },
        body: JSON.stringify({
          ...values,
          transactionNo,
          insurancePackId: spackServices,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        setModalShow(false);
        router.reload();
        toast.success(data.message);
      } else {
        setLoading(false);

        toast.error('Something went wrong');
      }
    } catch (err) {
      setLoading(false);

      toast.error('Something went wrong');
    }
  };

  return (
    <Layout2>
      <Seo title='Insurance' />
      <div className='d-flex flex-column justify-content-center align-items-center'>
        {insuranceData.length === 0 && <h4>No data to show</h4>}
        {insuranceData.map((data, i) => {
          return (
            <section className={styles.insuranceCard} key={i}>
              <div className='d-flex align-items-center'>
                <Image src={barCode} alt='barcode' height={580} width={150} />

                <div className='p-3'>
                  <h3 className='text-center'>{data?.brandName}</h3>
                  <div className='my-4'>
                    <ul>
                      <li className='my-4'>
                        <span>
                          <AiFillCheckCircle className='me-2' />
                        </span>
                        Extends your warranty of your Mobile Phone for
                        additional one year
                      </li>
                      <li className='my-4'>
                        <span>
                          <AiFillCheckCircle className='me-2' />
                        </span>
                        Covers Malfunctions & Breakdowns
                      </li>
                      <li className='my-4'>
                        <span>
                          <AiFillCheckCircle className='me-2' />
                        </span>
                        Easy process, hassle-free
                      </li>
                      <li className='my-4'>
                        <span>
                          <AiFillCheckCircle className='me-2' />
                        </span>
                        Free Pick & Drop
                      </li>
                    </ul>
                  </div>
                  <p className='text-center'>Validity:1 year</p>
                  <div className='d-flex justify-content-center'>
                    {data?.isRedeem === '0' ? (
                      <button
                        onClick={() => {
                          setTransactionNo(data?.transactionNo);
                          setSpackServices(data?.spackServices);
                          setModalShow(true);
                        }}
                      >
                        CLAIM
                      </button>
                    ) : (
                      <button style={{ cursor: 'initial' }}>CLAIMED</button>
                    )}
                  </div>
                </div>
                <Image src={warranty} alt='barcode' height={580} width={150} />
              </div>
            </section>
          );
        })}
      </div>
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
            Claim Insurance
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type='text'
                name='name'
                placeholder='Name'
                className={styles2.input}
                value={values.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <input
                type='number'
                name='mobile'
                placeholder='Mobile'
                className={styles2.input}
                value={values.mobile}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <input
                type='email'
                name='email'
                placeholder='Email'
                className={styles2.input}
                value={values.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <input
                type='number'
                name='policyNo'
                placeholder='Policy No'
                className={styles2.input}
                value={values.policyNo}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <input
                type='text'
                name='problem'
                placeholder='Problem'
                className={styles2.input}
                value={values.problem}
                onChange={handleInputChange}
                required
              />
            </div>
            {loading ? (
              <button className='button opacity-50'>Loading...</button>
            ) : (
              <button className='button'>SUBMIT</button>
            )}
          </form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </Layout2>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  const { id } = parseCookies(req);

  const res = await fetch(`${API_URL}/getMyInsurance.php`, {
    headers: {
      Authorization: `${token}`,
      'API-KEY': `${id}`,
    },
  });
  const data = await res.json();

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
      insuranceData: data.data ? data.data : [],
      token,
      id,
    },
  };
};

export default InsurancePage;
