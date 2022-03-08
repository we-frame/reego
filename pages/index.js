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

const HomePage = ({
  brandList,
  problems,
  token,
  id,
  gadgetList,
  banner,
  testimonials,
  offerData,
}) => {
  return (
    <>
      <Seo title='Home' />
      <Container className='my-4'>
        <Slider bannerImgs={banner} />
        <Tab
          brandList={brandList}
          problems={problems}
          token={token}
          id={id}
          gadgetList={gadgetList}
        />
        <DevicePlans />
        <Offers offerData={offerData} />
        <Ads />
        <Testimonials testimonials={testimonials} />
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

  // BANNER!
  const bannerRes = await fetch(`${API_URL}/getSliderImages.php`);
  const bannerData = await bannerRes.json();

  // TESTIMONIALS!
  const testimonailsRes = await fetch(`${API_URL}/getTestimonials.php`);
  const testimonailsData = await testimonailsRes.json();

  // OFFERS!
  const offerRes = await fetch(`${API_URL}/getOfferLists.php`);
  const offerData = await offerRes.json();

  return {
    props: {
      brandList: brandData.data,
      gadgetList: gadgetData.data,
      problems: problemData.data,
      banner: bannerData.data,
      testimonials: testimonailsData.data,
      offerData: offerData.data,
      token: token ? token : null,
      id: id ? id : null,
    },
  };
};

export default HomePage;
