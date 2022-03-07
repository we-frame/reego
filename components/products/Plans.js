import styles from '@/styles/products/Plans.module.css';
import { Col, Row } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { API_URL } from 'config';
import moment from 'moment';
import Link from 'next/link';
import { StateContext } from 'context/StateProvider';

const Plans = ({ brandList, short, title, points }) => {
  const { isLoggedIn } = useContext(StateContext);

  const [values, setValues] = useState({
    price: '',
    date: '',
    brand: '',
    gadget: '1', // harcoded to 1 because this is a mobile page
  });

  const [detailsData, setDetailsData] = useState(null);

  const handleModelSelection = async (e) => {
    setValues({ ...values, brand: e.target.value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${API_URL}/getDevicePlanList.php?devicePrice=${values.price}&devicePurchase=${values.date}&brandId=${values.brand}&gadgetId=1`
    );
    const data = await res.json();

    if (res.ok) {
      setDetailsData(data?.data[0]?.spackPrice);
      typeof window !== 'undefined' &&
        localStorage.setItem(
          'checkoutDet',
          JSON.stringify({
            price: data?.data[0]?.spackPrice,
            title,
            points,
          })
        );
    }
  };

  return (
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
            <h4 className='my-4 text-center'>Explore Plans for your device</h4>
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
              <div className='d-grid gap-2'>
                <button className='button'>View Plans</button>
              </div>
            </form>
          </>
        </Col>
      </Row>
      {detailsData && (
        <>
          <h2 className='my-5 text-center fw-bold'>Plans for your device</h2>
          <div className={styles.card2}>
            <h3>Device Price</h3>
            <h4>₹{detailsData}</h4>
            <div className={styles.highlight}>₹1,000/year</div>
            <p>
              Note: These plans only covers Mobile Phones that have been
              purchased on 12th November 2021.
            </p>
          </div>
          <div className='text-center my-4'>
            {isLoggedIn ? (
              <Link href='/checkout'>
                <a className='button text-white'>Checkout</a>
              </Link>
            ) : (
              <Link href='/account/login?redirect=checkout'>
                <a className='button text-white'>Log in to checkout</a>
              </Link>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Plans;
