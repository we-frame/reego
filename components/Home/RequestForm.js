import Image from 'next/image';
import { useState } from 'react';
import illustration from '/public/images/form.png';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '@/styles/home/RequestForm.module.css';
import { IoIosArrowBack } from 'react-icons/io';
import { API_URL } from 'config';

const RequestForm = ({ brandList, problems }) => {
  const [index, setIndex] = useState(0);
  const [mobileModel, setMobileModel] = useState([]);

  //   AFTER CLICKING ON SUBMIT!
  //   const [choice,setChoice] = useState(null)

  const [values, setValues] = useState({
    name: '',
    number: '',
    email: '',
    brand: '',
    model: '',
    issue: '',
    comments: 'Comments',
    pincode: '',
    address: '',
  });

  const [plan, setPlan] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleModelSelection = async (e) => {
    setValues({ ...values, brand: e.target.value });

    const res = await fetch(
      `${API_URL}/getModelsList.php?brand_id=${e.target.value}`
    );
    const data = await res.json();
    setMobileModel(data.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
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
                  <select
                    name='brand'
                    value={values.brand}
                    onChange={handleModelSelection}
                    className={styles.select}
                  >
                    <option value='' disabled>
                      Select Brand
                    </option>
                    {brandList.map((brand) => {
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
                  >
                    <option value='' disabled>
                      Select Model
                    </option>
                    {mobileModel?.map((model) => {
                      return (
                        <option value={model.name} key={model.id}>
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
                    name='issue'
                    value={values.issue}
                    onChange={handleInputChange}
                    className={styles.select2}
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
