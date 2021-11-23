import Image from 'next/image';
import { useState } from 'react';
import illustration from '/public/images/form.png';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '@/styles/home/RequestForm.module.css';
import { IoIosArrowBack } from 'react-icons/io';

const RequestForm = () => {
  const [index, setIndex] = useState(0);

  //   AFTER CLICKING ON SUBMIT!
  //   const [choice,setChoice] = useState(null)

  const [values, setValues] = useState({
    name: '',
    number: '',
    email: '',
    comments: 'Comments',
    pincode: '',
    address: '',
  });

  const [plan, setPlan] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
                  />
                </div>
                <div>
                  <input
                    type='number'
                    name='number'
                    placeholder='Mobile'
                    className={styles.input}
                    value={values.number}
                    onChange={handleInputChange}
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
                  />
                </div>
                <div className='d-flex justify-content-around'>
                  <select className={styles.select}>
                    <option defaultValue='Brand'>Select Brand</option>
                  </select>
                  <select className={styles.select}>
                    <option defaultValue='Brand'>Select Model</option>
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
                  <select className={styles.input}>
                    <option defaultValue='Brand'>Issue</option>
                  </select>
                </div>
                <div>
                  <textarea
                    name='comments'
                    className={styles.input}
                    value={values.comments}
                    onChange={handleInputChange}
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
          </form>
        </Col>
        <Col lg={6}>
          <div className='d-flex justify-content-end my-3'>
            <Image src={illustration} alt='illustration' placeholder='blur' />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RequestForm;
