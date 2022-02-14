import DownloadApp from '@/components/Home/DownloadApp';
import Testimonials from '@/components/Home/Testimonials';
import Faqs from '@/components/products/Faqs';
import Plans from '@/components/products/Plans';
import TableInfo from '@/components/products/TableInfo';
import Seo from '@/components/Utils/Seo';
import { API_URL } from 'config';
import { Container } from 'react-bootstrap';

const ScreenProtectionPage = ({ brandList }) => {
  return (
    <>
      <Seo title='Screen Protection' />
      <Container>
        <Plans
          brandList={brandList}
          short='SDI'
          title='Screen Damage Insurance'
          points={[
            { id: 1, point: 'Broken, Cracked, Shattered Screens Covered' },
            { id: 2, point: 'Easy Claim, Hassle Free' },
            { id: 3, point: 'Repair or replacement guaranteed' },
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

export default ScreenProtectionPage;
