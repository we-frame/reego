import { useState } from 'react';
import Image from 'next/image';
import { IoMdAddCircle } from 'react-icons/io';
import { FaMobile } from 'react-icons/fa';
import Layout2 from '@/components/Utils/Layout2';
import Seo from '@/components/Utils/Seo';
import family from '/public/images/Family.png';
import styles from '@/styles/account/Orders.module.css';
import styles2 from '@/styles/home/RequestForm.module.css';
import { Modal } from 'react-bootstrap';

const AddPage = () => {
  const [modalShow, setModalShow] = useState(false);

  const [values, setValues] = useState({
    name: '',
    number: '',
    purchase: '',
    relation: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Layout2>
      <Seo title='Add' />
      <div className='text-center'>
        <h3>Add a family member</h3>
        <IoMdAddCircle
          size='3rem'
          color='#F53838'
          style={{ cursor: 'pointer' }}
          onClick={() => setModalShow(true)}
        />
      </div>
      <div className={styles.ordersComp}>
        <h4>Tharun</h4>
        <hr />
        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center'>
            <FaMobile size='3rem' color='#F53838' />
            <div className='ms-4'>
              <h4 className='my-3'>Iphone - 13</h4>
              <h6>My Brother</h6>
              <p>20th november</p>
            </div>
          </div>
          <Image
            src={family}
            alt='family'
            placeholder='blur'
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className={styles.ordersComp}>
        <h4>Tharun</h4>
        <hr />
        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center'>
            <FaMobile size='3rem' color='#F53838' />
            <div className='ms-4'>
              <h4 className='my-3'>Iphone - 13</h4>
              <h6>My Brother</h6>
              <p>20th november</p>
            </div>
          </div>
          <Image
            src={family}
            alt='family'
            placeholder='blur'
            width={200}
            height={200}
          />
        </div>
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
            Add Member
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type='text'
                name='name'
                placeholder='Name'
                className={styles2.input}
                value={values.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type='number'
                name='number'
                placeholder='Mobile'
                className={styles2.input}
                value={values.number}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type='text'
                name='purchase'
                placeholder='Date Of Purchase'
                className={styles2.input}
                value={values.purchase}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type='text'
                name='relation'
                placeholder='Relation'
                className={styles2.input}
                value={values.relation}
                onChange={handleInputChange}
              />
            </div>
            <div className='text-center'>
              <button className='button'>Add</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </Layout2>
  );
};

export default AddPage;
