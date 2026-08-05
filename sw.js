// DogMy Service Worker - Cache para PWA
const CACHE_NAME = 'dogmy-v6.3';
const URLS_TO_CACHE = [
  './',
  './index.html',
  './admin.html',
  './agenda.html',
  './cliente.html',
  './lista_clientes.html',
  './paseador.html',
  './registro.html',
  './style.css',
  './script.js',
  './firebase-config.js',
  './logo.jpg',
  './manifest.json'
];

// Instalar: guardar archivos en cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activar: limpiar caches viejas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: servir desde cache o red
self.addEventListener('fetch', event => {
  // No cachear peticiones a Firebase (APIs externas)
  if (event.request.url.includes('firebase') || 
      event.request.url.includes('gstatic') ||
      event.request.url.includes('openstreetmap') ||
      event.request.url.includes('unpkg')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).then(networkResponse => {
        // Guardar en cache lo nuevo
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkResponse;
      });
    }).catch(() => {
      // Si falla todo y es una página, mostrar index
      if (event.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
    })
  );
});
