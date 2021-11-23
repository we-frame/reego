import styles from '@/styles/home/Testimonials.module.css';

import '../../node_modules/swiper/swiper-bundle.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
SwiperCore.use([Navigation, Pagination, A11y]);

const Testimonials = () => {
  return (
    <section className='mt-5'>
      <h1 className='text-center w-50 mx-auto'>
        Trusted by Thousands of Happy Customer
      </h1>
      <p className='text-center w-50 mx-auto'>
        These are the stories of our customers who have joined us with great
        pleasure when using this crazy feature.
      </p>
      <Swiper
        navigation
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          600: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        <SwiperSlide>
          <div className={styles.card}>
            <div className='d-flex justify-content-between'>
              <div>
                <h5>Viezh Robert</h5>
                <p>India</p>
              </div>
              <div>
                <p>4.5</p>
              </div>
            </div>
            <p className='my-3'>
              “Wow... I am very happy to use this platfrom, it turned out to be
              more than my expectations and so far there have been no problems.
              Reego always the best”.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.card}>
            <div className='d-flex justify-content-between'>
              <div>
                <h5>Yessica Christy</h5>
                <p>Karnataka,India </p>
              </div>
              <div>
                <p>4</p>
              </div>
            </div>
            <p className='my-3'>
              “I like it because its easy to use and service are too good.”.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.card}>
            <div className='d-flex justify-content-between'>
              <div>
                <h5>Kim Young Jou</h5>
                <p>India</p>
              </div>
              <div>
                <p>4</p>
              </div>
            </div>
            <p className='my-3'>“Customer serivce of reego is too good .”. </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.card}>
            <div className='d-flex justify-content-between'>
              <div>
                <h5>Vipul</h5>
                <p>Coorg</p>
              </div>
              <div>
                <p>4</p>
              </div>
            </div>
            <p className='my-3'>The product is very very innovative</p>
          </div>{' '}
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Testimonials;
