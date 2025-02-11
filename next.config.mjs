/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['page.tsx', 'api.ts', 'mw.ts'],
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  // async redirects() {
  //   return [
  //     // { source: '/', destination: '/chat', permanent: true },
  //     // { source: '/home', destination: '/', permanent: true },
  //   ]
  // },
}

export default nextConfig
