import styles from '@/styles/products/Plans.module.css';
import { Col, Row } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { API_URL } from 'config';
import moment from 'moment';
import { StateContext } from 'context/StateProvider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Plans = ({ brandList, short, title, points }) => {
  const { isLoggedIn } = useContext(StateContext);

  const router = useRouter();

  const [values, setValues] = useState({
    price: '',
    date: '',
    brand: '',
    gadget: '1', // harcoded to 1 because this is a mobile page
  });

  const [detailsData, setDetailsData] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleModelSelection = async (e) => {
    setValues({ ...values, brand: e.target.value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(
      `${API_URL}/getDevicePlanList.php?devicePrice=${values.price}&devicePurchase=${values.date}&brandId=${values.brand}&gadgetId=1`
    );
    const data = await res.json();

    if (res.ok) {
      if (data?.data !== undefined) {
        setDetailsData(data?.data);
        setLoading(false);
        window.location.href = '#plans';
      } else {
        console.log('error!');
        setLoading(false);
        toast.error('Could not find plans based on your price!');
      }
    }
  };

  const handleCheckout = (price) => {
    typeof window !== 'undefined' &&
      localStorage.setItem(
        'checkoutDet',
        JSON.stringify({
          price,
          title,
          points,
        })
      );
    isLoggedIn
      ? router.push('/checkout')
      : router.push('/account/login?redirect=checkout');
  };

  return (
    <>
      <section className='my-5'>
        <Row className='align-items-center'>
          <Col lg={5}>
            <div className={styles.card}>
              <div className='text-center'>
                <button className='button-rounded'>{short}</button>
              </div>
              <h3 className='text-center my-5'>{title}</h3>
              <ul className='mb-5'>
                {points.map((item) => {
                  return (
                    <li className={styles.li} key={item.id}>
                      {item.point}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Col>
          <Col lg={7}>
            <>
              <h4 className='my-4 text-center'>
                Explore Plans for your device
              </h4>
              <form className={styles.form} onSubmit={handleSubmit}>
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
                  {brandList?.map((brand) => {
                    return (
                      <option value={brand.brand_id} key={brand.brand_id}>
                        {brand.brand_name}
                      </option>
                    );
                  })}
                </select>
                {/* <select
                name='model'
                value={values.model}
                onChange={handleInputChange}
                className={styles.select}
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
              </select> */}
                <div>
                  <label
                    htmlFor='date'
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
                    name='date'
                    placeholder='2022-02-01'
                    className={styles.input}
                    value={values.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type='number'
                    name='price'
                    placeholder='Device Price'
                    className={styles.input}
                    value={values.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {loading ? (
                  <div className='d-grid gap-2'>
                    <button className='button opacity-50'>Loading...</button>
                  </div>
                ) : (
                  <div className='d-grid gap-2'>
                    <button className='button'>View Plans</button>
                  </div>
                )}
              </form>
            </>
          </Col>
        </Row>
        <section id='plans'>
          <h2 className='my-5 text-center fw-bold'>Plans for your device</h2>
          {detailsData &&
            detailsData?.map((item, i) => {
              return (
                <div key={i}>
                  <div className={styles.card2}>
                    <h3>Device Price</h3>
                    <h4>₹{item?.spackPrice}</h4>
                    <div className={styles.highlight}>₹1,000/year</div>
                    <p>
                      Note: These plans only covers Mobile Phones that have been
                      purchased on 12th November 2021.
                    </p>
                  </div>
                  <div className='text-center my-4'>
                    {isLoggedIn ? (
                      <button
                        className='button'
                        onClick={() => handleCheckout(item?.spackPrice)}
                      >
                        Checkout
                      </button>
                    ) : (
                      <button
                        className='button'
                        onClick={() => handleCheckout(item?.spackPrice)}
                      >
                        Login to checkout
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </section>
      </section>
      <ToastContainer />
    </>
  );
};

export default Plans;
