import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import banner from '/public/images/banner.png';

const Slider = () => {
  return (
    <Carousel showArrows={false} showStatus={false} showThumbs={false}>
      <div>
        <Image src={banner} alt='banner' />
      </div>
      <div>
        <Image src={banner} alt='banner' />
      </div>
      <div>
        <Image src={banner} alt='banner' />
      </div>
    </Carousel>
  );
};

export default Slider;
