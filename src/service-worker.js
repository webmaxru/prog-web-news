import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
} from "workbox-precaching";
import { setCacheNameDetails } from "workbox-core";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { googleFontsCache, imageCache, offlineFallback } from "workbox-recipes";
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { BroadcastUpdatePlugin } from "workbox-broadcast-update";
import {BackgroundSyncPlugin} from 'workbox-background-sync';


// SETTINGS

// Claiming control to start runtime caching asap
clientsClaim();

// Use to update the app after user triggered refresh (without prompt)
//self.skipWaiting();

// PRECACHING

// Setting custom cache name
setCacheNameDetails({ precache: "wb6-precache", runtime: "wb6-runtime" });

// We inject manifest here using "workbox-build" in workbox-inject.js
precacheAndRoute(self.__WB_MANIFEST);

// Remove cache from the previous WB versions
cleanupOutdatedCaches();

// NAVIGATION ROUTING

// This assumes /index.html has been precached.
const navHandler = createHandlerBoundToURL("/index.html");
const navigationRoute = new NavigationRoute(navHandler, {
  denylist: [new RegExp("/out-of-spa/")], // Also might be specified explicitly via allowlist
});
registerRoute(navigationRoute);

// STATIC RESOURCES

googleFontsCache({ cachePrefix: "wb6-gfonts" });

// API ROUTING

// Load details immediately and check and inform about update right after
registerRoute(
  new RegExp("https://progwebnews-app.azurewebsites.net.*content/posts/slug.*"),
  new StaleWhileRevalidate({
    plugins: [new BroadcastUpdatePlugin()],
  })
);

// Keeping lists always fresh
registerRoute(
  new RegExp("https://progwebnews-app.azurewebsites.net.*content/posts.*"),
  new NetworkFirst()
);

// Gravatars can live in cache
registerRoute(
  new RegExp("https://www.gravatar.com/avatar/.*"),
  new CacheFirst({
    plugins: [
      new ExpirationPlugin({
        // Only cache requests for a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
        // Only cache 10 requests.
        maxEntries: 10,
      }),
    ],
  })
);

// CONTENT

imageCache({ cacheName: "wb6-content-images", maxEntries: 10 });

// APP SHELL UPDATE FLOW

addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// BACKGROUND SYNC

// Instantiating and configuring plugin
const bgSyncPlugin = new BackgroundSyncPlugin('feedbackQueue', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});

// Registering a route for retries
registerRoute(
  // Alternative notation: ({url}) => url.pathname.startsWith('/post-tweet'),
  /(http[s]?:\/\/)?([^\/\s]+\/)post-tweet/,
  new NetworkFirst({
    plugins: [
      bgSyncPlugin
    ]
  }),
  'POST'
);

// FALLBACK

offlineFallback({
  pageFallback: "offline/offline.html",
  imageFallback: "offline/offline.png",
  fontFallback: false,
});

// ALL OTHER EVENTS

// Receive push and show a notification
self.addEventListener('push', function(event) {
  console.log('[Service Worker]: Received push event', event);

  var notificationData = {};

  if (event.data.json()) {
    notificationData = event.data.json().notification;
  } else {
    notificationData = {
      title: 'Something Has Happened',
      message: 'Something you might want to check out',
      icon: '/assets/images/logo.png'
    };
  }

  self.registration.showNotification(notificationData.title, notificationData);
});

// Custom notification actions
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker]: Received notificationclick event');

  event.notification.close();

  if (event.action == 'opentweet') {
    console.log('[Service Worker]: Performing action opentweet');

    event.waitUntil(
      clients.openWindow(event.notification.data).then(function(windowClient) {
        // do something with the windowClient.
      })
    );
  } else {
    console.log('[Service Worker]: Performing default click action');

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(
      clients
        .matchAll({
          includeUncontrolled: true,
          type: 'window'
        })
        .then(function(clientList) {
          for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == '/' && 'focus' in client) return client.focus();
          }
          if (clients.openWindow) return clients.openWindow('/');
        })
    );
  }
});

// Closing notification action
self.addEventListener('notificationclose', function(event) {
  log('[Service Worker]: Received notificationclose event');
});
