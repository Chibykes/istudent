importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js");

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.NetworkFirst()
);


// sw.js

// var cacheName = 'WWW-EXAMPLE-COM-V1';

// var filesToCache = [
//     '/',                // index.html
//     '/main.js',
//     '/styles.css',
//     '/assets/logo.png'
// ];

// self.addEventListener('install', function(event) {
//     event.waitUntil(
//         caches.open(cacheName)
//         .then(function(cache) {
//             console.info('[sw.js] cached all files');
//             return cache.addAll(filesToCache);
//         })
//     );
// });


// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         caches.match(event.request)
//         .then(function(response) {
//             if(response){
//                 return response
//             }
//             else{
//                 // clone request stream
//                 // as stream once consumed, can not be used again
//                 var reqCopy = event.request.clone();
                
//                 return fetch(reqCopy, {credentials: 'include'}) // reqCopy stream consumed
//                 .then(function(response) {
//                     // bad response
//                     // response.type !== 'basic' means third party origin request
//                     if(!response || response.status !== 200 || response.type !== 'basic') {
//                         return response; // response stream consumed
//                     }

//                     // clone response stream
//                     // as stream once consumed, can not be used again
//                     var resCopy = response.clone();


//                     // ================== IN BACKGROUND ===================== //

//                     // add response to cache and return response
//                     caches.open(cacheName)
//                     .then(function(cache) {
//                         return cache.put(reqCopy, resCopy); // reqCopy, resCopy streams consumed
//                     });

//                     // ====================================================== //


//                     return response; // response stream consumed
//                 })
//             }
//         })
//     );
// });