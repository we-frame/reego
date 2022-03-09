import Seo from '@/components/Utils/Seo';
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '@/styles/home/Offers.module.css';
import styles2 from '@/styles/home/RequestForm.module.css';
import { API_URL } from 'config';
import { useRouter } from 'next/router';
import moment from 'moment';
import { FiPlusCircle } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { parseCookies } from 'helpers';
import ReactMarkdown from 'react-markdown';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const CheckOutPage = ({ gadgetList, profileData, token, id }) => {
  const [mobileModel, setMobileModel] = useState([]);
  const [brandModel, setBrandModel] = useState([]);

  const [imgInvoice, setImgInvoice] = useState(null);
  const [base64, setBase64] = useState('');

  const [values, setValues] = useState({
    name: profileData[0]?.custName,
    email: profileData[0]?.custEmail,
    brand: '',
    model: '',
    imeiNo: '',
    gadgetId: '',
    purchaseDate: '',
    packType: '1',
  });

  // Validation
  const hasEmptyFields = Object.values(values).some(
    (element) => element === ''
  );

  const router = useRouter();

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const makePayment = async (amt) => {
    const res = await initializeRazorpay();
    if (!res) {
      alert('Razorpay SDK Failed to load');
      return;
    }

    const data = await fetch('/api/razorpay', {
      method: 'POST',
      body: JSON.stringify({ amount: amt }),
    }).then((t) => t.json());
    // console.log(data);
    var options = {
      key: process.env.RAZORPAY_KEY,
      name: 'Reego',
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: 'Reego Description',
      image:
        'https://kaudible.kodagu.today/assets/ff06665a-af2c-4f10-b5d5-111af6832d13',
      handler: async function (response) {
        const res = await fetch(`${API_URL}/postPurchasePacks.php`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${token}`,
            'API-KEY': `${id}`,
          },
          method: 'POST',
          body: JSON.stringify({
            ...values,
            imgInvoice: base64,
            paymentId: response.razorpay_payment_id.toString(),
            paymentRequest: JSON.stringify(options),
            paymentResponse: JSON.stringify(response),
            paymentStatus: 'success',
          }),
        });
        const data = await res.json();
        if (data.status) {
          router.push('/success');
        } else {
          router.push('/fail');
        }
      },
      prefill: {
        name: values.name,
        email: values.email,
        contact: profileData[0]?.custNumber,
      },
      retry: {
        enabled: true,
        max_count: 3,
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response) {
      router.push('/fail');
    });
    paymentObject.open();
  };

  // HANDLING ALL INPUTS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // HANDLING MODEL SELECTION
  const handleModelSelection = async (e) => {
    setValues({ ...values, brand: e.target.value });

    const res = await fetch(
      `${API_URL}/getModelsList.php?brand_id=${e.target.value}`
    );
    const data = await res.json();
    setMobileModel(data.data);
  };

  // HANDLING BRAND SELECTION
  const handleBrandSelection = async (e) => {
    setValues({ ...values, gadgetId: e.target.value });
    const res = await fetch(
      `${API_URL}/getBrandList.php?gadget_id=${e.target.value}`
    );
    const data = await res.json();
    setBrandModel(data.data);
  };

  //   HANDLING LOCAL IMAGE UPLOAD!
  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImgInvoice(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded;
      reader.readAsBinaryString(e.target.files[0]);
    }
  };

  //
  const _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    setBase64(btoa(binaryString));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Seo title='Checkout' />
      <Container>
        <Row className='my-3 justify-content-center align-items-center my-5'>
          <Col lg={6} className='order-2 order-lg-1'>
            <div className={`${styles.card} offer-card`}>
              <h4 className='text-center my-5'>
                {typeof window !== 'undefined' &&
                  JSON.parse(localStorage.checkoutDet).title}
              </h4>
              {typeof window !== 'undefined' &&
              JSON.parse(localStorage.checkoutDet).points ? (
                <ul className='mb-5'>
                  {typeof window !== 'undefined' &&
                    JSON.parse(localStorage.checkoutDet).points?.map((item) => {
                      return (
                        <li className={styles.li} key={item.id}>
                          {item.point}
                        </li>
                      );
                    })}
                </ul>
              ) : (
                <ReactMarkdown>
                  {typeof window !== 'undefined' &&
                    JSON.parse(localStorage.checkoutDet).desc}
                </ReactMarkdown>
              )}
            </div>
          </Col>
          <Col lg={6} className='text-center order-1 order-lg-2'>
            <h3>You have selected the </h3>
            <h2 className='text-center'>
              ₹{' '}
              {typeof window !== 'undefined' &&
                JSON.parse(localStorage.checkoutDet).price}{' '}
              Pack
            </h2>
          </Col>
        </Row>
        <div className='my-5'>
          <h3>Enter Gadget Details</h3>
          <hr />
          <form onSubmit={handleSubmit} className={styles2.custBack}>
            <div>
              <select
                name='gadgetId'
                value={values.gadgetId}
                onChange={handleBrandSelection}
                className={styles2.select2}
                required
              >
                <option value='' disabled>
                  Select Gadget
                </option>
                {gadgetList.map((gadget) => {
                  return (
                    <option value={gadget.gadgetId} key={gadget.gadgetId}>
                      {gadget.gadgetType}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='d-flex justify-content-between'>
              <select
                name='brand'
                value={values.brand}
                onChange={handleModelSelection}
                className={styles2.select}
                required
              >
                <option value='' disabled>
                  Select Brand
                </option>
                {brandModel?.map((brand) => {
                  return (
                    <option value={brand.brand_id} key={brand.brand_id}>
                      {brand.brand_name}
                    </option>
                  );
                })}
              </select>
              <select
                name='model'
                value={values.model}
                onChange={handleInputChange}
                className={styles2.select}
                required
              >
                <option value='' disabled>
                  Select Model
                </option>
                {mobileModel?.map((model) => {
                  return (
                    <option value={model.id} key={model.id}>
                      {model.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label
                htmlFor='purchaseDate'
                style={{
                  color: '#f53838',
                  position: 'relative',
                  left: '0.5rem',
                }}
              >
                Purchased Date
              </label>
              <input
                max={moment().format('YYYY-MM-DD')}
                type='date'
                name='purchaseDate'
                className={styles2.input}
                value={values.purchaseDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <input
                type='text'
                name='imeiNo'
                placeholder='IMEI Number'
                className={styles2.input}
                value={values.imeiNo}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='d-flex justify-content-center align-items-center my-3 flex-column'>
              <h6 className={styles2.cust}>Upload Invoice</h6>
              {imgInvoice && (
                <img
                  src={URL.createObjectURL(imgInvoice)}
                  alt='Thumb'
                  className='img-fluid my-3'
                />
              )}
              {imgInvoice ? (
                <AiFillDelete
                  size='2rem'
                  color='red'
                  style={{ cursor: 'pointer' }}
                  onClick={() => setImgInvoice(null)}
                />
              ) : (
                <div className='my-2'>
                  <label htmlFor='imgInvoice'>
                    <input
                      name='imgInvoice'
                      type='file'
                      onChange={handleFileChange}
                      id='imgInvoice'
                      hidden
                    />
                    <FiPlusCircle
                      size='2rem'
                      color='red'
                      style={{ cursor: 'pointer' }}
                    />
                  </label>
                </div>
              )}
            </div>
            <div className='d-flex justify-content-center'>
              <button
                type='submit'
                className='button'
                onClick={() =>
                  imgInvoice === null
                    ? toast.error('Please upload the invoice')
                    : !hasEmptyFields &&
                      makePayment(
                        typeof window !== 'undefined' &&
                          JSON.parse(localStorage.checkoutDet).price
                      )
                }
              >
                Procced to Payment
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </Container>
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  const { id } = parseCookies(req);

  // USER DATA
  const res = await fetch(`${API_URL}/getUserDetails.php`, {
    headers: {
      Authorization: `${token}`,
      'API-KEY': `${id}`,
    },
  });
  const data = await res.json();

  // GADGET LIST
  const gadgetRes = await fetch(`${API_URL}/getGadgetList.php`);
  const gadgetData = await gadgetRes.json();

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
      profileData: data.data ? data.data : [],
      gadgetList: gadgetData.data,
      token,
      id,
    },
  };
};

export default CheckOutPage;
