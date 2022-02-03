import Seo from '@/components/Utils/Seo';
import React from 'react';
import { Container } from 'react-bootstrap';

const cart = () => {
  return (
    <>
      <Seo title='Cart' />
      <Container>
        <h1 className='text-center'>cart page!</h1>
      </Container>
    </>
  );
};

export default cart;
