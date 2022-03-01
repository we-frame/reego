import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import illustration from '/public/images/form.png';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '@/styles/home/RequestForm.module.css';
import { IoIosArrowBack } from 'react-icons/io';
import { API_URL } from '../../config';
import { AiFillHome } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { StateContext } from 'context/StateProvider';
import { useRouter } from 'next/dist/client/router';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const RequestForm = ({
  brandList,
  gadgetList,
  problems,
  token,
  id,
  profileData,
}) => {
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
        // console.log(dropAddress);
        var ss = JSON.stringify({
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          brand: values.brand,
          model: values.model,
          address: values.address,
          otherComments: values.comments,
          packType: plan.toString(),
          deviceIssues: values.deviceIssues,
          pincode: values.pincode,
          gadgetId: gadgetId.toString(),
          paymentId: response.razorpay_payment_id.toString(),
          paymentRequest: JSON.stringify(options),
          paymentResponse: JSON.stringify(response),
          paymentStatus: 'success',
          isRedirect: 0,
          dropType: dropPoint.toString(),
          dropPointId: dropPoint.toString(),
          transactionCode: response.razorpay_signature.toString(),
        });
        const res22 = await fetch(`${API_URL}/postRaiseRequest.php`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${token}`,
            'API-KEY': `${id}`,
          },
          method: 'POST',
          body: ss,
        });
        const data22 = await res22.json();
        if (data22.status) {
          router.push('/success');
        } else {
          router.push('/fail');
        }
      },
      prefill: {
        name: values.name,
        email: values.email,
        contact: values.mobile,
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response) {
      router.push('/fail');
    });
    paymentObject.open();
  };
  const { isLoggedIn } = useContext(StateContext);

  const [index, setIndex] = useState(0);
  const [gadgetId, setGadgetId] = useState(0);
  const [mobileModel, setMobileModel] = useState([]);
  const [brandModel, setBrandModel] = useState([]);

  const [dropAddress, setDropAddress] = useState(null);

  // Add to values object at submit!
  const [plan, setPlan] = useState(
    JSON.parse(
      typeof window !== 'undefined' && localStorage.getItem('requestform')
    )?.plan || 0
  );
  const [dropPoint, setDropPoint] = useState(0);

  const [values, setValues] = useState({
    name:
      JSON.parse(
        typeof window !== 'undefined' && localStorage.getItem('requestform')
      )?.name || '',
    mobile:
      JSON.parse(
        typeof window !== 'undefined' && localStorage.getItem('requestform')
      )?.mobile || '',
    email:
      JSON.parse(
        typeof window !== 'undefined' && localStorage.getItem('requestform')
      )?.email || '',
    gadget:
      JSON.parse(
        typeof window !== 'undefined' && localStorage.getItem('requestform')
      )?.gadget || '',
    brand:
      JSON.parse(
        typeof window !== 'undefined' && localStorage.getItem('requestform')
      )?.brand || '',
    model:
      JSON.parse(
        typeof window !== 'undefined' && localStorage.getItem('requestform')
      )?.model || '',
    deviceIssues:
      JSON.parse(
        typeof window !== 'undefined' && localStorage.getItem('requestform')
      )?.deviceIssues || '',
    comments:
      JSON.parse(
        typeof window !== 'undefined' && localStorage.getItem('requestform')
      )?.comments || '',
    pincode:
      JSON.parse(
        typeof window !== 'undefined' && localStorage.getItem('requestform')
      )?.pincode || '',
    address:
      JSON.parse(
        typeof window !== 'undefined' && localStorage.getItem('requestform')
      )?.address || '',
  });

  // EMAIL VALIDATION!

  let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

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
    setValues({ ...values, gadget: e.target.value });
    setGadgetId(e.target.value);
    const res = await fetch(
      `${API_URL}/getBrandList.php?gadget_id=${e.target.value}`
    );
    const data = await res.json();
    setBrandModel(data.data);
  };

  // FINAL SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
    }

    const res = await fetch(
      `${API_URL}/getDropPoint.php?pincode=${values.pincode}`
    );
    const data = await res.json();

    if (res.ok && regex.test(values.email)) {
      !hasEmptyFields && setIndex(3);
      setDropAddress(data?.data);
      localStorage.setItem('requestform', JSON.stringify({ ...values, plan }));
    } else {
      toast.error('Invalid email address');
    }
  };

  return (
    <Container>
      <Row className='justify-content-center align-items-center'>
        <Col lg={6}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {index === 0 && (
              <>
                <div>
                  <input
                    type='text'
                    name='name'
                    placeholder='Name'
                    className={styles.input}
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
                    className={styles.input}
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
                    className={styles.input}
                    value={values.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <select
                    name='gadget'
                    value={values.gadget}
                    onChange={handleBrandSelection}
                    className={styles.select2}
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
                <div className='d-flex justify-content-around'>
                  <select
                    name='brand'
                    value={values.brand}
                    onChange={handleModelSelection}
                    className={styles.select}
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
                    className={styles.select}
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
                <div className='text-center'>
                  <button className='button' onClick={() => setIndex(1)}>
                    Next
                  </button>
                </div>
              </>
            )}
            {index === 1 && (
              <>
                <div>
                  <select
                    name='deviceIssues'
                    value={values.deviceIssues}
                    onChange={handleInputChange}
                    className={styles.select2}
                    required
                  >
                    <option value='' disabled>
                      Select Issue
                    </option>
                    {problems.map((problem) => {
                      return (
                        <option
                          value={problem.deviceProblem}
                          key={problem.problemId}
                        >
                          {problem.deviceProblem}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <textarea
                    name='comments'
                    className={styles.input}
                    value={values.comments}
                    onChange={handleInputChange}
                    required
                    placeholder='Comments'
                  ></textarea>
                </div>
                <div>
                  <input
                    type='number'
                    name='pincode'
                    placeholder='Pincode'
                    className={styles.input}
                    value={values.pincode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type='text'
                    name='address'
                    placeholder='Address'
                    className={styles.input}
                    value={values.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='text-center'>
                  <IoIosArrowBack
                    onClick={() => setIndex(0)}
                    className={styles.back}
                  />
                  <button className='button' onClick={() => setIndex(2)}>
                    Next
                  </button>
                </div>
              </>
            )}
            {index === 2 && (
              <>
                <div
                  className={`${styles.card} ${plan === 0 && styles.border}`}
                  onClick={() => setPlan(0)}
                >
                  <h1>99₹</h1>
                  <h4>Free Pick-Drop</h4>
                  <p>Lorem Ipsum is simply dummy text of the printing and </p>
                </div>
                <div
                  className={`${styles.card} ${plan === 1 && styles.border}`}
                  onClick={() => setPlan(1)}
                >
                  <h1>395₹</h1>
                  <h4>Repair and Diagnose</h4>
                  <p>Lorem Ipsum is simply dummy text of the printing and </p>
                </div>
                <div className='text-center'>
                  <IoIosArrowBack
                    onClick={() => setIndex(1)}
                    className={styles.back}
                  />
                  <button className='button' type='submit'>
                    Submit
                  </button>
                </div>
              </>
            )}
            {index === 3 && (
              <>
                {dropAddress ? (
                  <>
                    <div
                      className={`${styles.card} ${
                        dropPoint === 0 && styles.border
                      }`}
                      onClick={() => setDropPoint(0)}
                    >
                      <GoLocation color='#f53855' fontSize='2rem' />
                      <h1>Pincode : {values.pincode}</h1>
                      <h4>Drop your device at</h4>
                      <p>
                        {dropAddress[0]?.dropPointName}{' '}
                        {dropAddress[0]?.dropPointAddress}
                      </p>
                    </div>
                    <div
                      className={`${styles.card} ${
                        dropPoint === 1 && styles.border
                      }`}
                      onClick={() => setDropPoint(1)}
                    >
                      <AiFillHome color='#f53855' fontSize='2rem' />

                      <h4>Doorstep</h4>
                      <p>{values.address}</p>
                    </div>
                    <div className='text-center'>
                      <IoIosArrowBack
                        onClick={() => setIndex(1)}
                        className={styles.back}
                      />
                      <button
                        className='button'
                        type='submit'
                        onClick={() => {
                          plan === 0 ? makePayment(99) : makePayment(395);
                        }}
                      >
                        Procced to Payment
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={`${styles.card} ${
                        dropPoint === 1 && styles.border
                      }`}
                      onClick={() => setDropPoint(1)}
                    >
                      <AiFillHome color='#f53855' fontSize='2rem' />
                      <h4>Doorstep</h4>
                      <p>{values.address}</p>
                    </div>
                    <div className='text-center'>
                      <IoIosArrowBack
                        onClick={() => setIndex(1)}
                        className={styles.back}
                      />
                      {isLoggedIn ? (
                        <button
                          className='button'
                          type='submit'
                          onClick={() => {
                            plan === 0 ? makePayment(99) : makePayment(395);
                          }}
                        >
                          Procced to Payment
                        </button>
                      ) : (
                        <Link href='/account/login?redirect=requestform'>
                          <a className='button text-white' type='submit'>
                            Log in
                          </a>
                        </Link>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </form>
        </Col>
        <Col lg={6}>
          <div className='d-flex justify-content-end my-3'>
            <Image src={illustration} alt='illustration' placeholder='blur' />
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  const { id } = parseCookies(req);

  return {
    props: {
      token,
      id,
    },
  };
};

export default RequestForm;
