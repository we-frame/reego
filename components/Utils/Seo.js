import Head from 'next/head';

const Seo = ({ title, description }) => {
  return (
    <Head>
      <title>{title} | Reego</title>
      <meta name='description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://www.reego.in/' />
      <meta property='og:title' content='Reego' />
      <meta
        property='og:description'
        content='Reego offers a unique solution based on the values of honesty, transparency and efficiency. Hence delivering the promise to our customers of upmost quality service in the quickest time using only the genuine parts, if required.'
      />
      <meta
        property='og:image'
        content='https://www.reego.in/images/twitter-img.png'
      />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:creator' content='@reego' />
      <meta name='twitter:title' content='Reego' />
      <meta
        name='twitter:description'
        content='Reego offers a unique solution based on the values of honesty, transparency and efficiency. Hence delivering the promise to our customers of upmost quality service in the quickest time using only the genuine parts, if required.'
      />
      <meta
        name='twitter:image'
        content='https://www.reego.in/images/twitter-img.png'
      />
    </Head>
  );
};

Seo.defaultProps = {
  description:
    'Reego offers a unique solution based on the values of honesty, transparency and efficiency. Hence delivering the promise to our customers of upmost quality service in the quickest time using only the genuine parts, if required.',
};

export default Seo;
