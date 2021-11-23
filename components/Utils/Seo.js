import Head from 'next/head';

const Seo = ({ title, description }) => {
  return (
    <Head>
      <title>{title} | Reego</title>
      <meta name='description' content={description} />
      {/* <meta property='og:type' content='website' />
      <meta property='og:url' content='https://www.kodagunow.com/' />
      <meta property='og:title' content='Kodagu Now' />
      <meta
        property='og:description'
        content='An all-in-one hyperlocal app that brings latest update on news,prices,resorts & homestays accompanied by an E-commerce marketplace for the conusmers of Kodagu.'
      />
      <meta
        property='og:image'
        content='https://www.kodagunow.com/images/twitter-img.png'
      />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:creator' content='@kodagunow' />
      <meta name='twitter:title' content='Kodagu Now' />
      <meta
        name='twitter:description'
        content='An all-in-one hyperlocal app that brings latest update on news,prices,resorts & homestays accompanied by an E-commerce marketplace for the conusmers of Kodagu.'
      />
      <meta
        name='twitter:image'
        content='https://www.kodagunow.com/images/twitter-img.png'
      /> */}
    </Head>
  );
};

Seo.defaultProps = {
  description: 'description comes here!!',
};

export default Seo;
