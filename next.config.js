/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['www.harley-davidson.com', 'www.yamahamotorsports.com'],
    },
    env: {
        MYSQL_HOST: 'localhost',
        MYSQL_PORT: '',
        MYSQL_DATABASE: 'dhaka-motors',
        MYSQL_USER: 'root',
        MYSQL_PASSWORD: '',
        BASE_URL: 'https://dhaka-motor.vercel.app'
    },
};

module.exports = nextConfig;
