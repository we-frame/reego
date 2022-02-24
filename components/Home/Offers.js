import { Row, Col } from 'react-bootstrap';
import styles from '@/styles/home/Offers.module.css';
import { useRouter } from 'next/dist/client/router';
import { useContext, useState } from 'react';
import { StateContext } from 'context/StateProvider';
import Link from 'next/link';

const Offers = ({ profileData }) => {
  console.log(profileData);

  const router = useRouter();
  const { isLoggedIn } = useContext(StateContext);
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
    console.log('here...');
    const res = await initializeRazorpay();

    if (!res) {
      alert('Razorpay SDK Failed to load');
      return;
    }
    const data = await fetch('/api/razorpay', {
      method: 'POST',
      body: JSON.stringify({ amount: amt }),
    }).then((t) => t.json());
    console.log(data);
    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: 'Reego',
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: 'Reego Description',
      image:
        'https://kaudible.kodagu.today/assets/ff06665a-af2c-4f10-b5d5-111af6832d13',
      handler: async function (response) {
        // var ss = JSON.stringify({
        //   "name": profileData[0].custName,
        //   "email": profileData[0].custEmail,
        //   "brand": "1",
        //   "model": "1",
        //   "imeiNo": "mum",
        //   "packType": "1",
        //   "gadgetId": "1",
        //   "paymentId": response.razorpay_payment_id.toString(),
        //   "paymentRequest": JSON.stringify(options),
        //   "paymentResponse": JSON.stringify(response),
        //   "paymentStatus": "success",
        //   "purchaseDate": Date.now().toString(),
        //   "imgInvoice": "",
        // });
        // const res22 = await fetch(`${API_URL}/postPurchasePacks.php`, {
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     Authorization: `${token}`,
        //     'API-KEY': `${id}`,
        //   },
        //   method: 'POST',
        //   body: ss,
        // });
        // const data22 = await res22.json();
        // if (data22.status) {
          router.push('/success');
        // } else {
        //   router.push('/fail');
        // }
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response) {
      router.push('/fail');
    });
    paymentObject.open();
  };
  return (
    <section>
      <h1 className='color text-center'>Offers</h1>
      <p className={styles.myWidth}>
        typesetting industry. Lorem Ipsum has been the industrys standard dummy
        text ever since the 1500s, when an unknown
      </p>
      <Row className='my-3'>
        <Col lg={4}>
          <div className={styles.card}>
            <h4 className='text-center my-5'>Free Pick & Drop At Rs 99</h4>
            <ul className='mb-5'>
              <li className={styles.li}>Doorstep pick & drop</li>
              <li className={styles.li}>Hassle free</li>
              <li className={styles.li}>Get free estimation</li>
              <li className={styles.li}>At No extra cost of reaching to you</li>
            </ul>
            <h3 className='text-center'>₹99</h3>
            <div className='d-flex justify-content-center'>
              {isLoggedIn ? (
                <button
                  className={styles.button1}
                  onClick={() => {
                    makePayment(99);
                  }}
                >
                  BUY NOW
                </button>
              ) : (
                <Link href='/account/login?redirect=offers'>
                  <a className={styles.button1}>Log in</a>
                </Link>
              )}
            </div>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`${styles.card} ${styles.card2}`}>
            <h4 className='text-center my-5'>Repair and Service</h4>
            <ul className='mb-5'>
              <li className={styles.li}>Free Pick & Drop</li>
              <li className={styles.li}>No extra Service charges</li>
              <li className={styles.li}>Only Spare parts cost, included</li>
              <li className={styles.li}>Hassle Free and stress free</li>
              <li className={styles.li}>Free estimation and quality checks</li>
            </ul>
            <h3 className='text-center'>₹450</h3>
            <div className='d-flex justify-content-center'>
              {isLoggedIn ? (
                <button
                  className={styles.button1}
                  onClick={() => {
                    makePayment(450);
                  }}
                >
                  BUY NOW
                </button>
              ) : (
                <Link href='/account/login?redirect=offers'>
                  <a className={styles.button1}>Log in</a>
                </Link>
              )}
            </div>
          </div>
        </Col>
        <Col lg={4}>
          <div className={styles.card}>
            <h4 className='text-center my-5'>
              Doosra Subscription with Free Pick and Drop
            </h4>
            <ul className='mb-5'>
              <li className={styles.li}>Get 1-month Doosra Subscription</li>
              <li className={styles.li}>At No Extra Cost</li>
              <li className={styles.li}>Get free estimation</li>
              <li className={styles.li}>Free Pick & Drop and Estimation</li>
            </ul>
            <h3 className='text-center'>₹99</h3>
            <div className='d-flex justify-content-center'>
              {isLoggedIn ? (
                <button
                  className={styles.button1}
                  onClick={() => {
                    makePayment(99);
                  }}
                >
                  BUY NOW
                </button>
              ) : (
                <Link href='/account/login?redirect=offers'>
                  <a className={styles.button1}>Log in</a>
                </Link>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default Offers;
