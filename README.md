# Progressive web news

**Did you came here from PWA Workshop? Follow [this repo](https://github.com/webmaxru/pwa-workshop-docs/) to get started.**

A demo application for ["Automating a service worker with Workbox 6"](https://slides.com/webmax/workbox-6-ru) (RU) tech talk

[Demo hosted on Azure Static Web Apps](https://black-beach-0a05a8c1e.azurestaticapps.net/)

Testing offline:

![Demo](https://github.com/webmaxru/prog-web-news/raw/main/src/assets/img/wb6.gif)

## Application

The application itself was created using Angular but everything related to Workbox library is framework-agnostic.

* Source service worker https://github.com/webmaxru/prog-web-news/blob/main/src/service-worker.js
* SW build script https://github.com/webmaxru/prog-web-news/blob/main/workbox-inject.js
* SW bundling config https://github.com/webmaxru/prog-web-news/blob/main/rollup.config.js
* App build command (order is important) https://github.com/webmaxru/prog-web-news/blob/main/package.json#L12

