/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "ndpirhlrqcgffzqjyukh.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  }
};

export default nextConfig;
