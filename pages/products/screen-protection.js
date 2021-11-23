import DownloadApp from '@/components/Home/DownloadApp';
import Testimonials from '@/components/Home/Testimonials';
import Plans from '@/components/products/Plans';
import TableInfo from '@/components/products/TableInfo';
import Seo from '@/components/Utils/Seo';
import React from 'react';
import { Container } from 'react-bootstrap';

const ScreenProtectionPage = () => {
  return (
    <>
      <Seo title='Screen Protection' />
      <Container>
        <Plans
          short='SDI'
          title='Screen Damage Insurance'
          points={[
            { id: 1, point: 'Broken, Cracked, Shattered Screens Covered' },
            { id: 2, point: 'Easy Claim, Hassle Free' },
            { id: 3, point: 'Repair or replacement guaranteed' },
          ]}
        />
        <TableInfo />
        <Testimonials />
        <DownloadApp />
      </Container>
    </>
  );
};

export default ScreenProtectionPage;
