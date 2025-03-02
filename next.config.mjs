/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/protected",
        destination: "/auth",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
