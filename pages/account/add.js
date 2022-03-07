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
import { API_URL } from 'config';
import { parseCookies } from 'helpers';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import moment from 'moment';

const AddPage = ({ token, id, brandList, famData }) => {
  const [modalShow, setModalShow] = useState(false);
  const [mobileModel, setMobileModel] = useState([]);

  const [familyDetails, setFamilyDetails] = useState(famData.data);

  const router = useRouter();

  const [values, setValues] = useState({
    name: '',
    mobile: '',
    dop: '',
    relation: '',
    brandId: '',
    model: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleModelSelection = async (e) => {
    setValues({ ...values, brandId: e.target.value });

    const res = await fetch(
      `${API_URL}/getModelsList.php?brand_id=${e.target.value}`
    );
    const data = await res.json();
    setMobileModel(data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/postAddFamilyDevice.php`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${token}`,
          'API-KEY': `${id}`,
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.ok) {
        setModalShow(false);
        router.reload();
        // setFamilyDetails([data.data, ...familyDetails]);
        toast.success('Member added successfully');
      } else {
        toast.error('Something went wrong');
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
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
      {famData.length === 0 && <h4>No family members to show</h4>}
      {familyDetails?.map((item) => {
        return (
          <div className={styles.ordersComp} key={item.id}>
            <h4>{item.memberName}</h4>
            <hr />
            <div className='d-flex align-items-center justify-content-between flex-wrap'>
              <div className='d-flex align-items-center'>
                <FaMobile size='3rem' color='#F53838' />
                <div className='ms-4'>
                  <h4 className='my-3'>
                    {item.brand} {item.model}
                  </h4>
                  <h6>{item.relation}</h6>
                  <p>{item.dop}</p>
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
        );
      })}
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
                required
              />
            </div>
            <div>
              <input
                type='number'
                name='mobile'
                placeholder='Mobile Number'
                className={styles2.input}
                value={values.mobile}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='d-flex justify-content-around'>
              <select
                name='brandId'
                value={values.brandId}
                onChange={handleModelSelection}
                className={styles2.select}
                required
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
              <select
                name='model'
                value={values.model}
                onChange={handleInputChange}
                className={styles2.select}
                required
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
              </select>
            </div>
            <div>
              <input
                type='date'
                max={moment().format('YYYY-MM-DD')}
                name='dop'
                placeholder='Date Of Purchase'
                className={styles2.input}
                value={values.dop}
                onChange={handleInputChange}
                required
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
                required
              />
            </div>
            <div className='text-center'>
              <button className='button'>Add</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </Layout2>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  const { id } = parseCookies(req);

  // BRAND LIST!
  const brandRes = await fetch(`${API_URL}/getBrandList.php`);
  const brandData = await brandRes.json();

  // FAMILY DETAILS!
  const famDet = await fetch(`${API_URL}/getFamilyDetails.php`, {
    headers: {
      Authorization: `${token}`,
      'API-KEY': `${id}`,
    },
  });
  const famData = await famDet.json();

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
      famData: famData ? famData : [],
      brandList: brandData.data,
      token,
      id,
    },
  };
};

export default AddPage;
