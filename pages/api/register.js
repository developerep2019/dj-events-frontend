const { NEXT_URL, API_URL } = require('@/config/index');
const cookie = require('cookie');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await strapiRes.json();
    console.log(data.jwt);

    if (strapiRes.ok) {
      // Set cookie
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'strict',
          path: '/',
        })
      );
      res.status(200).json({ user: data });
    } else {
      const errorResponse = data.message[0].messages[0].message;
      res.status(data.statusCode).json({ message: errorResponse });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({
      status: 'error',
      code: 405,
      message: `We accept only POST request but recieved ${req.method}`,
    });
  }
}
