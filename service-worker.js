(global => {
  'use strict';

  // Load the sw-toolbox library.
  importScripts('./bower_components/sw-toolbox/sw-toolbox.js');

  // The route for any requests from the googleapis origin
  toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'gravatar',
      maxEntries: 10,
      maxAgeSeconds: 604800
    },
    origin: /\.gravatar\.com$/,
    // Set a timeout threshold of 2 seconds
    networkTimeoutSeconds: 4
  });

  toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'cloudflare',
      maxEntries: 10,
      maxAgeSeconds: 604800
    },
    origin: /\.cloudflare\.com$/,
    // Set a timeout threshold of 2 seconds
    networkTimeoutSeconds: 4
  });

  // Ensure that our service worker takes control of the page as soon as possible.
  global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
  global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
})(self);
