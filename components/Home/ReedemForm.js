import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import styles from '@/styles/home/RequestForm.module.css';
import { API_URL } from '../../config';
import { useRouter } from 'next/router';
import { IoIosArrowBack } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const ReedemForm = ({
  problems,
  profileData,
  modalShow,
  setModalShow,
  reedemDet,
  redeemId,
  token,
  id,
}) => {
  const findSpecificDet = reedemDet.find(
    (item) => item.transactionNo === redeemId
  );

  const router = useRouter();

  const [index, setIndex] = useState(0);
  const [dropAddress, setDropAddress] = useState(null);

  // Add to values object at submit!
  const [dropType, setDropType] = useState(1);
  const [dropPointId, setDropPointId] = useState(0);

  console.log(dropPointId);

  const [values, setValues] = useState({
    name: profileData[0]?.custName,
    email: profileData[0]?.custEmail,
    mobile: profileData[0]?.custNumber,
    brand: findSpecificDet?.brandId,
    model: '',
    address: `${profileData[0]?.custAddress}, ${profileData[0]?.custCity}, ${profileData[0]?.custState}`,
    otherComments: '',
    deviceIssues: '',
    pincode: profileData[0]?.custPincode,
    gadgetId: findSpecificDet?.gadgetId,
    isRedirect: 1,
    packType: findSpecificDet?.spackId,
    transactionCode: findSpecificDet?.transactionNo,
  });

  // EMAIL VALIDATION!
  let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

  // PINCODE VALIDATION (INDIAN)!
  let regex2 = new RegExp('^([0-9]{4}|[0-9]{6})$');

  // HANDLING ALL INPUTS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleAdress = async () => {
    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );

    if (!regex.test(values.email)) {
      toast.error('Invalid email address');
    }

    if (!regex2.test(values.pincode)) {
      toast.error('Invalid pincode');
    }

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
    } else {
      const res = await fetch(
        `${API_URL}/getDropPoint.php?pincode=${values.pincode}`
      );
      const data = await res.json();

      if (res.ok) {
        !hasEmptyFields &&
          regex.test(values.email) &&
          regex2.test(parseInt(values.pincode)) &&
          setIndex(2);
        setDropAddress(data?.data);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/postRaiseRequest.php`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${token}`,
          'API-KEY': `${id}`,
        },
        method: 'POST',
        body: JSON.stringify({
          ...values,
          dropType: dropType.toString(),
          dropPointId: dropPointId.toString(),
        }),
      });
      const data = await res.json();

      if (res.ok) {
        router.reload();
        toast.success('Redeemed Successfullu');
        setModalShow(false);
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
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
          Redeem
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
                  required
                />
              </div>
              <div>
                <input
                  type='number'
                  name='mobile'
                  placeholder='Mobile'
                  className={styles.input}
                  value={values.mobile}
                  onChange={handleInputChange}
                  required
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
                  required
                />
              </div>
              <div>
                <input
                  type='text'
                  name='model'
                  placeholder='Enter Model name'
                  className={styles.input}
                  value={values.model}
                  onChange={handleInputChange}
                  required
                />
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
                  name='deviceIssues'
                  value={values.deviceIssues}
                  onChange={handleInputChange}
                  className={styles.select2}
                  required
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
                  name='otherComments'
                  className={styles.input}
                  value={values.otherComments}
                  onChange={handleInputChange}
                  required
                  placeholder='Comments'
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
                  required
                />
              </div>
              <div>
                <textarea
                  name='address'
                  placeholder='Address'
                  className={styles.input}
                  value={values.address}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className='text-center'>
                <IoIosArrowBack
                  onClick={() => setIndex(0)}
                  className={styles.back}
                />
                <a
                  className='button text-white'
                  onClick={() => {
                    handleAdress();
                  }}
                >
                  Next
                </a>
              </div>
            </>
          )}
          {index === 2 && (
            <>
              {dropAddress ? (
                <>
                  {dropAddress?.map((item, i) => {
                    return (
                      <div
                        key={i}
                        className={`${styles.card} ${
                          dropType === 2 && styles.border
                        }`}
                        onClick={() => {
                          setDropType(2);
                          setDropPointId(item?.dropPointId);
                        }}
                      >
                        <GoLocation color='#f53855' fontSize='2rem' />
                        <h1>Pincode : {values.pincode}</h1>
                        <h4>Drop your device at</h4>
                        <p>
                          {item?.dropPointName} {item?.dropPointAddress}
                        </p>
                      </div>
                    );
                  })}
                  <div
                    className={`${styles.card} ${
                      dropType === 1 && styles.border
                    }`}
                    onClick={() => setDropType(1)}
                  >
                    <AiFillHome color='#f53855' fontSize='2rem' />

                    <h4>Doorstep</h4>
                    <p>{values.address}</p>
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
              ) : (
                <>
                  <div
                    className={`${styles.card} ${
                      dropType === 1 && styles.border
                    }`}
                    onClick={() => setDropType(1)}
                  >
                    <AiFillHome color='#f53855' fontSize='2rem' />
                    <h4>Doorstep</h4>
                    <p>{values.address}</p>
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
            </>
          )}
        </form>
        <ToastContainer />
      </Modal.Body>
    </Modal>
  );
};

export default ReedemForm;
