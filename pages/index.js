import { Container } from 'react-bootstrap';
import Seo from '@/components/Utils/Seo';
import Slider from '@/components/Home/Slider';
import Tab from '@/components/Home/Tab';
import DevicePlans from '@/components/Home/DevicePlans';
import Offers from '@/components/Home/Offers';
import Ads from '@/components/Home/Ads';
import DownloadApp from '@/components/Home/DownloadApp';
import Testimonials from '@/components/Home/Testimonials';

const HomePage = () => {
  return (
    <>
      <Seo title='Home' />
      <Slider />
      <Container className='my-4'>
        <Tab />
        <DevicePlans />
        <Offers />
        <Ads />
        <Testimonials />
        <DownloadApp />
      </Container>
    </>
  );
};

export default HomePage;
