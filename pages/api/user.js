import { API_URL } from '../../config/index';
import cookie from 'cookie';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not authorized' });
      return;
    }
    const { token } = cookie.parse(req.headers.cookie);
    const { id } = cookie.parse(req.headers.cookie);
    // GIVE THE TOKEN AND GET THE USER INFO!

    const backendRes = await fetch(`${API_URL}/getUserDetails.php`, {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
        'API-KEY': `${id}`,
      },
    });

    const user = await backendRes.json();

    if (backendRes.ok) {
      res.status(200).json(user.data);
    } else {
      res.status(403).json({ message: 'User Forbidden' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
export default handler;
