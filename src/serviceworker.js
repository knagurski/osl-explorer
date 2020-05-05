importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
);

const { registerRoute } = workbox.routing;
const { StaleWhileRevalidate, CacheFirst, NetworkFirst } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;

registerRoute(
  /\.(?:js|css|woff|webmanifest)$/,
  new StaleWhileRevalidate({ cacheName: "static-resources" })
);

registerRoute(
  /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

registerRoute(
  /functions\/getLibraries/,
  new NetworkFirst({ cacheName: "libraries" })
);

registerRoute(
  /functions\/getLibraries/,
  new NetworkFirst({ cacheName: "libraries" })
);

registerRoute(/^\/$/, new CacheFirst({ cacheName: "html" }));
