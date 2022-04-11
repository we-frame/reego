import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import banner from '/public/images/banner.png';

const Slider = ({ bannerImgs }) => {
  console.log(bannerImgs[1]?.image_path);

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
      {/* <div>
        <Image
          src={bannerImgs[0]?.image_path}
          alt='banner'
          width={100}
          height={30}
        />
      </div> */}
    </Carousel>
  );
};

export default Slider;
