var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  './index.html',
       './index.html?homescreen=1',
       './?homescreen=1',
       './resturants.html',
       './css/styles.css',
       './data/resturants.json',
       './js/dbhelper.js',
       './js/main.js',
       './js/resturant_info.js',
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

IndexController.prototype._registerServiceWorker = function(){
if (!navigator.serviceWorker) return;
navigator.serviceWorker.register('/SW.js').then(function(){
console.log('Registration worked!');
}).catch(function(){
console.log('Registration failed!');
});
}

self.addEventListener('install', function(event) {
  console.log('Service worker installed!');
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
