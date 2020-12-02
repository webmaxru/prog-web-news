import { pageCache, imageCache, staticResourceCache, googleFontsCache, offlineFallback } from 'workbox-recipes'
import { precacheAndRoute } from 'workbox-precaching'

// Include at least offline.html in the Workbox manifest (optionally, add full app shell)
precacheAndRoute(self.__WB_MANIFEST)

// Uses Network First strategy to serve all navigation requests
pageCache()

// Uses Stale-While-Revalidate / Cache First strategies for Google Fonts CSS / font files
googleFontsCache()

// Uses Stale-While-Revalidate strategy to serve CSS, JavaScript, and Web Worker requests
staticResourceCache()

// Uses Stale-While-Revalidate strategy to serve all image requests
imageCache()

// Serves a precached web page, image, or font if there's neither connection nor cache hit
offlineFallback()

// Next:
// 1. Use injectManifest() from workbox-build module
// 2. Build the resulting file with your favorite bundler
// 3. Register service worker you received in your JS code (f. ex. using register() from workbox-window)
// 4. Deploy and let your visitors enjoy ofline-ready, network optimized experience!