import Image from 'next/image';
import { Col, Row } from 'react-bootstrap';
import illustration from '/public/images/track.png';
import { BsCheck2 } from 'react-icons/bs';
import styles from '@/styles/home/Tracker.module.css';
import { API_URL } from 'config';
import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

const Tracker = ({ token, id }) => {
  const { query } = useRouter();

  const trackId = query.trackingID;
  const callType = query.callType;

  const [number, setNumber] = useState('');

  useEffect(() => {
    setNumber(trackId);
  }, [trackId]);

  const [data, setData] = useState([]);

  const handleTracking = async (e) => {
    e.preventDefault();

    const trackingRes = await fetch(
      `${API_URL}/getTrackingDetails.php?trackingCode=${number}&callType=${callType}`,
      {
        headers: {
          Authorization: `${token}`,
          'API-KEY': `${id}`,
        },
      }
    );
    const trackingData = await trackingRes.json();

    if (trackingRes.ok) {
      setData(trackingData.data);
    } else {
      alert('something went wrong!');
    }
  };

  return (
    <Row className='align-items-center'>
      <Col lg={6}>
        <Image src={illustration} alt='illustration' placeholder='blur' />
      </Col>
      <Col lg={6}>
        <form className={styles.tracker} onSubmit={handleTracking}>
          <input
            type='text'
            placeholder='Enter the tracking id'
            name='trackingnumber'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <button>Track</button>
        </form>

        {data?.length > 1 ? (
          <section className='root'>
            <div className='order-track'>
              {data?.map((item, i) => {
                return (
                  <div className='order-track-step' key={i}>
                    <div className='order-track-status'>
                      <span
                        className={`order-track-status-dot ${
                          item.isDone === 0 ? 'dot-faded' : ''
                        }`}
                      >
                        {item.stepDate && <BsCheck2 className='check-icon' />}
                      </span>
                      <span className='order-track-status-line'></span>
                    </div>
                    <div className='order-track-text'>
                      <p className='order-track-text-stat'>{item.stepName}</p>
                      <span className='order-track-text-sub'>
                        {item.stepDate}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <h2>No data to show</h2>
        )}
      </Col>
    </Row>
  );
};

export default Tracker;
