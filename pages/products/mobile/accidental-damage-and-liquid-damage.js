import DownloadApp from '@/components/Home/DownloadApp';
import Testimonials from '@/components/Home/Testimonials';
import Faqs from '@/components/products/Faqs';
import Plans from '@/components/products/Plans';
import TableInfo from '@/components/products/TableInfo';
import Seo from '@/components/Utils/Seo';
import { API_URL } from 'config';
import { Container } from 'react-bootstrap';

const AccidentalPage = ({ brandList }) => {
  return (
    <>
      <Seo title='Accidental Damage and Liquid Damage' />
      <Container>
        <Plans
          brandList={brandList}
          short='ADLD'
          title='Accidental Damage and Liquid Damage'
          points={[
            { id: 1, point: 'Any Physical and Liquid damage ' },
            { id: 2, point: 'Easy Claim, Hassler' },
            { id: 3, point: 'Free Pick & Drop' },
            { id: 4, point: 'Repair or Replacement' },
            { id: 5, point: 'Depreciation applicable in case of Replacement' },
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

export const getServerSideProps = async ({ req }) => {
  // BRAND LIST
  const brandRes = await fetch(`${API_URL}/getBrandList.php`);
  const brandData = await brandRes.json();

  return {
    props: {
      brandList: brandData.data,
    },
  };
};

export default AccidentalPage;
