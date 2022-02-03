import { Container } from 'react-bootstrap';
import Seo from '@/components/Utils/Seo';
import Slider from '@/components/Home/Slider';
import Tab from '@/components/Home/Tab';
import DevicePlans from '@/components/Home/DevicePlans';
import Offers from '@/components/Home/Offers';
import Ads from '@/components/Home/Ads';
import DownloadApp from '@/components/Home/DownloadApp';
import Testimonials from '@/components/Home/Testimonials';
import { API_URL } from 'config';

const HomePage = ({ brandList, trackingData,problems }) => {
  return (
    <>
      <Seo title='Home' />
      <Slider />
      <Container className='my-4'>
        <Tab brandList={brandList} problems={problems} />
        <DevicePlans />
        <Offers />
        <Ads />
        <Testimonials />
        <DownloadApp />
      </Container>
    </>
  );
};

export const getServerSideProps = async () => {
  // BRAND LIST
  const brandRes = await fetch(`${API_URL}/getBrandList.php`);
  const brandData = await brandRes.json();

  // PROBLEM LIST
  const problemRes = await fetch(`${API_URL}/getDeviceProblemList.php`);
  const problemData = await problemRes.json();

  // TRACKING
  const trackingRes = await fetch(`${API_URL}/getTrackingDetails.php`);
  const trackingData = await trackingRes.json();

  return {
    props: {
      brandList: brandData.data,
      tracker: trackingData,
      problems: problemData.data,
    },
  };
};

export default HomePage;
