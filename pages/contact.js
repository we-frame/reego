import React from 'react';
import { Container } from 'react-bootstrap';
import Seo from '@/components/Utils/Seo';
import ContactForm from '@/components/contact/ContactForm';
import Map from '@/components/contact/Map';
import DownloadApp from '@/components/Home/DownloadApp';

const contact = () => {
  return (
    <>
      <Container>
        <Seo title='Contact us' />
        <ContactForm />
      </Container>
      <Map />
      <Container>
        <h1 className='mt-5'>Our office</h1>
        <p>
          Khalidia, Sons of Darwish Buidling, 1st Foor Office 103, P.O. Box:
          26234, Abu Dhabi, UAE
        </p>
        <p className='text-secondary'>Tel.+9710123457</p>
        <p className='text-secondary'>Mob.+9710123457</p>
        <div style={{ borderBottom: '1px solid #B8B8B8' }}></div>
        <DownloadApp />
      </Container>
    </>
  );
};

export default contact;
