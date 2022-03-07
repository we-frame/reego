import styles from '@/styles/home/Testimonials.module.css';
import '../../node_modules/swiper/swiper-bundle.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
SwiperCore.use([Navigation, Pagination, A11y]);

const Testimonials = ({ testimonials }) => {
  return (
    <section className='mt-5'>
      <h1 className={styles.myWidth}>Trusted by Thousands of Happy Customer</h1>
      <p className={styles.myWidth}>
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
        {testimonials.map((testimonial, i) => {
          return (
            <SwiperSlide key={i}>
              <div className={styles.card}>
                <div className='d-flex justify-content-between'>
                  <div>
                    <h5>{testimonial.name}</h5>
                    <p>{testimonial.location}</p>
                  </div>
                  {/* <div>
                    <p>4.5</p>
                  </div> */}
                </div>
                <p className='my-3'>{testimonial.comment}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Testimonials;
