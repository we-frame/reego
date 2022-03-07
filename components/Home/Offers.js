import { Row, Col } from 'react-bootstrap';
import styles from '@/styles/home/Offers.module.css';
import { useContext } from 'react';
import { StateContext } from 'context/StateProvider';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';

const Offers = ({ offerData }) => {
  const { isLoggedIn } = useContext(StateContext);

  const router = useRouter();

  const handleCheckout = (title, price, about) => {
    typeof window !== 'undefined' &&
      localStorage.setItem(
        'checkoutDet',
        JSON.stringify({
          price,
          title,
          desc: about,
        })
      );
    isLoggedIn
      ? router.push('/checkout')
      : router.push('/account/login?redirect=checkout');
  };

  return (
    <section>
      <h1 className='color text-center'>Offers</h1>
      <p className={styles.myWidth}>
        typesetting industry. Lorem Ipsum has been the industrys standard dummy
        text ever since the 1500s, when an unknown
      </p>
      <Row className='my-3'>
        {offerData.map((data, i) => {
          return (
            <Col lg={4} key={i}>
              <div className={`${styles.card} offer-card`}>
                <h4 className='text-center my-5'>{data?.title}</h4>
                <ReactMarkdown>{data?.aboutPack}</ReactMarkdown>
                <h3 className='text-center'>₹{data?.mrpPrice}</h3>
                <div className='d-flex justify-content-center'>
                  {isLoggedIn ? (
                    <button
                      className='button'
                      onClick={() =>
                        handleCheckout(
                          data?.title,
                          data?.mrpPrice,
                          data?.aboutPack
                        )
                      }
                    >
                      Checkout
                    </button>
                  ) : (
                    <button
                      className='button'
                      onClick={() =>
                        handleCheckout(
                          data?.title,
                          data?.mrpPrice,
                          data?.aboutPack
                        )
                      }
                    >
                      Login to checkout
                    </button>
                  )}
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </section>
  );
};

export default Offers;
