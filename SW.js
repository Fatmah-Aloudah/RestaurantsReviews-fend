var CACHE_NAME = 'my-site-v1';
var urlsToCache = [
       './',
       './index.html',
       './index.html?homescreen=1',
       './?homescreen=1',
       './restaurant.html',
       './css/styles.css',
       './data/restaurant.json',
       './js/dbhelper.js',
       './js/main.js',
       './js/index.js',
       './js/restaurant_info.js',
       './img/1.jpg',
       './img/2.jpg',
       './img/3.jpg',
       './img/4.jpg',
       './img/5.jpg',
       './img/6.jpg',
       './img/7.jpg',
       './img/8.jpg',
       './img/9.jpg',
       './img/10.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then( (cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
          .then( (cacheNames) => {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('my-site-') &&
                        cacheName != CACHE_NAME;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
          })
    );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
