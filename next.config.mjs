/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.football-data.org',
                port: '',
            },
        ],
    },
};

export default nextConfig;
