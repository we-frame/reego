import { Container } from 'react-bootstrap';
import Seo from '@/components/Utils/Seo';
import DownloadApp from '@/components/Home/DownloadApp';
import Testimonials from '@/components/Home/Testimonials';
import Plans from '@/components/products/Plans';
import TableInfo from '@/components/products/TableInfo';
import Faqs from '@/components/products/Faqs';

const ExtendedWarrantyPage = () => {
  return (
    <>
      <Seo title='Extended Warranty' />
      <Container>
        <Plans
          short='EW'
          title='Extended Warranty'
          points={[
            {
              id: 1,
              point:
                'Extends your warranty of your Mobile Phone for additional one year',
            },
            { id: 2, point: 'Covers Malfunctions & Breakdowns' },
            { id: 3, point: 'Easy process, hassle-free' },
            { id: 4, point: 'Free Pick & Drop' },
          ]}
        />
        <TableInfo />
        <Faqs />
        <Testimonials />
        <DownloadApp />
      </Container>
    </>
  );
};

export default ExtendedWarrantyPage;
