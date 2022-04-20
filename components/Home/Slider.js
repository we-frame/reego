import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import banner from '/public/images/banner.png';
import banner1 from '/public/images/img1.jpg';
import banner2 from '/public/images/img2.jpg';
import banner3 from '/public/images/img3.jpg';
import banner4 from '/public/images/img4.jpg';
import banner5 from '/public/images/img5.jpg';

const Slider = ({ bannerImgs }) => {
  console.log(bannerImgs[1]?.image_path);

  return (
    <Carousel showArrows={false} showStatus={false} showThumbs={false}>
      <div>
        <Image src={banner1} alt='banner' height={350} width={1250} />
      </div>
      <div>
        <Image src={banner2} alt='banner' height={350} width={1250} />
      </div>
      <div>
        <Image src={banner3} alt='banner' height={350} width={1250} />
      </div>
      <div>
        <Image src={banner4} alt='banner' height={350} width={1250} />
      </div>
      <div>
        <Image src={banner5} alt='banner' height={350} width={1250} />
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
