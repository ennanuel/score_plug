/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.football-data.org',
                port: '',
            },
            {
                protocol: "https",
                hostname: 'score-plug-backend.onrender.com',
                port: ''
            }
        ],
    },
};

export default nextConfig;
