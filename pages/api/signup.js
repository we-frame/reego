import { API_URL } from '../../config/index';
import cookie from 'cookie';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const backendRes = await fetch(`${API_URL}/postSignUp.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const data = await backendRes.json();
    if (backendRes.ok) {
      // SET HTTP ONLY COOKIE!
      res.setHeader('Set-Cookie', [
        cookie.serialize('token', data.data.authToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'strict',
          path: '/',
        }),
        cookie.serialize('id', data.data.authId, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'strict',
          path: '/',
        }),
      ]);

      res.status(200).json({ user: data.data });
    } else {
      res.status(404).json({ message: data.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
export default handler;
