import OverView from '@/components/account/OverView';
import Layout2 from '@/components/Utils/Layout2';
import Seo from '@/components/Utils/Seo';

const DashBoardPage = () => {
  return (
    <Layout2>
      <Seo title='Dashboard' />
      <OverView />
    </Layout2>
  );
};

export default DashBoardPage;
