const { NEXT_URL, API_URL } = require('@/config/index');
const cookie = require('cookie');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    //destroy cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: new Date(0),
        sameSite: 'strict',
        path: '/',
      })
    );

    res.status(200).json({ message: 'logout successful' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({
      status: 'error',
      code: 405,
      message: `We accept only POST request but recieved ${req.method}`,
    });
  }
}
