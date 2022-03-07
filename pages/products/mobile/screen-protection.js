import DownloadApp from '@/components/Home/DownloadApp';
import Testimonials from '@/components/Home/Testimonials';
import Faqs from '@/components/products/Faqs';
import Plans from '@/components/products/Plans';
import TableInfo from '@/components/products/TableInfo';
import Seo from '@/components/Utils/Seo';
import { API_URL } from 'config';
import { parseCookies } from 'helpers';
import { Container } from 'react-bootstrap';

const ScreenProtectionPage = ({ brandList, profileData, testimonials }) => {
  return (
    <>
      <Seo title='Screen Protection' />
      <Container>
        <Plans
          profileData={profileData}
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
        <Testimonials testimonials={testimonials} />
        <DownloadApp />
      </Container>
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  const { id } = parseCookies(req);

  // USER DATA
  const res = await fetch(`${API_URL}/getUserDetails.php`, {
    headers: {
      Authorization: `${token}`,
      'API-KEY': `${id}`,
    },
  });
  const data = await res.json();

  // BRAND LIST
  const brandRes = await fetch(`${API_URL}/getBrandList.php`);
  const brandData = await brandRes.json();

  // TESTIMONIALS!
  const testimonailsRes = await fetch(`${API_URL}/getTestimonials.php`);
  const testimonailsData = await testimonailsRes.json();

  return {
    props: {
      brandList: brandData.data,
      testimonials: testimonailsData.data,
      profileData: data.data ? data.data : [],
    },
  };
};

export default ScreenProtectionPage;
