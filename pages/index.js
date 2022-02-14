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
import { parseCookies } from 'helpers';

const HomePage = ({ brandList, problems, token, id, gadgetList }) => {
  return (
    <>
      <Seo title='Home' />
      <Slider />
      <Container className='my-4'>
        <Tab
          brandList={brandList}
          problems={problems}
          token={token}
          id={id}
          gadgetList={gadgetList}
        />
        <DevicePlans />
        <Offers />
        <Ads />
        <Testimonials />
        <DownloadApp />
      </Container>
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  const { id } = parseCookies(req);

  // BRAND LIST
  const brandRes = await fetch(`${API_URL}/getBrandList.php`);
  const brandData = await brandRes.json();

  // GADGET LIST
  const gadgetRes = await fetch(`${API_URL}/getGadgetList.php`);
  const gadgetData = await gadgetRes.json();

  // PROBLEM LIST
  const problemRes = await fetch(`${API_URL}/getDeviceProblemList.php`);
  const problemData = await problemRes.json();

  return {
    props: {
      brandList: brandData.data,
      gadgetList: gadgetData.data,
      problems: problemData.data,
      token: token ? token : null,
      id: id ? id : null,
    },
  };
};

export default HomePage;
