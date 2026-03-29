const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      //pare permitir cargar las imágenes desde Supabase Storage
      {
        protocol: 'https',
        hostname: 'yiwjlbpbziydpkowvfmd.supabase.co',
        port: '',
        pathname: '/storage/v1/object/**',
      },
    ],
  },
};

export default nextConfig;