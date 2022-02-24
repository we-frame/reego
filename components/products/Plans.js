import styles from '@/styles/products/Plans.module.css';
import { Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import { API_URL } from 'config';
import { useRouter } from 'next/dist/client/router';
import { parseCookies } from 'helpers';

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  console.log(!token);
  const { id } = parseCookies(req);

  const res = await fetch(`${API_URL}/getUserDetails.php`, {
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
      profile: data.data,
    },
  };
};

const Plans = ({ brandList, short, title, points }) => {
  const router = useRouter();
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
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
    console.log("here...");
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", { method: "POST", body: JSON.stringify({ amount: amt }) }).then((t) =>
      t.json()
    );
    console.log(data);
    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "Reego",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Reego Description",
      image: "https://kaudible.kodagu.today/assets/ff06665a-af2c-4f10-b5d5-111af6832d13",
      handler: function (response) {
        router.push("/success");
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: "Weframe Tech",
        email: "weframe@gmail.com",
        contact: "9999999999",
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response) {
      router.push("/fail");
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });
    paymentObject.open();
  };
  const [values, setValues] = useState({
    price: '',
    date: '',
    brand: '',
    gadget: '1', // harcoded to 1 because this is a mobile page
  });

  console.log(values.date);

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
    }
  };

  console.log(detailsData);

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
                  type='date'
                  name='date'
                  placeholder='2022-02-01'
                  className={styles.input}
                  value={values.date}
                  onChange={handleInputChange}
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
            <button className='button' onClick={() => { makePayment(parseInt(detailsData)) }}>Buy Now</button>
          </div>
        </>
      )}
    </section>
  );
};

export default Plans;
