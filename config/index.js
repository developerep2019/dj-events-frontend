//module scaffolding
const config = {};

config.API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
config.defaultImgSource = '/images/event-default.png';
config.PER_PAGE = 5;
config.NEXT_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';

module.exports = config;
