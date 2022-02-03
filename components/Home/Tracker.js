import Image from 'next/image';
import { Col, Row } from 'react-bootstrap';
import illustration from '/public/images/track.png';
import { BsCheck2 } from 'react-icons/bs';

const Tracker = () => {
  const data = [
    {
      step_name: 'Call Raised',
      step_date: '29 Nov 2021 04:57 PM',
      isDone: true,
    },
    {
      step_name: 'Pickup Initiated',
      step_date: '02 DEC 2021 01:57 PM',
      isDone: true,
    },
    {
      step_name: 'Drop at HUB',
      step_date: '03 DEC 2021 02:17 PM',
      isDone: true,
    },
    {
      step_name: 'Ready For Delivery',
      step_date: '',
      isDone: true,
    },
    {
      step_name: 'Out For Delivery',
      step_date: '',
      isDone: false,
    },
    {
      step_name: 'Delivered',
      step_date: '',
      isDone: false,
    },
  ];

  return (
    <Row>
      <Col lg={6}>
        <Image src={illustration} alt='illustration' placeholder='blur' />
      </Col>
      <Col lg={6}>
        <section className='root'>
          <div className='order-track'>
            {data.map((item, i) => {
              return (
                <div className='order-track-step' key={i}>
                  <div className='order-track-status'>
                    <span
                      className={`order-track-status-dot ${
                        !item.isDone && 'dot-faded'
                      }`}
                    >
                      {item.isDone && <BsCheck2 className='check-icon' />}
                    </span>
                    <span className='order-track-status-line'></span>
                  </div>
                  <div className='order-track-text'>
                    <p className='order-track-text-stat'>{item.step_name}</p>
                    <span className='order-track-text-sub'>
                      {item.step_date}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </Col>
    </Row>
  );
};

export default Tracker;
