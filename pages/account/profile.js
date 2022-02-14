import Profile from '@/components/account/Profile';
import Layout2 from '@/components/Utils/Layout2';
import Seo from '@/components/Utils/Seo';
import { API_URL } from 'config';
import { parseCookies } from 'helpers';

const ProfilePage = ({ profile }) => {
  return (
    <Layout2>
      <Seo title='Profile' />
      <Profile profile={profile} />
    </Layout2>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  const { id } = parseCookies(req);

  const res = await fetch(`${API_URL}/getUserDetails.php`, {
    headers: {
      Authorization: `${token}`,
      'API-KEY': `${id}`,
    },
  });
  const data = await res.json();

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      profile: data.data,
    },
  };
};

export default ProfilePage;
