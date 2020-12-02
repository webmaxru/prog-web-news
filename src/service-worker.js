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

// FALLBACK

offlineFallback({
  pageFallback: "offline/offline.html",
  imageFallback: "offline/offline.png",
  fontFallback: false,
});

// ALL OTHER EVENTS

// Receive push and show a notification
self.addEventListener("push", function (event) {
  console.log("[Service Worker]: Received push event", event);

  var notificationData = {};

  if (event.data.json()) {
    notificationData = event.data.json();
  } else {
    notificationData = {
      title: "Something Has Happened",
      message: "Something you might want to check out",
      icon: "/assets/img/pwa-logo.png",
    };
  }

  self.registration.showNotification(notificationData.title, notificationData);
});
