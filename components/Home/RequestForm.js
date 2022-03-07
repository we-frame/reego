import Image from 'next/image';
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
import ModalLogin from './ModalLogin';

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
          dropType: dropType.toString(),
          dropPointId: dropPointId.toString(),
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

  const [modalShow, setModalShow] = useState(false);

  // Add to values object at submit!
  const [plan, setPlan] = useState(1);
  const [dropType, setDropType] = useState(1);
  const [dropPointId, setDropPointId] = useState(0);

  const [values, setValues] = useState({
    name: '',
    mobile: '',
    email: '',
    gadget: '',
    brand: '',
    model: '',
    deviceIssues: '',
    comments: '',
    pincode: '',
    address: '',
  });

  // EMAIL VALIDATION!

  let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

  // PINCODE VALIDATION (INDIAN)!
  let regex2 = new RegExp('[1-9]{1}[0-9]{5}|[1-9]{1}[0-9]{3}\\s[0-9]{3}');

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

    if (!regex.test(values.email)) {
      toast.error('Invalid email address');
    }

    if (!regex2.test(values.pincode)) {
      toast.error('Invalid pincode');
    }

    if (res.ok) {
      !hasEmptyFields &&
        regex.test(values.email) &&
        regex2.test(parseInt(values.pincode)) &&
        setIndex(3);
      setDropAddress(data?.data);
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
                <div className='d-flex justify-content-between'>
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
                  className={`${styles.card} ${plan === 1 && styles.border}`}
                  onClick={() => setPlan(1)}
                >
                  <h1>99₹</h1>
                  <h4>Free Pick-Drop</h4>
                  <p>Lorem Ipsum is simply dummy text of the printing and </p>
                </div>
                <div
                  className={`${styles.card} ${plan === 2 && styles.border}`}
                  onClick={() => setPlan(2)}
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
                    {dropAddress?.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className={`${styles.card} ${
                            dropType === 2 && styles.border
                          }`}
                          onClick={() => {
                            setDropType(2);
                            setDropPointId(item?.dropPointId);
                          }}
                        >
                          <GoLocation color='#f53855' fontSize='2rem' />
                          <h1>Pincode : {values.pincode}</h1>
                          <h4>Drop your device at</h4>
                          <p>
                            {item?.dropPointName} {item?.dropPointAddress}
                          </p>
                        </div>
                      );
                    })}
                    <div
                      className={`${styles.card} ${
                        dropType === 1 && styles.border
                      }`}
                      onClick={() => setDropType(1)}
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
                            plan === 1 ? makePayment(99) : makePayment(395);
                          }}
                        >
                          Procced to Payment
                        </button>
                      ) : (
                        <button
                          onClick={() => setModalShow(true)}
                          className='button text-white'
                        >
                          Log in
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={`${styles.card} ${
                        dropType === 1 && styles.border
                      }`}
                      onClick={() => setDropType(1)}
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
                            plan === 1 ? makePayment(99) : makePayment(395);
                          }}
                        >
                          Procced to Payment
                        </button>
                      ) : (
                        <button
                          onClick={() => setModalShow(true)}
                          className='button text-white'
                        >
                          Log in
                        </button>
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
      {modalShow && (
        <ModalLogin modalShow={modalShow} setModalShow={setModalShow} />
      )}
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
