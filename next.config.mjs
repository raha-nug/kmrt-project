/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // ... pattern lainnya
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/f/**", // Menambahkan ini untuk mengizinkan semua file
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Tambahkan ini juga jika Anda menggunakan domain regional uploadthing
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
    ],
  },
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
