// Service Worker para HortiFruti Express
// Implementa cache de aplicação e funcionalidade offline básica

const CACHE_NAME = 'hortifast-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Install event - cache essential files
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(URLS_TO_CACHE).catch(err => {
        console.log('[ServiceWorker] Cache addAll error:', err);
      });
    })
  );
  
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle API requests - network first
  if (url.pathname.includes('/api/') || url.pathname.includes('supabase')) {
    event.respondWith(
      fetch(request)
        .catch(() => {
          // Return offline fallback for API errors
          return new Response(
            JSON.stringify({ 
              error: 'Offline - API unavailable',
              cached: false 
            }),
            { 
              status: 503,
              statusText: 'Service Unavailable',
              headers: { 'Content-Type': 'application/json' }
            }
          );
        })
    );
    return;
  }

  // Handle document requests - network first, cache fallback
  if (request.method === 'GET' && request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Update cache with fresh response
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Return cached version or offline page
          return caches.match(request).then(response => {
            return response || caches.match('/index.html');
          });
        })
    );
    return;
  }

  // Handle everything else - cache first, network fallback
  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(request).then(response => {
          // Cache successful responses
          if (response && response.status === 200 && request.method === 'GET') {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        });
      })
      .catch(() => {
        // Return a placeholder for failed requests
        console.log('[ServiceWorker] Request failed:', request.url);
      })
  );
});

// Handle messages from clients
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
