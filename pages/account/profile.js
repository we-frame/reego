import Profile from '@/components/account/Profile';
import Layout2 from '@/components/Utils/Layout2';
import Seo from '@/components/Utils/Seo';

const ProfilePage = () => {
  return (
    <Layout2>
      <Seo title='Profile' />
      <Profile />
    </Layout2>
  );
};

export default ProfilePage;
