if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let n=Promise.resolve();return t[e]||(n=new Promise((async n=>{if("document"in self){const t=document.createElement("script");t.src=e,document.head.appendChild(t),t.onload=n}else importScripts(e),n()}))),n.then((()=>{if(!t[e])throw new Error(`Module ${e} didn’t register its module`);return t[e]}))},n=(n,t)=>{Promise.all(n.map(e)).then((e=>t(1===e.length?e[0]:e)))},t={require:Promise.resolve(n)};self.define=(n,r,s)=>{t[n]||(t[n]=Promise.resolve().then((()=>{let t={};const a={uri:location.origin+n.slice(1)};return Promise.all(r.map((n=>{switch(n){case"exports":return t;case"module":return a;default:return e(n)}}))).then((e=>{const n=s(...e);return t.default||(t.default=n),t}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/tm-frontend/_next/static/1t6WnVTuUArhv84vttqzh/_buildManifest.js",revision:"1t6WnVTuUArhv84vttqzh"},{url:"/tm-frontend/_next/static/1t6WnVTuUArhv84vttqzh/_ssgManifest.js",revision:"1t6WnVTuUArhv84vttqzh"},{url:"/tm-frontend/_next/static/chunks/71247caf95475e3ea7f9a0f8a30beb258b23d005.c72173a9aa11e3e1d347.js",revision:"1t6WnVTuUArhv84vttqzh"},{url:"/tm-frontend/_next/static/chunks/commons.44bbb758f331ce7b5bd3.js",revision:"1t6WnVTuUArhv84vttqzh"},{url:"/tm-frontend/_next/static/chunks/f6078781a05fe1bcb0902d23dbbb2662c8d200b3.953e124a65db345ce568.js",revision:"1t6WnVTuUArhv84vttqzh"},{url:"/tm-frontend/_next/static/chunks/framework.7ba70a80a7800850c517.js",revision:"1t6WnVTuUArhv84vttqzh"},{url:"/tm-frontend/_next/static/chunks/main-5398c4c09d9703b1173d.js",revision:"1t6WnVTuUArhv84vttqzh"},{url:"/tm-frontend/_next/static/chunks/pages/_app-88b29cacf1de9cca8db5.js",revision:"1t6WnVTuUArhv84vttqzh"},{url:"/tm-frontend/_next/static/chunks/pages/_error-f4aef0e89f38237c2b4f.js",revision:"1t6WnVTuUArhv84vttqzh"},{url:"/tm-frontend/_next/static/chunks/pages/index-8e4bfcee58993d455215.js",revision:"1t6WnVTuUArhv84vttqzh"},{url:"/tm-frontend/_next/static/chunks/polyfills-8f31809deb7932dd0187.js",revision:"1t6WnVTuUArhv84vttqzh"},{url:"/tm-frontend/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js",revision:"1t6WnVTuUArhv84vttqzh"},{url:"/tm-frontend/favicon/android-chrome-192x192.png",revision:"04fb604e3a23958b82ea75475bffb880"},{url:"/tm-frontend/favicon/android-chrome-384x384.png",revision:"13a1bea844f102865ebdb7c476675509"},{url:"/tm-frontend/favicon/apple-touch-icon.png",revision:"d0857531d7321c8cbe54b8532fceb7d9"},{url:"/tm-frontend/favicon/browserconfig.xml",revision:"a493ba0aa0b8ec8068d786d7248bb92c"},{url:"/tm-frontend/favicon/favicon-16x16.png",revision:"b19e68af75cb716b25e5bf3aab3963a2"},{url:"/tm-frontend/favicon/favicon-32x32.png",revision:"f83a85f7120b10b853fd8f8efc93a46f"},{url:"/tm-frontend/favicon/favicon.ico",revision:"d20990016bc3677520b2f4f5a7ade452"},{url:"/tm-frontend/favicon/mstile-150x150.png",revision:"6332d42117ca46bdc31b4864e56e657b"},{url:"/tm-frontend/favicon/safari-pinned-tab.svg",revision:"7a434c87d94685f9cc94cc32979baef4"},{url:"/tm-frontend/manifest.json",revision:"b54dbd481a6f9a9ef08d2bc14db6958e"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/tm-frontend",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:n,event:t,state:r})=>n&&"opaqueredirect"===n.type?new Response(n.body,{status:200,statusText:"OK",headers:n.headers}):n}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^\/api\/(?!auth\/callback\/).*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^\/(?!api\/).*$/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
