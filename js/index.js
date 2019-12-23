// if (navigator.serviceWorker) {
//   navigator.serviceWorker.register('./SW.js')
//     .then(() => {
//     	scope: '/Resturants/'
//       console.log('ServiceWorker registration successful');
//     })
//     .catch(err => {
//       console.log('ServiceWorker registration failed', err);
//     })
// }

// if ('serviceWorker' in navigator){
//   navigator.serviceWorker.register('./SW.js').then(function(registration){
//     console.log('service worker registration succeeded:',registration);
//   },
// function(error){
//   console.log('service worker registration failed:',error);
// });
// }
// else{
//   console.log('service workers are not supported.');
// }

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/SW.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
