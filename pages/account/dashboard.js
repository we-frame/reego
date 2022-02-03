import OverView from '@/components/account/OverView';
import Layout2 from '@/components/Utils/Layout2';
import Seo from '@/components/Utils/Seo';
import cookie from 'cookie';

const DashBoardPage = () => {
  return (
    <Layout2>
      <Seo title='Dashboard' />
      <OverView />
    </Layout2>
  );
};

export const getServerSideProps = async ({ req }) => {
  const token = cookie.parse(req ? req.headers.cookie || '' : '');

  return {
    props: {
      token,
    },
  };
};

export default DashBoardPage;
