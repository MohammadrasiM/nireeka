/**
 * @type {import('next').NextConfig}
 */
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  reactStrictMode: false,
  images: {
    domains: ["nireeka.com", "www.gravatar.com", "images.unsplash.com", "api.nireeka.com", "ae01.alicdn.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.nireeka.com*",
      },
    ],
  },
  compiler: {
    removeConsole: {
      exclude: ["error"],
    },
  },
  async redirects() {
    return [
      {
        source: "/shop/cart/checkout/response",
        destination: "/cart/checkout/response",
        permanent: true,
      },
      {
        source: "/forum",
        destination: "/forum/1",
        permanent: false,
      },
      {
        source: "/forum/channels/:channel_slug",
        destination: "/forum/channels/:channel_slug/1",
        permanent: false,
      },
      {
        source: "/forum/gallery",
        destination: "/forum/gallery/1",
        permanent: false,
      },
      // {
      //   source: "/shop/spares",
      //   destination: "/shop/spares/1",
      //   permanent: false,
      // }
      {
        source: "/shop/accessories/:id",
        destination: "/accessories/:id",
        permanent: false,
      },
      {
        source: "/help-center/topic/:id/:topic",
        destination: "/help-center/topic/:topic",
        permanent: false,
      },
      {
        source: "/help-center/category/:slug/:id",
        destination: "/help-center/category/:slug",
        permanent: false,
      },
      {
        source: "/landing/prime",
        destination: "/",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/accessories/:productId/:slug*",
        destination: "/accessories/:productId",
      },
    ];
  },
  env: {
    SECRET_KEY: "6Ld2bsEhAAAAAMuhgMf2-Go6OmW-7IB9M3wxfy7L",
    SITE_KEY: "6Ld2bsEhAAAAAPa32wRzJ3o4DenTqnQN_fxVn88H",
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    dynamicStartUrl: true,
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: /\.[a-z|A-Z|\d]*$/,
        handler: "NetworkOnly",
      },
    ],
    sw: "service-worker.js",
  },
});

// const withPWA = require("next-pwa")({
//   dest: "public",
// });
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// module.exports = withPWA({
//   reactStrictMode: true,
//   images: {
//     domains: [
//       "nireeka.com",
//       "www.gravatar.com",
//       "images.unsplash.com",
//       "api.nireeka.com",
//     ],
//   },
//   compiler: {
//     removeConsole: {
//       exclude: ["error"],
//     },
//   },
//   async redirects() {
//     return [
//       {
//         source: "/shop/cart/checkout/response",
//         destination: "/cart/checkout/response",
//         permanent: true,
//       },
//       {
//         source: "/forum",
//         destination: "/forum/1",
//         permanent: false,
//       },
//       {
//         source: "/forum/channels/:channel_slug",
//         destination: "/forum/channels/:channel_slug/1",
//         permanent: false,
//       },
//       {
//         source: "/forum/gallery",
//         destination: "/forum/gallery/1",
//         permanent: false,
//       },
//       // {
//       //   source: "/shop/spares",
//       //   destination: "/shop/spares/1",
//       //   permanent: false,
//       // }
//       {
//         source: "/shop/accessories/:id",
//         destination: "/accessories/:id",
//         permanent: false,
//       },
//       {
//         source: "/help-center/topic/:id/:topic",
//         destination: "/help-center/topic/:topic",
//         permanent: false,
//       },
//       {
//         source: "/help-center/category/:slug/:id",
//         destination: "/help-center/category/:slug",
//         permanent: false,
//       },
//       {
//         source: "/landing/prime",
//         destination: "/",
//         permanent: false,
//       },
//     ];
//   },
//   async rewrites() {
//     return [
//       {
//         source: "/accessories/:productId/:slug*",
//         destination: "/accessories/:productId",
//       },
//     ];
//   },
//   env: {
//     SECRET_KEY: "6Ld2bsEhAAAAAMuhgMf2-Go6OmW-7IB9M3wxfy7L",
//     SITE_KEY: "6Ld2bsEhAAAAAPa32wRzJ3o4DenTqnQN_fxVn88H",
//   },
//   pwa: {
//     dest: "public",
//     disable: process.env.NODE_ENV === "development",
//     register: true,
//     dynamicStartUrl: true,
//     skipWaiting: true,
//     runtimeCaching: [
//       {
//         urlPattern: /\.[a-z|A-Z|\d]*$/,
//         handler: "NetworkOnly",
//       },
//     ],
//     sw: "service-worker.js",
//   },
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.plugins.push(
//         new BundleAnalyzerPlugin({
//           analyzerMode: "static",
//           reportFilename: "./public/bundle-analyzer.html",
//         })
//       );
//     }

//     return config;
//   },
// });
