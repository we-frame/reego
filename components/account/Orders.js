import React, { useState } from 'react';
import styles from '@/styles/account/Orders.module.css';
import Rating from '../Utils/Rating';
import { Modal } from 'react-bootstrap';
import styles2 from '@/styles/home/RequestForm.module.css';
import { API_URL } from 'config';
import { useRouter } from 'next/dist/client/router';
import { AiOutlineRight } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Orders = ({ token, id, orders }) => {
  const [modalShow, setModalShow] = useState(false);

  const [rating, setRating] = useState(3);
  const [ratingVal, setRatingVal] = useState([1, 2, 3, 4, 5]);
  const [review, setReview] = useState('');

  const [infos, setInfos] = useState({});

  console.log(infos);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/postCustomerReview.php`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${token}`,
          'API-KEY': `${id}`,
        },
        body: JSON.stringify({
          callType: infos.callType,
          callId: infos.callId,
          rating,
          comment: review,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setModalShow(false);
        router.reload();
        toast.success('Review added successfully');
      } else {
        toast.error('Something went wrong');
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  return (
    <section>
      <h4>My Orders</h4>
      <hr />
      <div>
        {orders?.map((order, i) => {
          return (
            <div className={styles.ordersComp} key={i}>
              <h5>{order?.status}</h5>
              <p>{order.createdOn}</p>
              <div>
                <div className='d-flex align-items-center justify-content-between'>
                  <h3>
                    {order?.brandName} {order?.model}
                  </h3>
                  <div
                    onClick={() =>
                      router.push(`/?trackingID=${order?.trackingCode}`)
                    }
                  >
                    <AiOutlineRight
                      fontSize='1.5rem'
                      className='me-5'
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </div>
                <p>{order?.deviceProblems}</p>
                <p>Tracking no : {order?.trackingCode}</p>
                <div className='d-flex align-items-center justify-content-between'>
                  <div>
                    <Rating rating={order?.custRatings} />
                  </div>

                  <button
                    className='button'
                    onClick={() => {
                      setModalShow(true);
                      setInfos({
                        callType: order?.callType,
                        callId: order?.callId,
                      });
                    }}
                  >
                    Write a review
                  </button>
                </div>
              </div>
            </div>
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
            Add Review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <select
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              name='rating'
              className={styles2.select2}
            >
              <option value='' disabled>
                Select
              </option>
              {ratingVal.map((rate) => {
                return (
                  <option value={rate} key={rate}>
                    {rate}
                  </option>
                );
              })}
            </select>
            <div>
              <input
                type='text'
                name='review'
                placeholder='review'
                className={styles2.input}
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
            <button className='button'>SUBMIT</button>
          </form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </section>
  );
};

export default Orders;
