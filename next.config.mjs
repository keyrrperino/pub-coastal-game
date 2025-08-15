import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'dist',
    images: {
        unoptimized: true
    }
};

export default withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: false
})(nextConfig);
