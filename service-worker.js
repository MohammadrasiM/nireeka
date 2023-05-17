import {skipWaiting, clientsClaim} from 'workbox-core';
import {ExpirationPlugin} from 'workbox-expiration';
import {NetworkOnly, NetworkFirst, CacheFirst} from 'workbox-strategies';
import {registerRoute, setDefaultHandler, setCatchHandler} from 'workbox-routing';
import {matchPrecache, cleanupOutdatedCaches} from 'workbox-precaching';

skipWaiting();
clientsClaim();

// must include following lines when using inject manifest module from workbox
// https://developers.google.com/web/tools/workbox/guides/precache-files/workbox-build#add_an_injection_point
const WB_MANIFEST = self.__WB_MANIFEST;
self.__WB_DISABLE_DEV_LOGS = true;
// Precache fallback route and image
// WB_MANIFEST.push({
//   url: '/fallback',
//   revision: '1234567890'
// });
// precacheAndRoute(WB_MANIFEST);

cleanupOutdatedCaches();
registerRoute(
  '/',
  new NetworkOnly({
    cacheName: 'start-url',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: !0,
        purgeOnQuotaError: !0
      })
    ]
  }),
  'GET'
);
registerRoute(
  /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
  new CacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: !0,
        purgeOnQuotaError: !0
      })
    ]
  }),
  'GET'
);
registerRoute(
  /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
  new NetworkOnly({
    cacheName: 'static-font-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: !0,
        purgeOnQuotaError: !0
      })
    ]
  }),
  'GET'
);
// disable image cache, so we could observe the placeholder image when offline
registerRoute(
  /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
  new NetworkFirst({
    cacheName: 'static-image-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: !0,
        purgeOnQuotaError: !0
      })
    ]
  }),
  'GET'
);
registerRoute(
  /\.(?:js)$/i,
  new NetworkOnly({
    cacheName: 'static-js-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: !0,
        purgeOnQuotaError: !0
      })
    ]
  }),
  'GET'
);
registerRoute(
  /\.(?:css|less)$/i,
  new NetworkOnly({
    cacheName: 'static-style-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0
      })
    ]
  }),
  'GET'
);
registerRoute(
  /\.(?:json|xml|csv)$/i,
  new NetworkOnly({
    cacheName: 'static-data-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: !0,
        purgeOnQuotaError: !0
      })
    ]
  }),
  'GET'
);
registerRoute(
  /\/api\/.*$/i,
  new NetworkOnly({
    cacheName: 'apis',
    networkTimeoutSeconds: 30000,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: !0,
        purgeOnQuotaError: !0
      })
    ]
  }),
  'GET'
);
registerRoute(
  /.*/i,
  new NetworkOnly({
    cacheName: 'others',
    networkTimeoutSeconds: 30000,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: !0,
        purgeOnQuotaError: !0
      })
    ]
  }),
  'GET'
);

// following lines gives you control of the offline fallback strategies
// https://developers.google.com/web/tools/workbox/guides/advanced-recipes#comprehensive_fallbacks

// Use a stale-while-revalidate strategy for all other requests.
setDefaultHandler(new NetworkOnly());

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.
setCatchHandler(({event}) => {
  // The FALLBACK_URL entries must be added to the cache ahead of time, either
  // via runtime or precaching. If they are precached, then call
  // `matchPrecache(FALLBACK_URL)` (from the `workbox-precaching` package)
  // to get the response from the correct cache.
  //
  // Use event, request, and url to figure out how to respond.
  // One approach would be to use request.destination, see
  // https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c
  switch (event.request.destination) {
    case 'document':
      // If using precached URLs:
      return matchPrecache('/fallback');
      // return caches.match('/fallback')
      break;
    case 'image':
      // If using precached URLs:
      return matchPrecache('/static/images/fallback.png');
      // return caches.match('/static/images/fallback.png')
      break;
    case 'font':
    // If using precached URLs:
    // return matchPrecache(FALLBACK_FONT_URL);
    // return caches.match('/static/fonts/fallback.otf')
    // break
    default:
      // If we don't have a fallback, just return an error response.
      return Response.error();
  }
});

self?.addEventListener('activate', function (event) {
  event?.waitUntil(
    caches?.keys()?.then(function (cacheNames) {
      return Promise.all(
        cacheNames
          ?.filter(function (cacheName) {
            // Return true if you want to remove this cache,
            // but remember that caches are shared across
            // the whole origin
          })
          ?.map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});
