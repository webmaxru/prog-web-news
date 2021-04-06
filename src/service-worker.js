import { precacheAndRoute } from "workbox-precaching";

// Precache and serve resources from __WB_MANIFEST array
precacheAndRoute(self.__WB_MANIFEST);