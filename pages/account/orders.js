import Orders from '@/components/account/Orders';
import Layout2 from '@/components/Utils/Layout2';
import Seo from '@/components/Utils/Seo';

const ProfilePage = () => {
  return (
    <Layout2>
      <Seo title='Orders' />
      <Orders />
    </Layout2>
  );
};

export default ProfilePage;
