import { API_URL } from '../../config/index';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const backendRes = await fetch(`${API_URL}/generateOTP.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const data = await backendRes.json();
    if (backendRes.ok) {
      res.status(200).json({ details: data });
    } else {
      res.status(404).json({ message: data.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
export default handler;
