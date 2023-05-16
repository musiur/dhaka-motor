/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // remotePatterns: [
        //   {
        //     protocol: 'https',
        //     hostname: 'www.harley-davidson.com',
        //     port: '',
        //     pathname: '/content/dam/h-d/images/promo-images/2023/media-card/**',
        //   }
        // ],
        domains: ['www.harley-davidson.com', 'www.yamahamotorsports.com'],
    },
};

module.exports = nextConfig;
