import React from 'react';
import { Container } from 'react-bootstrap';
import Seo from '@/components/Utils/Seo';
import ContactForm from '@/components/contact/ContactForm';
import Map from '@/components/contact/Map';
import DownloadApp from '@/components/Home/DownloadApp';

const contact = () => {
  return (
    <>
      <Seo title='Contact us' />
      <Container>
        <ContactForm />
      </Container>
      <Map />
      <Container>
        <h1 className='mt-5'>Our office</h1>
        <p>
          Horizon Flora, Office 1, Ghodbunder Rd, Bhayandarpada, Thane West,
          Thane, Maharashtra 400615
        </p>
        <p className='text-secondary'>Mob.8298229829</p>
        {/* <p className='text-secondary'>Mob.+9710123457</p> */}
        <div style={{ borderBottom: '1px solid #B8B8B8' }}></div>
        <DownloadApp />
      </Container>
    </>
  );
};

export default contact;
